import React, { useCallback, useEffect } from "react";
// import { useServiceWorkerUpdater } from "../../hooks/useServiceWorkerUpdater";
// import styled, { keyframes } from "styled-components";
import styles from "./NewVersionBanner.module.css";

// const animatetop = keyframes`
//     from {right:-5rem; opacity:0}
//     to {right:5rem; opacity:1}
// `;

// const Banner = styled.div`
//     display: flex;
//     flex-direction: row;
//     justify-content: center;
//     align-items: center;
//     box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
//     background: white;
//     position: fixed;
//     top: 5rem;
//     right: 5rem;
//     z-index: 5;
//     border-radius: 20px;
//     padding: 10px;
//     -webkit-animation-name: ${animatetop};
//     -webkit-animation-duration: 0.4s;
//     animation-name: ${animatetop};
//     animation-duration: 0.9s;
// `;

// const Button = styled.button`
//     font: inherit;
//     padding: 0.5rem 1.5rem;
//     border: 1px solid #000000;
//     border-radius: 4px;
//     background: #1187d4;
//     color: #fff;
//     cursor: pointer;
//     margin: 10px;
//     text-decoration: none;
//     display: inline-block;
//     &:hover {
//         background-color: rgba(17, 134, 212, 0.74);
//     }
// `;

// const Text = styled.p`
//     width: 200px;
//     padding: 10px;
//     margin: 0;
// `;

interface NewVersionBannerProps {
  onAccept: () => void;
}

const NewVersionBanner: React.FC<NewVersionBannerProps> = ({ onAccept }) => {
  return (
    <div className={styles.Banner}>
      <p className={styles.Text}>
        Nuova versione di <strong>Triplete</strong> disponibile!
      </p>
      <button className={styles.Button} onClick={() => onAccept()}>
        Aggiorna!
      </button>
    </div>
  );
};

export default NewVersionBanner;
