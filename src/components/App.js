import React, { useState, useEffect, useRef, useCallback } from 'react';
import BreakSessionControl from './BreakSessionControl';
import Timer from './Timer';
import ControlButtons from './ControlButtons';
import Footer from './Footer';
import './app.css';

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timerLabel, setTimerLabel] = useState('Session');
  const [timeLeft, setTimeLeft] = useState(sessionLength * 60);
  const [timerRunning, setTimerRunning] = useState(false);

  const audioRef = useRef(null);

  const switchTimer = useCallback(() => {
    if (timerLabel === 'Session') {
      setTimerLabel('Break');
      setTimeLeft(breakLength * 60);
    } else {
      setTimerLabel('Session');
      setTimeLeft(sessionLength * 60);
    }
  }, [timerLabel, sessionLength, breakLength]);

  const handleReset = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setBreakLength(5);
    setSessionLength(25);
    setTimerLabel('Session');
    setTimeLeft(25 * 60);
    setTimerRunning(false);
  };

  const toggleTimer = () => {
    setTimerRunning(!timerRunning);
  };

  const decrementBreak = () => {
    if (breakLength > 1) {
      setBreakLength(breakLength - 1);
    }
  };

  const incrementBreak = () => {
    if (breakLength < 60) {
      setBreakLength(breakLength + 1);
    }
  };

  const decrementSession = () => {
    if (sessionLength > 1) {
      setSessionLength(sessionLength - 1);
      setTimeLeft((prevTime) => prevTime - 60);
    }
  };

  const incrementSession = () => {
    if (sessionLength < 60) {
      setSessionLength(sessionLength + 1);
      setTimeLeft((prevTime) => prevTime + 60);
    }
  };

  useEffect(() => {
    if (timerRunning) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime === 1) {
            audioRef.current.play();
            switchTimer();
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timerRunning, switchTimer]);

  return (
    <div className="App">
      <h1>25 + 5 Clock</h1>
      <div className="controls-container">
        <BreakSessionControl
          title="Break"
          value={breakLength}
          onIncrement={incrementBreak}
          onDecrement={decrementBreak}
        />
        <BreakSessionControl
          title="Session"
          value={sessionLength}
          onIncrement={incrementSession}
          onDecrement={decrementSession}
        />
      </div>
      <Timer timerLabel={timerLabel} timeLeft={timeLeft} />
      <ControlButtons running={timerRunning} onToggle={toggleTimer} onReset={handleReset} />
      <audio id="beep" ref={audioRef} src="./components/alarm.mp3" />
      <Footer />
    </div>
  );
}

export default App;
