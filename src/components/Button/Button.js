import React from "react";
import deleteIcon from "./delete.svg";
import styles from "./Button.module.css";

function Button({ onClick, onDelete, selected, loading, className, children }) {
  return (
    <button onClick={onClick} className={className}>
      {children}
      {loading && <span className="loader"></span>}
      {selected && (
        <img 
          src={deleteIcon} 
          alt="Supprimer" 
          className={styles["delete-icon"]}
          onClick={(e) => {
            e.stopPropagation(); // Empêcher la propagation du clic vers le parent
            if (window.confirm("Voulez-vous vraiment supprimer cette note ?")) {
              onDelete(); // Appeler la fonction de suppression
            }
            
          }} 
        />
      )}
    </button>
  );
}

export default Button;
