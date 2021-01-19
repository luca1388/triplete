import React, { useCallback } from 'react';
import { GiShare } from "react-icons/gi";
import { colors } from '../../constants/colors';
import { useGoogleAnalytics } from '../../hooks/useGoogleAnalytics';

import "./ShareIcon.css";

interface ShareIconProps {
    title: string;
    color?: string;
    size?: number;
    backgroundColor?: string;
}

const ShareIcon: React.FC<ShareIconProps> = ({ title, color, size, backgroundColor }) => {
    const { fireEvent } = useGoogleAnalytics();
    const shareHandler = useCallback(async () => {
        if (typeof navigator !== "undefined" && navigator.share) {
          try {
            await navigator.share({
              title: title,
              url: location.href,
            });
            fireEvent("Share", {
              event_category: "Sharing",
              event_label: "Share site URL",
              siteURL: location.href,
            });
          } catch (e) {
            console.log(e);
          }
        }
      }, []);

    return (
        <GiShare
          className="shareIcon"
          color={color || colors.primary}
          size={size || 32}
          onClick={shareHandler}
        />
    );
};

export default ShareIcon;