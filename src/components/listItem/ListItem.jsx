import React from 'react';
import PropTypes from 'prop-types';
import './ListItem.css'

const ListItem = ({ value, date, isCompleted, onRemove, onToggleIsCompleted}) => {
  let iconClass =  isCompleted ? 'far fa-check-square' : 'far fa-square';
  let completedClass = isCompleted ? 'listItemTask completed' : 'listItemTask';
  return (
    <li className='listItem'>
      <div className='iconDone'>
        <i className={iconClass} onClick={onToggleIsCompleted}></i> 
      </div>
      <div className={completedClass}>
        <p className='listItemText'>
          {value}
          <i className="fas fa-times" onClick={onRemove}></i>
        </p>
        <p className='listItemDate'>{date}</p>
      </div>
    </li>
  );
}

ListItem.propTypes = {
  value:PropTypes.string,
  date:PropTypes.string,
  isCompleted:PropTypes.bool,
  onRemove:PropTypes.func,
  onToggleIsCompleted:PropTypes.func,
}

export default ListItem;
