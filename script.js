// Initialize Supabase client
const supabaseUrl = "https://ilcleccjwmikoqufktou.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlsY2xlY2Nqd21pa29xdWZrdG91Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY3Nzk5NTgsImV4cCI6MjA3MjM1NTk1OH0.snr3BIYkrpS0FySnE4yQ18P0bZeQ9N4A3m39yeJMeCE"; // from Supabase settings
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey)

const habitForm = document.getElementById("habit-form");
const habitInput = document.getElementById("habit-input");
const habitList = document.getElementById("habit-list");

// Fetch and render habits
async function loadHabits() {
  const { data: habits, error } = await supabase
    .from("habits")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return;
  }

  habitList.innerHTML = "";
  habits.forEach(habit => {
    const li = document.createElement("li");
    li.textContent = habit.title;

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.onclick = () => deleteHabit(habit.id);

    li.appendChild(delBtn);
    habitList.appendChild(li);
  });
}

// Add a habit
habitForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = habitInput.value.trim();
  if (!title) return;

  const { error } = await supabase
    .from("habits")
    .insert([{ title }]);

  if (error) console.error(error);

  habitInput.value = "";
  loadHabits();
});

// Delete a habit
async function deleteHabit(id) {
  const { error } = await supabase
    .from("habits")
    .delete()
    .eq("id", id);

  if (error) console.error(error);
  loadHabits();
}

// Initial load
loadHabits();
