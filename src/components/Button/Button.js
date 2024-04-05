import React from "react";
import deleteIcon from "./delete.svg";
import pinIcon from "./pin.svg";
import unPinIcon from "./unpin.svg";
import checkIcon from "./check.svg";
import checkCircleIcon from "./check_circle.svg";
import { Loading } from "../Loading/Loading";
import styles from "./Button.module.css";

function Button({ onClick, onDelete, onCheck, onUnCheck, onPin, onUnPin, selected, loading, isCheck, isPin, children }) {
  return (
    <button onClick={onClick} className={`${styles.button} ${selected ? styles.selected : ""}`}>
      {children}
      {loading && <span className={styles.loader}></span>}
      {!selected && (
        <div className={styles.iconsContainer}>
          {isPin && <img src={pinIcon} alt="Épingler" className={styles["pin-icon"]} />}
          {isCheck && <img src={checkCircleIcon} alt="Check" className={styles["check-icon"]} />}
        </div>
      )}
      {selected && (
        <div className={styles.iconsContainer}>
          {isPin ? (
            <img
              src={pinIcon}
              alt="Pin"
              className={styles["pin-icon"]}
              onClick={(e) => {
                e.stopPropagation();
                onPin();
              }}
            />
          ) : (
            <img
              src={unPinIcon}
              alt="UnPin"
              className={styles["pin-icon"]}
              onClick={(e) => {
                e.stopPropagation();
                onUnPin();
              }}
            />
          )}
          {isCheck ? (
            <img
              src={checkCircleIcon}
              alt="UnCheck"
              className={styles["check-icon"]}
              onClick={(e) => {
                e.stopPropagation();
                onUnCheck();
              }}
            />
          ) : (
            <img
              src={checkIcon}
              alt="Check"
              className={styles["check-icon"]}
              onClick={(e) => {
                e.stopPropagation();
                onCheck();
              }}
            />
          )}
          <img
            src={deleteIcon}
            alt="Supprimer"
            className={styles["delete-icon"]}
            onClick={(e) => {
              e.stopPropagation();
              if (window.confirm("Voulez-vous vraiment supprimer cette note ?")) {
                onDelete();
              }
            }}
          />
        </div>
      )}
    </button>
  );
}

export default Button;
