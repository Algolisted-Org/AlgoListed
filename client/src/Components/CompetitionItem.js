import React from "react";
import TimeLeft from "../helpers/TimeLeft";

export default function CompetitionItem({ item, index }) {
  const returnHours = (e) => {
    return Math.floor(e / 60);
  };

  const returnMins = (e) => {
    return Math.floor(e % 60);
  };

  const isRegistrationStarted =
    TimeLeft(
      false,
      item.registration_start_date,
      item.registration_start_time_mins
    ) === "Expired";

  const isRegistrationClosed =
    TimeLeft(
      false,
      item.registration_end_date,
      item.registration_end_time_mins
    ) === "Expired";

  const isCompetitionStarted =
    TimeLeft(false, item.competition_date, item.time_start_mins) === "Expired";

  const showTimeLeftToCompetition = () =>
    TimeLeft(false, item.competition_date, item.time_start_mins);

  const showTimeLeftToCompetitionEnd = () =>
    TimeLeft(
      false,
      item.competition_date,
      item.time_start_mins + item.duration_mins
    );

  const showTimeLeftToRegistrationStart = () =>
    TimeLeft(
      false,
      item.registration_start_date,
      item.registration_start_time_mins
    );

  const showTimeLeftToRegistrationEnd = () =>
    TimeLeft(
      false,
      item.registration_end_date,
      item.registration_end_time_mins
    );

  return (
    <div
      className={isRegistrationClosed ? "row " + "ongoing" : "row "}
      key={index}
    >
      <div className="hash">{index + 1}</div>
      <div className="platform">{item.platform}</div>
      <div className="contest">
        <a href={`${item.competition_link}`} target="_blank">
          {item.competition_name}
        </a>
      </div>
      <div className="date">
        <div className="date-show">
          {item.competition_date},{" "}
          <>
            {returnHours(item.time_start_mins) < 10 ? (
              <>
                {"0"}
                {returnHours(item.time_start_mins)}
              </>
            ) : (
              <>{returnHours(item.time_start_mins)}</>
            )}
          </>
          :
          <>
            {returnMins(item.time_start_mins) < 10 ? (
              <>
                {"0"}
                {returnMins(item.time_start_mins)}
              </>
            ) : (
              <>{returnMins(item.time_start_mins)}</>
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
        {returnHours(item.duration_mins)} Hours{" "}
        {returnMins(item.duration_mins) != 0 ? (
          <>, {returnMins(item.duration_mins)} Mins</>
        ) : (
          <></>
        )}
      </div>
      <div className="registration">
        <div className="status">
          {isRegistrationStarted ? item.registration_status : <>Yet to start</>}
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
