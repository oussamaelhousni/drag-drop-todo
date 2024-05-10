const draggables = document.querySelectorAll(".task");
const droppables = document.querySelectorAll(".swim-lane");
const addBtn = document.querySelector("button");
draggables.forEach((task) => {
  task.addEventListener("dragstart", () => {
    task.classList.add("is-dragging");
  });
  task.addEventListener("dragend", () => {
    task.classList.remove("is-dragging");
  });
});

droppables.forEach((zone) => {
  zone.addEventListener("dragover", (e) => {
    e.preventDefault();
    const bottomTask = InsertAbove(zone, e.clientY);
    const draggedTask = document.querySelector(".is-dragging");
    if (bottomTask) {
      zone.insertBefore(draggedTask, bottomTask);
    } else {
      zone.appendChild(draggedTask);
    }
  });
});

function InsertAbove(zone, clientY) {
  const tasks = zone.querySelectorAll(".task:not(.is_dragging)");
  let closesTask = null;
  let smallestOffset = Number.NEGATIVE_INFINITY;
  tasks.forEach((t) => {
    const { top } = t.getBoundingClientRect();
    const difference = clientY - top;
    if (difference < 0 && difference > smallestOffset) {
      closesTask = t;
      smallestOffset = difference;
    }
  });
  return closesTask;
}

const onAddTask = () => {};

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const newTask = document.createElement("p");
  newTask.classList.add("task");
  newTask.setAttribute("draggable", "true");
  const text = document.querySelector("input").value;
  if (text) {
    newTask.innerHTML = text;
    droppables[0].appendChild(newTask);
    document.querySelector("input").value = "";
    newTask.addEventListener("dragstart", () => {
      newTask.classList.add("is-dragging");
    });
    newTask.addEventListener("dragend", () => {
      newTask.classList.remove("is-dragging");
    });
  }
});
