import React from 'react';
import { GiPodium } from 'react-icons/gi';
import { colors } from '../../../../constants/colors';

import Link from "../../Link/Link";

interface TableUCLProps {
    mobile?: boolean;
}

const TableUCL: React.FC<TableUCLProps> = ({ mobile }) => {
  return (
    <Link to="/champions/gironi">
      <GiPodium
        className="NavigationIcon"
        color={colors.accent}
        size={mobile ? 32 : 40}
      />
      Gironi
    </Link>
  );
};

export default TableUCL;