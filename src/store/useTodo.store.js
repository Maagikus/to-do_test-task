import { defineStore } from "pinia";
import { ToDo } from "../helpers/toDo.service.js";
export const useToDoStore = defineStore("todo", {
  state: () => ({
    taskList: [],
    doneTasks: [],
  }),
  getters: {},
  actions: {
    getAllTasks() {
      const todoService = new ToDo();
      this.taskList = [...todoService.getAllTasks()];
      return this.taskList;
    },
    getDoneTasks() {
      const todoService = new ToDo();
      this.doneTasks = [...todoService.getAllDoneTasks()];
      return this.doneTasks;
    },
    create(task) {
      const todoService = new ToDo();
      try {
        todoService.add(task);
        this.taskList.push(task);
      } catch (e) {
        throw new Error(e);
      }
    },
    remove(id, type) {
      const todoService = new ToDo();
      todoService.remove(id, type);
      if (type === "current") {
        this.taskList = this.taskList.filter((item) => item.id !== id);
      } else {
        this.doneTasks = this.doneTasks.filter((item) => item.id !== id);
      }
    },
    saveAsDone(id) {
      const todoService = new ToDo();
      const task = this.taskList.find((item) => item.id === id);
      this.doneTasks.push(task);
      todoService.saveAsDone(task);
    },
    editeTask(id, newTask) {
      const todoService = new ToDo();
      const index = this.taskList.findIndex((item) => item.id === id);
      this.taskList[index].taskName = newTask;
      todoService.edit(id, newTask);
    },
  },
});
