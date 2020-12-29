import React from 'react';
import Layout from '../../components/Layout/Layout';
import SEO from '../../components/SEO/seo';

import "./About.css";

interface AboutProps {
    pageContext: {
        slug?: string;
        title: string;
        html: string;
    }
}

const About: React.FC<AboutProps> = ({ pageContext }) => {
    return (
        <Layout>
            <SEO title={pageContext.title} />
            <div className="aboutContainer" dangerouslySetInnerHTML={{__html: pageContext.html}}></div>
        </Layout>
    );
};

export default About;