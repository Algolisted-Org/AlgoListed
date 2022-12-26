import { timeLeft } from "./TimeLeft";

export const sortByRegistration = (array) => {
  return [...array].sort((a, b) => {
    const firstItemTime = timeLeft(true, a.competition_date, a.time_start_mins);
    const secondItemTime = timeLeft(
      true,
      b.competition_date,
      b.time_start_mins
    );
    if (a.registration_status === "Open") {
      if (a.registration_status === b.registration_status) {
        return firstItemTime - secondItemTime;
      }
      return -1;
    } else if (a.registration_status === "Closed") {
      if (a.registration_status === b.registration_status) {
        return firstItemTime - secondItemTime;
      }
      return 1;
    } else {
      return 0;
    }
  });
};
