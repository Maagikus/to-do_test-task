export class ToDo {
  constructor() {
    this.tasks = this.loadData("tasks");
    this.doneTask = this.loadData("done");
  }

  loadData(key) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Error loading data:", error);
      return [];
    }
  }

  saveData(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error("Error saving data:", error);
    }
  }

  async add(task) {
    try {
      this.tasks.push(task);
      await this.saveData("tasks", this.tasks);
    } catch (error) {
      console.error("Error adding task:", error);
      throw error;
    }
  }

  async saveAsDone(task) {
    try {
      this.doneTask.push(task);
      await this.saveData("done", this.doneTask);
    } catch (error) {
      console.error("Error saving task as done:", error);
      throw error;
    }
  }

  async remove(id, type) {
    try {
      const collection = type === "current" ? this.tasks : this.doneTask;
      const index = collection.findIndex((item) => item.id === id);

      if (index !== -1) {
        collection.splice(index, 1);
        await this.saveData(type === "current" ? "tasks" : "done", collection);
      }
    } catch (error) {
      console.error("Error removing task:", error);
      throw error;
    }
  }

  async edit(id, newTask) {
    try {
      const index = this.tasks.findIndex((item) => item.id === id);

      if (index !== -1) {
        this.tasks[index].taskName = newTask;
        await this.saveData("tasks", this.tasks);
      }
    } catch (error) {
      console.error("Error editing task:", error);
      throw error;
    }
  }

  getAllTasks() {
    return this.tasks;
  }

  getAllDoneTasks() {
    return this.doneTask;
  }
}
