export class ToDo {
  constructor() {
    this.tasks = this.loadData("tasks");
    this.doneTask = this.loadData("done");
  }

  loadData(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
  }

  saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  add(task) {
    this.tasks.push(task);
    this.saveData("tasks", this.tasks);
  }

  saveAsDone(task) {
    this.doneTask.push(task);
    this.saveData("done", this.doneTask);
  }

  remove(id, type) {
    const collection = type === "current" ? this.tasks : this.doneTask;
    const index = collection.findIndex((item) => item.id === id);

    if (index !== -1) {
      collection.splice(index, 1);
      this.saveData(type === "current" ? "tasks" : "done", collection);
    }
  }

  edit(id, newTask) {
    const index = this.tasks.findIndex((item) => item.id === id);

    if (index !== -1) {
      this.tasks[index].taskName = newTask;
      this.saveData("tasks", this.tasks);
    }
  }

  getAllTasks() {
    return this.tasks;
  }

  getAllDoneTasks() {
    return this.doneTask;
  }
}
