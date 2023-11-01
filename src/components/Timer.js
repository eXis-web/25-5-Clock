import React from 'react';

function Timer({ timerLabel, timeLeft }) {
  return (
    <div id="timer">
      <div id="timer-label">{timerLabel}</div>
      <div id="time-left">{formatTime(timeLeft)}</div>
    </div>
  );
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
  const sec = (seconds % 60).toString().padStart(2, '0');
  return `${minutes}:${sec}`;
}

export default Timer;
