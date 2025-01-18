import styles from "./ErrorIcon.module.css";

function ErrorIcon() {
  return (
    <div className={styles["f-modal-alert"]}>
      <div
        className={`${styles["f-modal-icon"]} ${styles["f-modal-error"]} animate`}
      >
        <span className={styles["f-modal-x-mark"]}>
          <span
            className={`${styles["f-modal-line"]} ${styles["f-modal-left"]} animateXLeft`}
          ></span>
          <span
            className={`${styles["f-modal-line"]} ${styles["f-modal-right"]} animateXRight`}
          ></span>
        </span>
        <div className={styles["f-modal-placeholder"]}></div>
        <div className={styles["f-modal-fix"]}></div>
      </div>
    </div>
  );
}
export default ErrorIcon;
