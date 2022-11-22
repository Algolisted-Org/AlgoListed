const TimeLeft = (date) => {
  let timeLeft;

  (() => {
    const now = new Date();
    const eventDate = new Date(date);
    const currentTime = now.getTime();
    const eventTime = eventDate.getTime();
    const remTime = eventTime - currentTime;

    let s = Math.floor(remTime / 1000);
    let m = Math.floor(s / 60);
    let h = Math.floor(m / 60);
    const d = Math.floor(h / 24);

    h %= 24;
    m %= 60;
    s %= 60;

    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;
    //if day the time is negative then show expired
    if (d < 0 || h < 0 || m < 0 || s < 0) {
      return (timeLeft = 'Expired');
    }

    if (d === 0) {
      return (timeLeft = `${h} hours ${m} minutes`);
    } else if (d === 1) {
      // return `${h}h ${m}m ${s}s`
      return (timeLeft = `${d} day, ${h} hours ${m} minutes`);
    } else {
      // return `${d}d ${h}h ${m}m ${s}s`
      return (timeLeft = `${d} days, ${h} hours ${m} minutes`);
    }
  })();

  return timeLeft;
};

export default TimeLeft;
