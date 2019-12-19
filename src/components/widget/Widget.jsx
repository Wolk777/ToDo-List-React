import React from 'react';
import PropTypes from 'prop-types';
import './Widget.css';

const Widget = ( {date} ) => {
	let options = {
	  year: 'numeric',
	  month: 'long',
	  day: 'numeric',
	  weekday: 'long',
	  timezone: 'UTC',
	  hour12: false,
	  hour: 'numeric',
	  minute: 'numeric',
	};

	let dateArr = date.toLocaleString("ru", options).split(', ');
	let year = dateArr[1].split(' ')[2];
	let month = dateArr[1].split(' ')[1];
	let day = dateArr[1].split(' ')[0];
	let weekday = dateArr[0][0].toUpperCase() + dateArr[0].slice(1);
	let time = dateArr[2];

	return (
		<div className='widget'>
			<p className='formTime'>{time}</p>
			<p className='formDate'>{`${weekday}, ${day} ${month} ${year} г.`}</p>
		</div>
	);
}

Widget.propTypes = {
  date:PropTypes.object,
}

export default Widget;