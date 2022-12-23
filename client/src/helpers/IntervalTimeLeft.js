import { useEffect, useState } from "react";
import TimeLeft from "./TimeLeft";

const IntervalTimeLeft = ({ date, minutes }) => {
  const [intervalTimeLeft, setIntervalTimeLeft] = useState(
    TimeLeft(false, date, minutes)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setIntervalTimeLeft(TimeLeft(false, date, minutes));
    }, 60000);

    return () => clearInterval(interval);
  }, []);
  return intervalTimeLeft;
};

export default IntervalTimeLeft;
