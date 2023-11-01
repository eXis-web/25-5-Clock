import React from 'react';

function ControlButtons({ running, onToggle, onReset }) {
  return (
    <div id="controls">
      <button id="start_stop" onClick={onToggle}>
        {running ? "Pause" : "Start"}
      </button>
      <button id="reset" onClick={onReset}>Reset</button>
    </div>
  );
}

export default ControlButtons;
