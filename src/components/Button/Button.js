import React from "react";
import deleteIcon from "./delete.svg";
import deleteIconLight from "./delete-light.svg";
import pinIcon from "./pin.svg";
import pinIconLight from "./pin-light.svg";
import unPinIcon from "./unpin.svg";
import unPinIconLight from "./unpin-light.svg";
import checkIcon from "./check.svg";
import checkIconLight from "./check-light.svg";
import checkCircleIcon from "./check_circle.svg";
import checkCircleIconLight from "./check_circle-light.svg";
import styles from "./Button.module.css";

function Button({ onClick, onDelete, onCheck, onUnCheck, onPin, onUnPin, selected, loading, isCheck, isPin, children, isDarkMode }) {
  return (
    <button onClick={onClick} className={`${isDarkMode ? styles.button : styles.buttonLight} ${selected ? styles.selected : ""}`}>
      {children}
      {loading && <span className={styles.loader}></span>}
      {!selected && (
        <div className={styles.iconsContainer}>
          {isPin && <img src={isDarkMode ? pinIcon : pinIconLight} alt="Épingler" className={styles["pin-icon"]} />}
          {isCheck && <img src={isDarkMode ? checkCircleIcon : checkCircleIconLight} alt="Check" className={styles["check-icon"]} />}
        </div>
      )}
      {selected && (
        <div className={styles.iconsContainer}>
          {isPin ? (
            <img
              src={isDarkMode ? pinIcon : pinIconLight}
              alt="Pin"
              className={styles["pin-icon"]}
              onClick={(e) => {
                e.stopPropagation();
                onPin();
              }}
            />
          ) : (
            <img
              src={isDarkMode ? unPinIcon : unPinIconLight}
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
              src={isDarkMode ? checkCircleIcon : checkCircleIconLight}
              alt="UnCheck"
              className={styles["check-icon"]}
              onClick={(e) => {
                e.stopPropagation();
                onUnCheck();
              }}
            />
          ) : (
            <img
              src={isDarkMode ? checkIcon : checkIconLight}
              alt="Check"
              className={styles["check-icon"]}
              onClick={(e) => {
                e.stopPropagation();
                onCheck();
              }}
            />
          )}
          <img
            src={isDarkMode ? deleteIcon : deleteIconLight}
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
