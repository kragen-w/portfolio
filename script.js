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

var lastClicked;
var grid = clickableGrid(10,10,function(el,row,col,i){
    console.log("You clicked on element:",el);
    console.log("You clicked on row:",row);
    console.log("You clicked on col:",col);
    console.log("You clicked on item #:",i);

    el.className='clicked';
    if (lastClicked) lastClicked.className='';
    lastClicked = el;
});

document.body.appendChild(grid);
     
function clickableGrid( rows, cols, callback ){
    var i=0;
    var grid = document.createElement('table');
    grid.className = 'grid';
    for (var r=0;r<rows;++r){
        var tr = grid.appendChild(document.createElement('tr'));
        for (var c=0;c<cols;++c){
            var cell = tr.appendChild(document.createElement('td'));
            cell.innerHTML = ++i;
            cell.addEventListener('click',(function(el,r,c,i){
                return function(){
                    callback(el,r,c,i);
                }
            })(cell,r,c,i),false);
        }
    }
    return grid;
}