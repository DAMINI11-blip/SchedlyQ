let tasks = [];

function addTask() {
  const name = document.getElementById("taskName").value.trim();
  const priority = parseInt(document.getElementById("taskPriority").value);

  if (!name || isNaN(priority)) {
    alert("Please enter both task name and priority!");
    return;
  }

  tasks.push({ name, priority });
  displayTasks();
  document.getElementById("taskName").value = "";
  document.getElementById("taskPriority").value = "";
}

function displayTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";
  tasks.forEach(task => {
    const li = document.createElement("li");
    li.textContent = `Task: ${task.name} | Priority: ${task.priority}`;
    list.appendChild(li);
  });
}

function scheduleTasks() {
  const scheduled = [...tasks].sort((a, b) => b.priority - a.priority);
  const list = document.getElementById("scheduledList");
  list.innerHTML = "";
  scheduled.forEach(task => {
    const li = document.createElement("li");
    li.textContent = `Task: ${task.name} | Priority: ${task.priority}`;
    list.appendChild(li);
  });
}
