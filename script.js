let tasks = [];

document.getElementById("addTask").addEventListener("click", () => {
  const name = document.getElementById("taskName").value.trim();
  const priority = parseInt(document.getElementById("priority").value);
  const cost = parseInt(document.getElementById("cost").value);

  if (!name || isNaN(priority) || isNaN(cost)) {
    alert("Please enter valid task details!");
    return;
  }

  tasks.push({ name, priority, cost });
  displayTasks();
  clearInputs();
});

function clearInputs() {
  document.getElementById("taskName").value = "";
  document.getElementById("priority").value = "";
  document.getElementById("cost").value = "";
}

function displayTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  tasks.forEach((t, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${t.name} | Priority: ${t.priority} | Cost: ${t.cost}
      <button class="edit-btn" onclick="editTask(${index})">✏️</button>
      <button class="delete-btn" onclick="deleteTask(${index})">🗑️</button>
    `;
    taskList.appendChild(li);
  });
}

function editTask(index) {
  const task = tasks[index];
  document.getElementById("taskName").value = task.name;
  document.getElementById("priority").value = task.priority;
  document.getElementById("cost").value = task.cost;

  // Remove the task temporarily
  tasks.splice(index, 1);
  displayTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  displayTasks();
}

document.getElementById("schedule").addEventListener("click", () => {
  if (tasks.length === 0) {
    alert("No tasks to schedule!");
    return;
  }

  const scheduled = [...tasks].sort((a, b) => {
    if (b.priority === a.priority) return a.cost - b.cost;
    return b.priority - a.priority;
  });

  displaySchedule(scheduled);
  calculateTotalCost(scheduled);
});

function displaySchedule(scheduled) {
  const scheduleList = document.getElementById("scheduleList");
  scheduleList.innerHTML = "";
  scheduled.forEach((t, i) => {
    const li = document.createElement("li");
    li.textContent = `${i + 1}. ${t.name} → Priority: ${t.priority}, Cost: ${t.cost}`;
    scheduleList.appendChild(li);
  });
}

function calculateTotalCost(scheduled) {
  const total = scheduled.reduce((sum, t) => sum + t.cost, 0);
  const totalEl = document.createElement("li");
  totalEl.style.fontWeight = "bold";
  totalEl.style.background = "#ffe6e6";
  totalEl.textContent = `💰 Total Cost: ${total}`;
  document.getElementById("scheduleList").appendChild(totalEl);
}

// ----- Bar Chart (Toggle Show/Hide) -----
let chartVisible = false;

document.getElementById("showChart").addEventListener("click", () => {
  const chartContainer = document.getElementById("chartContainer");
  const btn = document.getElementById("showChart");

  if (!chartVisible) {
    if (tasks.length === 0) {
      alert("No tasks to visualize!");
      return;
    }

    chartContainer.style.display = "flex";
    btn.textContent = "Hide Chart";
    showBarChart();
    chartVisible = true;
  } else {
    chartContainer.style.display = "none";
    btn.textContent = "Show Chart";
    chartVisible = false;
  }
});

function showBarChart() {
  const ctx = document.getElementById("taskChart").getContext("2d");
  const names = tasks.map(t => t.name);
  const priorities = tasks.map(t => t.priority);
  const costs = tasks.map(t => t.cost);

  if (window.myChart) window.myChart.destroy();

  window.myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: names,
      datasets: [
        {
          label: "Priority",
          data: priorities,
          backgroundColor: "#f9a826",
          borderRadius: 6,
        },
        {
          label: "Cost",
          data: costs,
          backgroundColor: "#f24e1e",
          borderRadius: 6,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: true, labels: { color: "#333" } },
        title: { display: true, text: "Task Priority vs Cost", font: { size: 14 } }
      },
      scales: {
        x: { ticks: { color: "#444", font: { size: 10 } } },
        y: { beginAtZero: true, ticks: { color: "#444", stepSize: 1 } }
      }
    }
  });
}
