import { Link } from "gatsby";
import React from "react";
import Layout from "../../components/Layout/Layout";
import SEO from "../../components/SEO/seo";
import { OutboundLink } from "gatsby-plugin-gtag";

import "./News.css";
import ShareIcon from "../../components/ShareIcon/ShareIcon";

interface NewsProps {
  pageContext: {
    content: string;
    pubDate: string;
    title: string;
    link: string;
    imageUrl: string;
  };
}

const News: React.FC<NewsProps> = ({ pageContext }) => {
  return (
    <Layout>
      <SEO
        title={pageContext.title}
        image={pageContext.imageUrl}
        description="Leggi le ultime news della serie A: notizie di calcio mercato e molto altro sulla tua squadra del cuore."
      />
      <div className="newsContainer">
        <div
          className="cover"
          style={{ backgroundImage: `url(${pageContext.imageUrl})` }}
        />
        {/* <img src={pageContext.imageUrl} /> */}
        <div className="newsText">
          <div className="dateRow">
            <h5 className="newsDate">
              {new Date(pageContext.pubDate).toLocaleDateString("it-IT", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </h5>
            {typeof navigator !== "undefined" && navigator.share && (
              <ShareIcon title={pageContext.title} size={32} />
            )}
          </div>
          <h3>{pageContext.title}</h3>
          <div dangerouslySetInnerHTML={{ __html: pageContext.content }} />
          <div className="linksContainer">
            <OutboundLink href={pageContext.link} target="_blank">
              Leggi di più
            </OutboundLink>
            <Link to="/news" className="backLink">
              Leggi le altre news
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default News;
