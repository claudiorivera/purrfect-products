import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      All rights reserved
      <span role="img" aria-label="cat with heart eyes emoji">
        😻
      </span>
    </footer>
  );
};

export default Footer;
