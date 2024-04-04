import React from "react";
import styles from "./Button.module.css";

const Button = ({ onClick, children, selected, loading }) => {
  return (
    <button
      className={`${styles.button} ${selected ? styles.selected : ""} ${
        loading ? styles.loading : ""
      }`}
      onClick={onClick}
    >
      {children}
      {loading && <span className={styles.loader}></span>}
    </button>
  );
};

export default Button;
