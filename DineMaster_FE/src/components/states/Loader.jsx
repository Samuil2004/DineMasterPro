import styles from "./Loader.module.css";
import React, { useState, useEffect } from "react";

function Loader() {
  return (
    <div className={styles.loaderHolder}>
      <div className={styles.loader}></div>
    </div>
  );
}

export default Loader;
