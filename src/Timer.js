import React, { useState, useEffect } from 'react';

const Timer = ({ initialTime, removeTimer, id }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (isRunning && timeLeft === 0) return;

    if (!isRunning) {
      setTimeLeft(initialTime);
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, isRunning]);


  return (
    <div>
      <h2>Timer # {id + 1}</h2>
      <p>Time Left: {timeLeft} seconds</p>
      <button onClick={() => setIsRunning(!isRunning)}>{
        isRunning ? 'Reset' : 'Start'
      }</button>
      <button onClick={() => removeTimer(id)}>Remove Timer</button>
    </div>
  );
};

const TimerList = () => {
  const [newTimerTime, setNewTimerTime] = useState('');
  const [timers, setTimers] = useState([]);
  const [timerCounter, setTimerCounter] = useState(0);

  const addTimer = () => {
    setTimers([...timers, { id: timerCounter, time: parseInt(newTimerTime, 10) }]);
    setNewTimerTime('');
    setTimerCounter(timerCounter + 1);
  };

  const removeTimer = (timerId) => {
    setTimers(timers.filter(timer => timer.id !== timerId));
  };

  return (
    <div>
      <input
        type="number"
        value={newTimerTime}
        onChange={(e) => setNewTimerTime(e.target.value)}
        placeholder="Enter time in seconds"
      />
      <button onClick={addTimer}>Add Timer</button>
      <div>
        {timers.map(timer => (
          <Timer
            key={timer.id}
            initialTime={timer.time}
            removeTimer={removeTimer}
            id={timer.id}
          />
        ))}
      </div>
    </div>
  );
};

export default TimerList;