"use client"

import React, { useState, useEffect } from 'react';

const Timer = () => {
  const [minutes, setMinutes] = useState(0); // User sets minutes
  const [countdown, setCountdown] = useState(0); // Internal countdown in seconds
  const [isActive, setIsActive] = useState(false);

  let interval: string | number | NodeJS.Timeout | undefined;
  useEffect(() => {
    

    if (isActive && countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    } else if (countdown === 0 && isActive) {
      setIsActive(false);
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, countdown]);

  const handleVisibilityChange = () => {
    if (document.hidden && isActive) {
      alert('Please return to the app!');
    }
  };

  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isActive]);

  const startTimer = () => {
    setCountdown(minutes * 60); // Convert minutes to seconds
    setIsActive(true);
  };

  const formatTime = () => {
    const mins = Math.floor(countdown / 60);
    const secs = countdown % 60;
    return `${mins}:${secs < 10 ? '0' + secs : secs}`;
  };

  return (
    <div className='timer'>
      <input
        type='number'
        value={minutes}
        onChange={(e) => setMinutes(Number(e.target.value))}
        className='input input-bordered'
        placeholder='Set timer (in minutes)'
      />
      <button onClick={startTimer} className='btn btn-primary'>
        Start Timer
      </button>
      <div>{isActive ? formatTime() : '00:00'}</div>
    </div>
  );
};

export default Timer;
