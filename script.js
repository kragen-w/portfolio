// Connect to Supabase
const SUPABASE_URL = "https://YOUR-PROJECT.supabase.co";
const SUPABASE_KEY = "public-anon-key"; // from Supabase settings
const supabaseClient = supabase.createsupabaseClient(SUPABASE_URL, SUPABASE_KEY);

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
