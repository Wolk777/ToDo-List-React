import { ADD_TASK, REMOVE_TASK, COMPLETED_TASK } from '../constans.js';

const initialTasks = [
  {
    id: 1575959183146,
    taskText: 'Task7',
    dateTask: '2019-12-03',
    isCompleted: false,
  },
  {
    id: 1575959133146,
    taskText: 'Task2',
    dateTask: '2019-12-04',
    isCompleted: false,
  },
  {
    id: 1575952133146,
    taskText: 'Task9',
    dateTask: '2019-12-09',
    isCompleted: true,
  },
  {
    id: 1575952133946,
    taskText: 'Task92',
    dateTask: '2019-12-03',
    isCompleted: false,
  },
];

const tasksState = window.localStorage.getItem('tasks') ? JSON.parse(window.localStorage.getItem('tasks')) : initialTasks;
window.localStorage.setItem('tasks', JSON.stringify(tasksState));

const tasks = (state = tasksState, { type, id, taskText, dateTask, isCompleted }) => {
  switch (type) {
    case ADD_TASK:
      return [
        ...state, {
          id,
          taskText,
          dateTask,
          isCompleted,
        }];
      break;
    case REMOVE_TASK:
      return [...state].filter((task) => task.id !== id);
      break;
    case COMPLETED_TASK:
      return [...state].map((task) => {
        if (task.id === id) {
          task.isCompleted = !task.isCompleted;
        }
        return task;
      });
      break;
    default:
      return state;
  }
};

export default tasks;
