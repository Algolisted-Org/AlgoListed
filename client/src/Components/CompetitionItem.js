import React from "react";
import { timeLeft } from "../helpers/TimeLeft";

export default function CompetitionItem({ item, index }) {
  const returnHours = (e) => {
    return Math.floor(e / 60);
  };

  const returnMins = (e) => {
    return Math.floor(e % 60);
  };

  const {
    competition_date,
    time_start_mins,
    duration_mins,
    registration_start_date,
    registration_start_time_mins,
    registration_end_date,
    registration_end_time_mins,
    registration_status,
    platform,
    competition_link,
    competition_name,
  } = item;

  const isRegistrationStarted =
    timeLeft(false, registration_start_date, registration_start_time_mins) ===
    "Expired";

  const isRegistrationClosed =
    timeLeft(false, registration_end_date, registration_end_time_mins) ===
    "Expired";

  const isCompetitionStarted =
    timeLeft(false, competition_date, time_start_mins) === "Expired";

  const showTimeLeftToCompetition = () =>
    timeLeft(false, competition_date, time_start_mins);

  const showTimeLeftToCompetitionEnd = () =>
    timeLeft(false, competition_date, time_start_mins + duration_mins);

  const showTimeLeftToRegistrationStart = () =>
    timeLeft(false, registration_start_date, registration_start_time_mins);

  const showTimeLeftToRegistrationEnd = () =>
    timeLeft(false, registration_end_date, registration_end_time_mins);

  return (
    <div
      className={isRegistrationClosed ? "row " + "ongoing" : "row "}
      key={index}
    >
      <div className="hash">{index + 1}</div>
      <div className="platform">{platform}</div>
      <div className="contest">
        <a href={`${competition_link}`} target="_blank">
          {competition_name}
        </a>
      </div>
      <div className="date">
        <div className="date-show">
          {competition_date},{" "}
          <>
            {returnHours(time_start_mins) < 10 ? (
              <>
                {"0"}
                {returnHours(time_start_mins)}
              </>
            ) : (
              <>{returnHours(time_start_mins)}</>
            )}
          </>
          :
          <>
            {returnMins(time_start_mins) < 10 ? (
              <>
                {"0"}
                {returnMins(time_start_mins)}
              </>
            ) : (
              <>{returnMins(time_start_mins)}</>
            )}
          </>
          {}
        </div>
        <div className="time-left">
          {isRegistrationClosed ? (
            <>
              <p>competition will start in</p>
              {showTimeLeftToCompetition()}
            </>
          ) : isCompetitionStarted ? (
            <>
              <p>competition running</p>
              {showTimeLeftToCompetitionEnd()}
            </>
          ) : (
            showTimeLeftToCompetition()
          )}
        </div>
      </div>
      <div className="duration">
        {returnHours(duration_mins)} Hours{" "}
        {returnMins(duration_mins) != 0 ? (
          <>, {returnMins(duration_mins)} Mins</>
        ) : (
          <></>
        )}
      </div>
      <div className="registration">
        <div className="status">
          {isRegistrationStarted ? registration_status : <>Yet to start</>}
        </div>
        <div className="time-left">
          {isRegistrationClosed ? (
            <>Registration Closed</>
          ) : !isRegistrationStarted ? (
            showTimeLeftToRegistrationStart()
          ) : (
            showTimeLeftToRegistrationEnd()
          )}
          {/* 05 days, 19 hours, 02 minutes */}
        </div>
      </div>
    </div>
  );
}
