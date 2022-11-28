import React from "react";
import IntervalTimeLeft from "../helpers/IntervalTimeLeft";
import TimeLeft from "../helpers/TimeLeft";

export default function CompetitionItem({ item, index }) {
  const returnHours = (e) => {
    return Math.floor(e / 60);
  };

  const returnMins = (e) => {
    return Math.floor(e % 60);
  };

  return (
    <div
      className={
        TimeLeft(
          item.registration_end_date,
          item.registration_end_time_mins
        ) === "Expired"
          ? "row " + "ongoing"
          : "row "
      }
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
          {item.competition_date},{returnHours(item.time_start_mins)}:
          {returnMins(item.time_start_mins)}
        </div>
        <div className="time-left">
          {
            <IntervalTimeLeft
              date={item.competition_date}
              minutes={item.time_start_mins}
            />
          }
        </div>
      </div>
      <div className="duration">3 hrs</div>

      <div className="registration">
        <div className="status">{item.registration_status}</div>
        <div className="time-left">
          {item.registration_status === "Open" ? (
            <IntervalTimeLeft
              date={item.registration_end_date}
              minutes={item.registration_end_time_mins}
            />
          ) : (
            <>Registration Closed</>
          )}
          {/* 05 days, 19 hours, 02 minutes */}
        </div>
      </div>
    </div>
  );
}
