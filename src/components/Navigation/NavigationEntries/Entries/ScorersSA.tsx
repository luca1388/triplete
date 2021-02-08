import React from "react";
import { GiPodium, GiSoccerBall } from "react-icons/gi";
import { colors } from "../../../../constants/colors";

import Link from "../../Link/Link";

interface ScorersSAProps {
  mobile?: boolean;
}

const ScorersSA: React.FC<ScorersSAProps> = ({ mobile }) => {
  return (
    <Link to="/marcatori">
      <GiSoccerBall
        className="NavigationIcon"
        color={colors.accent}
        size={mobile ? 32 : 40}
      />
      Marcatori
    </Link>
  );
};

export default ScorersSA;