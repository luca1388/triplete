import React from "react";
import {
  GiSoccerBall,
  GiPodium,
  GiSoccerField,
  GiRss
} from "react-icons/gi";

import { BsInfoCircle } from 'react-icons/bs';

import { colors } from '../../constants/colors';
import Link from "./Link/Link";
import './NavigationEntries.css';

interface NavigationEntriesProps {
  mobile?: Boolean;
}

const NavigationEntries: React.FC<NavigationEntriesProps> = ({ mobile }) => {
  return (
    <>
      <Link to="/">
        <GiPodium
          className="NavigationIcon"
          color={colors.accent}
          size={mobile ? 32 : 40}
        />
        Classifica
      </Link>
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
