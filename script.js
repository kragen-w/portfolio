// Connect to Supabase


const SUPABASE_URL = "https://ilcleccjwmikoqufktou.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlsY2xlY2Nqd21pa29xdWZrdG91Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY3Nzk5NTgsImV4cCI6MjA3MjM1NTk1OH0.snr3BIYkrpS0FySnE4yQ18P0bZeQ9N4A3m39yeJMeCE"; // from Supabase settings
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const addBtn = document.getElementById("add-btn");
const loadBtn = document.getElementById("load-btn");
const habitList = document.getElementById("habit-list");

// Insert one habit
addBtn.addEventListener("click", async () => {
  const { data, error } = await supabaseClient
    .from("habits")
    .insert([{ title: "Drink Water" }]);
  console.log("Insert:", data, error);
});

// Load all habits
loadBtn.addEventListener("click", async () => {
  const { data, error } = await supabaseClient
    .from("habits")
    .select("*");
  console.log("Select:", data, error);

  habitList.innerHTML = "";
  if (data) {
    data.forEach(habit => {
      const li = document.createElement("li");
      li.textContent = habit.title;
      habitList.appendChild(li);
    });
  }
});
