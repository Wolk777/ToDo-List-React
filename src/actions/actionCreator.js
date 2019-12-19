import { ADD_TASK, REMOVE_TASK, COMPLETED_TASK, CHANGE_CORTING } from '../constans';

export const addTask = (id, taskText, dateTask, isCompleted) => ({
  type: ADD_TASK,
  id,
  taskText,
  dateTask,
  isCompleted,
});

export const removeTask = (id) => ({
  type: REMOVE_TASK,
  id,
});

export const completedTask = (id) => ({
  type: COMPLETED_TASK,
  id,
});

export const changeSorting = (sortBy) => ({
  type: CHANGE_CORTING,
  sortBy,
});
