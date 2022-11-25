import React from "react";
import IntervalTimeLeft from "../helpers/IntervalTimeLeft";

export default function CompetitionItem(props) {
  const returnHours = (e) => {
    return Math.floor(e / 60);
  };

  const returnMins = (e) => {
    return Math.floor(e % 60);
  };

  return (
    <div className="row" key={props.index}>
      <div className="hash">{props.index + 1}</div>
      <div className="platform">{props.item.platform}</div>
      <div className="contest">
        <a href={`${props.item.competition_link}`} target="_blank">
          {props.item.competition_name}
        </a>
      </div>
      <div className="date">
        <div className="date-show">
          {props.item.competition_date},
          {returnHours(props.item.time_start_mins)}:
          {returnMins(props.item.time_start_mins)}
        </div>
        <div className="time-left">
          {<IntervalTimeLeft date={props.item.competition_date} />}
        </div>
      </div>
      <div className="duration">3 hrs</div>

      <div className="registration">
        <div className="status">{props.item.registration_status}</div>
        <div className="time-left">
          {props.item.registration_status === "Open" ? (
            <IntervalTimeLeft date={props.item.registration_date} /> ===
            "Expired" ? (
              <>{(props.item.registration_status = "Closed")}</>
            ) : (
              <IntervalTimeLeft date={props.item.registration_end_date} />
            )
          ) : (
            <>Registration Closed</>
          )}
          {/* 05 days, 19 hours, 02 minutes */}
        </div>
      </div>
    </div>
  );
}
