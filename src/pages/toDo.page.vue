<template>
  <section class="todo">
    <div class="todo__container">
      <div class="todo__wrapper">
        <div class="todo__header">
          <h2 class="todo__title gradient">MY TO DO LIST</h2>
          <form
            @submit.prevent="createTask"
            action=""
            class="todo__form form-todo"
          >
            <div class="form-todo__item">
              <input
                v-model="data.task"
                autocomplete="off"
                type="text"
                name="form[]"
                data-error="Ошибка"
                placeholder="Masukan to do list"
                class="form-todo__input input"
              />
            </div>
            <button type="submit" class="form-todo__button button">Save</button>
          </form>
          <div class="todo__counter counter-todo">
            <div
              :class="{ active: data.typeOfTask === 'done' }"
              @click="onChangeType('done')"
              class="counter-todo__item"
            >
              <div class="counter-todo__content gradient">
                Todo Done : {{ countDoneTasks }}
              </div>
            </div>
            <div
              :class="{ active: data.typeOfTask === 'current' }"
              @click="onChangeType('current')"
              class="counter-todo__item"
            >
              <div class="counter-todo__content gradient">
                Todo On Progress : {{ countAllTasks }}
              </div>
            </div>
          </div>
        </div>
        <div class="todo__body body-todo">
          <div v-if="taskToShow.length === 0">Пока ничего нет</div>
          <TransitionGroup class="body-todo__list" name="fade" tag="ul" appear>
            <list-item
              v-for="item of taskToShow"
              :key="item.id"
              :task-name="item.taskName"
              :task-id="item.id"
              :remove-task-function="removeTask"
              :mark-task-as-completed="markTaskAsCompleted"
              :edite-task="editeTask"
              :type="data.typeOfTask"
            ></list-item>
          </TransitionGroup>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import ListItem from "../components/ListItem.vue";
import { computed, onBeforeMount, reactive, watch } from "vue";
import { v4 as uuidv4 } from "uuid";
import { useToDoStore } from "../store/useTodo.store.js";

export default {
  components: {
    ListItem,
  },
  // `setup` is a special hook dedicated for the Composition API.

  setup() {
    const todoStore = useToDoStore();
    // const uuid = uuid()
    onBeforeMount(() => {
      data.taskList = [...todoStore.getAllTasks()];
      data.doneTaskList = [...todoStore.getDoneTasks()];
    });

    const data = reactive({
      task: "",
      taskList: [],
      doneTaskList: [],
      typeOfTask: "current",
    });

    const countAllTasks = computed(() => todoStore.taskList.length);
    const countDoneTasks = computed(() => todoStore.doneTasks.length);
    const taskToShow = computed(() => {
      return data.typeOfTask === "done" ? data.doneTaskList : data.taskList;
    });
    const removeTask = (id, task) => {
      todoStore.remove(id, task);
    };
    const markTaskAsCompleted = (id, task) => {
      todoStore.saveAsDone(id);
      todoStore.remove(id, task);
    };
    const onChangeType = (type) => {
      data.typeOfTask = type;
    };
    const editeTask = (id, newTask) => {
      todoStore.editeTask(id, newTask);
    };
    const createTask = () => {
      if (data.task.length < 2) {
        return;
      }
      const task = {
        id: uuidv4(),
        taskName: data.task,
      };
      try {
        todoStore.create(task);
        data.task = "";
      } catch (e) {
        throw new Error(e);
      }
    };
    watch(
      () => todoStore.taskList,
      () => {
        data.taskList = todoStore.taskList;
      },
    );
    watch(
      () => todoStore.doneTasks,
      () => {
        data.doneTaskList = todoStore.doneTasks;
      },
    );
    return {
      data,
      countAllTasks,
      countDoneTasks,
      taskToShow,
      createTask,
      removeTask,
      markTaskAsCompleted,
      editeTask,
      onChangeType,
    };
  },
};
</script>
