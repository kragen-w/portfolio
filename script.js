// Initialize Supabase client
const SUPABASE_URL = "https://YOUR-PROJECT.supabase.co";
const SUPABASE_KEY = "public-anon-key"; // from Supabase settings
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

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
