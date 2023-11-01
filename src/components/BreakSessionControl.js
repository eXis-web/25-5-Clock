import React from 'react';
import './app.css';

function BreakSessionControl({ title, value, onIncrement, onDecrement }) {
  return (
    <div className="control">
      <div className="lengthTitle" id={title.toLowerCase() + "-label"}>{title} Length</div>
      <div className="controls">
        <button id={title.toLowerCase() + "-decrement"} onClick={onDecrement}>-</button>
        <div className="breaklength" id={title.toLowerCase() + "-length"}>{value}</div>
        <button id={title.toLowerCase() + "-increment"} onClick={onIncrement}>+</button>
      </div>
    </div>
  );
}

export default BreakSessionControl;
