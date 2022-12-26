import { timeLeft } from "./timeLeft";

export const sortByContestTiming = (array) => {
  return [...array].sort((a, b) => {
    const firstItemTime = timeLeft(true, a.competition_date, a.time_start_mins);
    const secondItemTime = timeLeft(
      true,
      b.competition_date,
      b.time_start_mins
    );
    return firstItemTime - secondItemTime;
  });
};
