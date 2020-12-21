import React from "react";
import Layout from "../../components/Layout/Layout";
import SEO from "../../components/SEO/seo";

import "./News.css";

const News = ({ pageContext }) => {
  console.log(pageContext);
  return (
    <Layout>
      <SEO title={pageContext.title} image={pageContext.imageUrl} />
      <div className="newsContainer">
        <h1>{pageContext.title}</h1>
        <h5>
          {new Date(pageContext.pubDate).toLocaleDateString("it-IT", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </h5>
        <img src={pageContext.imageUrl} />
        <div dangerouslySetInnerHTML={{ __html: pageContext.content }} />
        <a href={pageContext.link} target="_blank">Leggi di più</a>
      </div>
    </Layout>
  );
};

export default News;
