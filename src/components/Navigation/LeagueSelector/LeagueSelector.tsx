import React from "react";

import "./LeagueSelector.css";

const LeagueSelector = () => {
  return (
    <div className="leagueSelector-container">
      <div className="leagueSelectorRadio-container">
        <input type="radio" id="serieA" name="league" value="serieA" onChange={event => console.log(event.target)} />
        <label htmlFor="serieA">Serie A</label>
      </div>
      <div className="leagueSelectorRadio-container">
        <input type="radio" id="ucl" name="league" value="ucl" onChange={event => console.log(event.target)} />
        <label htmlFor="ucl">Champions League</label>
      </div>
    </div>
  );
};

export default LeagueSelector;
