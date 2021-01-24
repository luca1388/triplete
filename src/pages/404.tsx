import { Link } from "gatsby";
import React from "react";
import styled from 'styled-components';

import Layout from "../components/Layout/Layout";
import SEO from "../components/SEO/seo";

const Title = styled.h2`
  margin: 0 0 20px;
`;

const Paragraph = styled.p`
  margin: 20px;
`;

const NotFound = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  @media (max-width: 768px) {
    flex-direction: column-reverse;
  }
`;

const List = styled.ul`
  @media (max-width: 768px) {
    margin: 20px;
  }
`;

const NotFoundPage: React.FC = () => (
  <Layout>
    <SEO title="404: Not found" />
    {/* <Title>Strada sbagliata?</Title> */}
    <NotFound>
      <img src="/404.svg" title="Pagina non trovata"  width="70%" />
      <Paragraph>
        <Title>Strada sbagliata?</Title>
        Ci spiace ma questa pagina non esiste o non è piu disponibile. Vuoi
        qualche suggerimento? Prova uno di questi link:
        <List>
          <li><Link to="/">Classifica</Link></li>
          <li><Link to="/marcatori">Marcatori</Link></li>
          <li><Link to="/partite">Partite</Link></li>
          <li><Link to="/news">News</Link></li>
        </List>
      </Paragraph>
      {/* <Paragraph>
        
      </Paragraph> */}
    </NotFound>
  </Layout>
);

export default NotFoundPage;
