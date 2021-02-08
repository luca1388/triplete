import React from "react";
import { GiSoccerBall, GiPodium, GiSoccerField, GiRss } from "react-icons/gi";

import { BsInfoCircle } from "react-icons/bs";

import { colors } from "../../../constants/colors";
import Link from "../Link/Link";
import "./NavigationEntries.css";
import { Competition } from "../../../types";
import TableSA from "./Entries/TableSA";
import TableUCL from "./Entries/TableUCL";

interface NavigationEntriesProps {
  mobile?: boolean;
  competition?: Competition;
}

const NavigationEntries: React.FC<NavigationEntriesProps> = ({
  mobile,
  competition,
}) => {
  return (
    <>
      {competition === "SA" ? (
        <TableSA mobile={mobile} />
      ) : (
        <TableUCL mobile={mobile} />
      )}
      <Link to="/marcatori">
        <GiSoccerBall
          className="NavigationIcon"
          color={colors.accent}
          size={mobile ? 32 : 40}
        />
        Marcatori
      </Link>
      <Link to="/partite">
        <GiSoccerField
          className="NavigationIcon"
          color={colors.accent}
          size={mobile ? 32 : 40}
        />
        Partite
      </Link>
      {/* <Link to="/news">
        <GiRss
          className="NavigationIcon"
          color={colors.accent}
          size={mobile ? 32 : 40}
        />
        News
      </Link> */}
      <Link to="/about">
        <BsInfoCircle
          className="NavigationIcon"
          color={colors.accent}
          size={mobile ? 32 : 40}
        />
        Altro
      </Link>
    </>
  );
};

export default NavigationEntries;
