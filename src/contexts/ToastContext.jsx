import { createContext, useContext, useState } from "react";
import AlertToast from "../components/shared/AlertToast";

const ToastContext = createContext({});

export function ToastProvider({ children }) {
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const showToast = (message, severity = "success") => {
    setToast({ open: true, message, severity });
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <AlertToast toast={toast} setToast={setToast} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
