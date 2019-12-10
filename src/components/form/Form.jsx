import React from 'react';
import Widget from '../widget/Widget.jsx';
import PropTypes from 'prop-types';
import './Form.css';

const Form = ({ taskText, dateText, filterText, filterDate, textValid, dateValid, onInputAdd, onInputFilter, onAdd, date }) => {
	let inputText = textValid ? 'inputText' : 'inputText invalid';
	let inputDate = dateValid ? 'inputDate' : 'inputDate invalid';

	return (
		<div className='form'>
			<div className='fieldAddTask'>
				<input 
					type='text' 
					name='taskText' 
					className={inputText} 
					placeholder='Введите текст задачи'
					value={taskText} 
					onChange={onInputAdd}/>
				<input 
					type='date' 
					name='dateText' 
					className={inputDate} 
					value={dateText} 
					onChange={onInputAdd}/>
				<button className='btnAdd' onClick={onAdd}>+</button>
			</div>
			<Widget date={date}/>
			<div className='fieldFilterTask'>
				<input 
					type='text' 
					name='filterText' 
					className='filterText'
					placeholder='Введите текст или дату для поиска' 
					value={filterText} 
					onChange={onInputFilter}/>
				<input 
					type='date' 
					name='filterDate' 
					className='filterDate' 
					value={filterDate} 
					onChange={onInputFilter}/>
			</div>
		</div>
	);
}

Form.propTypes = {
  taskText: PropTypes.string,
  dateText:PropTypes.string,
  filterText:PropTypes.string,
  filterDate:PropTypes.string,
  textValid:PropTypes.bool,
  dateValid:PropTypes.bool,
  formValid:PropTypes.bool,
  onInputAdd:PropTypes.func,
  onInputFilter:PropTypes.func,
  onAdd:PropTypes.func,
  date:PropTypes.object,
}

export default Form;
