import React, {Component} from 'react';
import { connect } from 'react-redux';
import Form from '../../components/form/Form.jsx';
import TaskList from '../../components/taskList/TaskList';
import { addTask, removeTask, completedTask, changeSorting } from '../../actions/actionCreator.js';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: new Date(),
      taskText: '',
      dateText: '',
      filterText: '',
      filterDate: '',
      textValid: false,
      dateValid: false,
      formValid: false,
    };
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
    let { changeSorting } = this.props;
    changeSorting(e.target.id);

    this.setTaskToLocalStorage();
  }

  toggleIsCompleted = (id) => {
    this.props.completedTask(id);
    this.setTaskToLocalStorage();
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

    this.props.addTask((new Date()).getTime(), taskText, dateText, false);

    this.setState(() => ({
      taskText: '',
      dateText: '',
      textValid: false,
      dateValid: false,
      formValid: false,
    }), this.setTaskToLocalStorage);
  }

  setTaskToLocalStorage = () => {
    let { tasks } = this.props;
    window.localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  deleteTask = (id) => {
    this.props.removeTask(id);
    this.setTaskToLocalStorage();
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
    const { taskText, dateText, filterText, filterDate, textValid, dateValid, date } = this.state;
    const { tasks, sorting } = this.props;

    let sortTask = [...tasks];

    if (filterText !== '') {
      sortTask = sortTask.filter(task => task.taskText.includes(filterText));
    }
    if (filterDate !== '') {
      sortTask = sortTask.filter(task => task.dateTask.includes(filterDate));
    }

    if (sorting === 'text') {
      sortTask.sort((a,b) => (a.taskText > b.taskText ? 1 : -1));
    } else if (sorting === 'date') {
      sortTask.sort((a,b) => (new Date(a.dateTask).getTime() > new Date(b.dateTask).getTime() ? 1 : -1));
    } 

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
          tasks={sortTask} 
          sortBy={sorting}
          filterText={filterText}
          filterDate={filterDate}
          onHandleSort={this.handleSort}
          onRemove={this.deleteTask}
          onToggleIsCompleted={this.toggleIsCompleted}
        />
      </div>
    );
  }
}


const mapStateToProps = state => ({
  tasks: state.tasks,
  sorting: state.sorting,
}) 

const mapDispatchToProps = {
  addTask,
  removeTask,
  completedTask,
  changeSorting,
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
