import React from 'react';
import ListItem from '../listItem/ListItem.jsx';
import PropTypes from 'prop-types';
import './FieldTaskList.css';

const FieldTaskList = ({ tasks, filterText, filterDate, sortBy, onRemove, onToggleIsCompleted }) => {
	let sortTask = [...tasks];

	if (filterText !== '') {
		sortTask = sortTask.filter(task => task.taskText.includes(filterText));
	}
	if (filterDate !== '') {
		sortTask = sortTask.filter(task => task.dateTask.includes(filterDate));
	}

	if (sortBy === 'text') {
		sortTask.sort((a,b) => (a.taskText > b.taskText ? 1 : -1));
	} else if (sortBy === 'date') {
		sortTask.sort((a,b) => (new Date(a.dateTask).getTime() > new Date(b.dateTask).getTime() ? 1 : -1));
	} 
	
	return ( 
		<ul className="list">
      {sortTask.map( ({ id, dateTask, taskText, isCompleted }) => 
        <ListItem 
        	key={id} 
        	value={taskText} 
        	date={dateTask}
        	isCompleted={isCompleted}
        	onRemove={() => onRemove(id)}
        	onToggleIsCompleted={() => onToggleIsCompleted(id)}/>
      )}
    </ul>
	);
}

FieldTaskList.propTypes = {
  tasks: PropTypes.array,
  sortBy:PropTypes.string,
  filterText:PropTypes.string,
  filterDate:PropTypes.string,
  onRemove:PropTypes.func,
  onToggleIsCompleted:PropTypes.func,
}
export default FieldTaskList;
