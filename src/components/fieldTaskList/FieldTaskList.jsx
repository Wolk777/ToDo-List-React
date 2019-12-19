import React from 'react';
import ListItem from '../listItem/ListItem';
import PropTypes from 'prop-types';
import './FieldTaskList.css';

const FieldTaskList = ({ tasks, filterText, filterDate, sortBy, onRemove, onToggleIsCompleted }) => {
	return ( 
		<ul className="list">
      {tasks.map( ({ id, dateTask, taskText, isCompleted }) => 
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
