import { useEffect, useState } from 'react';
import TimeLeft from './TimeLeft';

const IntervalTimeLeft = ({ date }) => {
  const [intervalTimeLeft, setIntervalTimeLeft] = useState(TimeLeft(date));

  useEffect(() => {
    const interval = setInterval(() => {
      setIntervalTimeLeft(TimeLeft(date));
    }, 60000);

    return () => clearInterval(interval);
  }, []);
  return intervalTimeLeft;
};

export default IntervalTimeLeft;
