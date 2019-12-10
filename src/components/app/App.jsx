import React, {Component} from 'react';
import Form from '../form/Form.jsx';
import TaskList from '../taskList/TaskList'
import './App.css';

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

class App extends Component {
  constructor(props) {
    super(props);

    let tasks = window.localStorage.getItem("tasks") ? JSON.parse(window.localStorage.getItem("tasks")) : initialTasks;
    this.state = {
    date: new Date(),
    taskText: '',
    dateText: '',
    filterText: '',
    filterDate: '',
    tasks: tasks,
    textValid: false,
    dateValid: false,
    formValid: false,
    sortBy: 'default',
    };
    this.setTaskToLocalStorage();
  } 

  handleInputAdd = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value}, 
      () => { this.validateField(name, value) }
    );
  }

  handleInputFilter = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value});
  }

  handleSort = (e) => {
    this.setState({
      sortBy:e.target.id,
    })
  }

  toggleIsCompleted = (id) => {
    let { tasks } = this.state;
    let newTasks = tasks.map( task => {
      if(task.id === id) {
        task.isCompleted = !task.isCompleted;
      }
      return task;
    });
    this.setState({
      tasks: newTasks,
    })
  }

  validateField = (fieldName, value) => {
    let {taskText, dateText, textValid, dateValid} = this.state;
    let currentDate = new Date();
    let oldDate = new Date().setFullYear(new Date().getFullYear()-100);

    if (fieldName === 'taskText') {
      textValid = (!!taskText && taskText.length > 2 && taskText.length < 100);
    } else if (fieldName === 'dateText') {
      dateValid = (!!dateText && Date.parse(value) < +currentDate && Date.parse(value) > +oldDate);
    }
    
    this.setState({
      textValid: textValid,
      dateValid: dateValid,
    }, this.validateForm);
  }

  validateForm = () => {
    let formValid = this.state.textValid && this.state.dateValid;
    this.setState({formValid: formValid});
  }

  addTask = () => {
    let { formValid, taskText, dateText } = this.state;
    if (!formValid) {
      return;
    }
    let newTask = {
      id: new Date().getTime(),
      taskText: taskText,
      dateTask: dateText,
      isCompleted: false,
    };
    this.setState(({ tasks }) => ({
      taskText: '',
      dateText: '',
      textValid: false,
      dateValid: false,
      formValid: false,
      tasks: [...tasks, newTask],
    }));
    this.setTaskToLocalStorage();
  }

  setTaskToLocalStorage = () => {
    let { tasks } = this.state;
    window.localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  removeTask = (id) => {
    let { tasks } = this.state;
    let newTask = tasks.filter( task => task.id !== id);
    this.setState({
      tasks: newTask,
    }, () => { this.setTaskToLocalStorage() });
  }
  
  tick = () => {
    this.setState({
      date: new Date()
    });
  }

  componentDidMount = () => {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount = () => {
    clearInterval(this.timerID);
  }

  render() {
    const { taskText, dateText, filterText, filterDate, textValid, dateValid, date, tasks, sortBy} = this.state;
    return (
      <div className='container'>
        <Form 
          taskText={taskText}
          dateText={dateText}
          filterText={filterText}
          filterDate={filterDate}
          textValid={textValid}
          dateValid={dateValid}
          onInputAdd={this.handleInputAdd}
          onInputFilter={this.handleInputFilter}
          onAdd={this.addTask}
          date={date}
        />
        <TaskList 
          tasks={tasks} 
          sortBy={sortBy}
          filterText={filterText}
          filterDate={filterDate}
          onHandleSort={this.handleSort}
          onRemove={this.removeTask}
          onToggleIsCompleted={this.toggleIsCompleted}
        />
      </div>
    );
  }
}

export default App;
