import { navigate } from "gatsby";
import React from "react";
import { getHostName } from "../../utils/stringUtils";

import "./CardNews.css";

interface CardNewsProps {
  title: string;
  link: string;
  source?: string;
  description: string;
  imageURL?: string;
  date: string;
  slug: string;
}

const CardNews: React.FC<CardNewsProps> = ({
  title,
  link,
  imageURL,
  date,
  slug,
}) => {
  if (!link || !title) {
    return null;
  }

  let timeLabel;
  if (!date) {
    timeLabel = "";
  } else {
    let now = new Date();
    let differenceInHrs = Math.floor(
      (now.getTime() - new Date(date).getTime()) / (1000 * 60 * 60)
    );
    let differenceInMin = Math.floor(
      (now.getTime() - new Date(date).getTime()) / (1000 * 60)
    );
    timeLabel =
      differenceInHrs < 1
        ? differenceInMin === 1
          ? differenceInMin + " minuto fa"
          : differenceInMin + " minuti fa"
        : differenceInHrs === 1
        ? differenceInHrs + " ora fa"
        : differenceInHrs + " ore fa";
  }

  return (
    <div className="cardContainer" onClick={() => navigate(slug)}>
      <div className="news">
        <div className="cardNews">
          <div
            className="newsPreview"
            style={{ backgroundImage: `url(${imageURL})` }}
          ></div>
          <div className="newsInfo">
            <div className="newsTitle">{title}</div>
          </div>
        </div>
        <div className="labels">
          <h6>{timeLabel}</h6>
          <h6>{getHostName(link)}</h6>
        </div>
      </div>
    </div>
  );
};

export default CardNews;
