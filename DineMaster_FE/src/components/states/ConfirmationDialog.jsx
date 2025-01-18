import React, { useRef, useState } from "react";

import { ConfirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
function ConfirmationDialog({
  visible,
  setVisible,
  onConfirm,
  onReject,
  content,
}) {
  const toast = useRef(null);
  return (
    <>
      <Toast ref={toast} />
      <ConfirmDialog
        visible={visible}
        onHide={() => setVisible(false)}
        message={content}
        header="Confirmation"
        icon="pi pi-exclamation-triangle"
        accept={onConfirm}
        reject={onReject}
        style={{ width: "50vw" }}
        breakpoints={{ "1100px": "75vw", "960px": "100vw" }}
      />
    </>
  );
}
export default ConfirmationDialog;
