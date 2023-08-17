<template>
  <li class="body-todo__item">
    <div
      class="body-todo__field"
      :class="{ active: isEditing && type === 'current' }"
      @click="onEdit"
    >
      <input
        ref="inputElement"
        @blur="isEditing = false"
        @input="changeTask(taskId, editedTaskName)"
        v-model="editedTaskName"
        autocomplete="off"
        type="text"
        name="form[]"
        data-error="Ошибка"
        :placeholder="taskName"
        class="body-todo__input input"
        :disabled="type === 'done'"
      />
    </div>

    <div class="body-todo__control control-todo">
      <div class="control-todo__item" @click="removeTaskFunction(taskId, type)">
        <img src="../assets/img/trash.svg" alt="" />
      </div>
      <div
        v-if="type === 'current'"
        class="control-todo__item"
        @click="
          () => {
            onFocus();
            changeTask(taskId, editedTaskName);
          }
        "
      >
        <img src="../assets/img/pencil.svg" alt="" />
      </div>
      <div
        v-if="type === 'current'"
        class="control-todo__item"
        @click="markTaskAsCompleted(taskId, type)"
      >
        <img src="../assets/img/check.svg" alt="" />
      </div>
    </div>
  </li>
</template>

<script>
import { ref } from "vue";

export default {
  props: {
    taskName: String,
    taskId: String,
    removeTaskFunction: Function,
    markTaskAsCompleted: Function,
    editeTask: Function,
    type: String,
  },
  setup(props) {
    const isEditing = ref(false);
    const editedTaskName = ref();
    const inputElement = ref(null);

    const onEdit = () => {
      isEditing.value = true;
    };
    const changeTask = (taskId, editedTaskName) => {
      if (!editedTaskName.length) {
        return;
      }
      props.editeTask(taskId, editedTaskName);
    };
    const onFocus = () => {
      isEditing.value = true;
      inputElement.value.focus();
    };

    return {
      isEditing,
      editedTaskName,
      onEdit,
      onFocus,
      inputElement,
      changeTask,
    };
  },
};
</script>
