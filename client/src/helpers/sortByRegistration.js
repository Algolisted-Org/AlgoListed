import { timeLeft } from "./TimeLeft";

export const sortByRegistration = (array) => {
  return [...array].sort((a, b) => {
    const registrationItemTime = (itemOrder) => {
      let registrationTime;
      const isRegistrationStarted =
        timeLeft(
          false,
          itemOrder.registration_start_date,
          itemOrder.registration_start_time_mins
        ) === "Expired";
      if (isRegistrationStarted) {
        return (registrationTime = timeLeft(
          true,
          itemOrder.registration_end_date,
          itemOrder.registration_end_time_mins
        ));
      } else if (!isRegistrationStarted) {
        return (registrationTime = timeLeft(
          true,
          itemOrder.registration_start_date,
          itemOrder.registration_start_time_mins
        ));
      }
      return registrationTime;
    };

    const firstCompetitionItemTime = timeLeft(
      true,
      a.competition_date,
      a.time_start_mins
    );
    const secondCompetitionItemTime = timeLeft(
      true,
      b.competition_date,
      b.time_start_mins
    );

    if (a.registration_status === "Open") {
      if (a.registration_status === b.registration_status) {
        return registrationItemTime(a) - registrationItemTime(b);
      }
      return -1;
    } else if (a.registration_status === "Closed") {
      if (a.registration_status === b.registration_status) {
        return firstCompetitionItemTime - secondCompetitionItemTime;
      }
      return 1;
    } else {
      return 0;
    }
  });
};
