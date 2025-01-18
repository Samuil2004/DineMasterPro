import styles from "./LocationLoader.module.css";
import React, { useState, useEffect } from "react";

function LocationLoader() {
  return (
    <div className={styles.loaderHolder}>
      <div className={styles.loaderLocation}></div>
    </div>
  );
}

export default LocationLoader;
