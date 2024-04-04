import React from "react";
import deleteIcon from "./delete.svg";
import pinIcon from "./pin.svg";
import styles from "./Button.module.css";

function Button({ onClick, onDelete, selected, loading, className, children }) {
  return (
    <button onClick={onClick} className={`${styles.button} ${selected ? styles.selected : ""}`}>
      {selected && <img src={pinIcon} alt="Épingler" className={styles["pin-icon"]} />}
      {selected && (
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
      )}
      {children}
      {loading && <span className={styles.loader}></span>}
    </button>
  );
}

export default Button;
