import { defineStore } from "pinia";
import { ToDo } from "../helpers/toDo.service.js";
export const useToDoStore = defineStore("todo", {
  state: () => ({
    taskList: [],
    doneTasks: [],
    todoService: new ToDo(),
  }),
  getters: {},
  actions: {
    getAllTasks() {
      this.taskList = [...this.todoService.getAllTasks()];
      return this.taskList;
    },
    getDoneTasks() {
      this.doneTasks = [...this.todoService.getAllDoneTasks()];
      return this.doneTasks;
    },
    async create(task) {
      try {
        await this.todoService.add(task);
        this.taskList.push(task);
      } catch (e) {
        throw new Error(e);
      }
    },
    async remove(id, type) {
      await this.todoService.remove(id, type);
      if (type === "current") {
        this.taskList = this.taskList.filter((item) => item.id !== id);
      } else {
        this.doneTasks = this.doneTasks.filter((item) => item.id !== id);
      }
    },
    async saveAsDone(id) {
      const task = this.taskList.find((item) => item.id === id);
      try {
        this.doneTasks.push(task);
        await this.todoService.saveAsDone(task);
      } catch (e) {
        throw new Error(e);
      }
    },
    async editeTask(id, newTask) {
      const index = this.taskList.findIndex((item) => item.id === id);
      if (index !== -1) {
        try {
          this.taskList[index].taskName = newTask;
          await this.todoService.edit(id, newTask);
        } catch (e) {
          throw new Error(e);
        }
      }
    },
  },
});
