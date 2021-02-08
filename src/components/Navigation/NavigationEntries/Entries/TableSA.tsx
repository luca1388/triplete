import React from 'react';
import { GiPodium } from 'react-icons/gi';
import { colors } from '../../../../constants/colors';

import Link from "../../Link/Link";

interface TableSAProps {
    mobile?: boolean;
}

const TableSA: React.FC<TableSAProps> = ({ mobile }) => {
  return (
    <Link to="/">
      <GiPodium
        className="NavigationIcon"
        color={colors.accent}
        size={mobile ? 32 : 40}
      />
      Classifica
    </Link>
  );
};

export default TableSA;