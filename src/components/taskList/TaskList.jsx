import React from 'react';
import FieldTaskList from '../fieldTaskList/FieldTaskList.jsx';
import FieldSort from '../fieldSort/FieldSort.jsx';
import PropTypes from 'prop-types';
import './TaskList.css';

const TaskList = ({ tasks, sortBy, filterText, filterDate,  onHandleSort, onRemove, onToggleIsCompleted }) => {
	return (
		<div className='taskList'>
			<FieldSort sortBy={sortBy} onHandleSort={onHandleSort}/>
			{tasks.length > 0 && 
				<FieldTaskList 
					tasks={tasks}
					filterText={filterText}
					filterDate={filterDate}
					sortBy={sortBy}
					onRemove={onRemove}
					onToggleIsCompleted={onToggleIsCompleted}
				/>
			}
		</div>
	);
}

TaskList.propTypes = {
  tasks: PropTypes.array,
  sortBy:PropTypes.string,
  filterText:PropTypes.string,
  filterDate:PropTypes.string,
  onHandleSort:PropTypes.func,
  onRemove:PropTypes.func,
  onToggleIsCompleted:PropTypes.func,
}

export default TaskList;