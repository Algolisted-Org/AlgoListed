import { useEffect, useState } from 'react';
import TimeLeft from './TimeLeft';

const IntervalTimeLeft = ({ date, minutes }) => {
  const [intervalTimeLeft, setIntervalTimeLeft] = useState(
    TimeLeft(date, minutes)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setIntervalTimeLeft(TimeLeft(date, minutes));
    }, 60000);

    return () => clearInterval(interval);
  }, []);
  return intervalTimeLeft;
};

export default IntervalTimeLeft;
