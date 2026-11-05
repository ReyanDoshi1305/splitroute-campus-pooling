import React from "react";
import { CheckCircleIcon, InfoIcon } from "./Icons";

export function Toast({ toast }) {
  if (!toast) return null;

  return (
    <div className="toast-container">
      <div className={`toast ${toast.type || "success"}`}>
        {toast.type === "info" ? (
          <InfoIcon size={18} />
        ) : (
          <CheckCircleIcon size={18} />
        )}
        <span>{toast.message}</span>
      </div>
    </div>
  );
}
