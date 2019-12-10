import React from 'react';
import './FieldSort.css';

const FieldSort = ({ sortBy, onHandleSort }) => {
	return (
		<div className='sort'>
			Сортировка: 
				<span className='sortWrapper' onClick={onHandleSort}>
					<span id='default' className={sortBy === 'default' ? 'sortItem active' : 'sortItem'}>По умолчанию</span>
					<span id='text' className={sortBy === 'text' ? 'sortItem active' : 'sortItem'}>Тексту</span>
					<span id='date' className={sortBy === 'date' ? 'sortItem active' : 'sortItem'}>Дате</span>
				</span>
		</div>
	);
}

export default FieldSort;