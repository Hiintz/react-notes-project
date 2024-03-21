import styles from './Button.module.css';

export function Button({ onClick, children }) {
  return (
    <div className={styles.Button} onClick={onClick}>
      {children}
    </div>
  );
}