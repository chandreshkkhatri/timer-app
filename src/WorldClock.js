import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';

const Timezone = {
  PST: 'America/Los_Angeles',
  IST: 'Asia/Kolkata',
  None: 'None',
}

const WorldClock = () => {
  const [currentTime, setCurrentTime] = useState('');
  const [selectedTimezone, setSelectedTimezone] = useState(Timezone.None);


  useEffect(() => {
    if (selectedTimezone === Timezone.None) {
      return;
    }
    getTimeInTimeZone(selectedTimezone);
  }, [selectedTimezone]);

  useEffect(() => {
    if (selectedTimezone === Timezone.None) {
      return;
    }
    const interval = setInterval(() => {
      const time = currentTime.getTime();
      setCurrentTime(new Date(time + 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [currentTime]);

  const getTimeInTimeZone = async (timeZone) => {
    try {
      const response = await fetch(`http://worldtimeapi.org/api/timezone/${timeZone}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCurrentTime(new Date(data.datetime));
    } catch (error) {
      console.error('Error fetching time:', error);
    }
  };

  const getFormattedTime = () => {
    
    return moment(currentTime).tz(selectedTimezone).format('h:mm:ss A');
  }

  return (
    <div>
      <select
        value={selectedTimezone} onChange={(e) => setSelectedTimezone(e.target.value)}>
        <option value={Timezone.None}>None</option>
        <option value={Timezone.PST}>Pacific Standard Time (PST)</option>
        <option value={Timezone.IST}>Indian Standard Time (IST)</option>
      </select>
      {selectedTimezone === Timezone.None ? <p>Select a timezone</p> :
        <div>
          <h3>{selectedTimezone === Timezone.PST ? 'Current Time (PST)' : 'Current Time (IST)'}</h3>
          <p>{getFormattedTime()}</p>
        </div>
      }
    </div>
  );
};

export default WorldClock;
