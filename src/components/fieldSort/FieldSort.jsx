import React from 'react';
import './FieldSort.css';

const FieldSort = ({ sortBy, onHandleSort }) => {
	const sort = sortingCriterion => sortBy === sortingCriterion ? 'sortItem active' : 'sortItem';

	return (
		<div className='sort'>
			Сортировка: 
				<span className='sortWrapper' onClick={onHandleSort}>
					<span id='default' className={sort('default')}>По умолчанию</span>
					<span id='text' className={sort('text')}>Тексту</span>
					<span id='date' className={sort('date')}>Дате</span>
				</span>
		</div>
	);
}

export default FieldSort;