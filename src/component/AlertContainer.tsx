import React, { Fragment } from "react";
import Alert from "./Alert";
// conext, state, provider

interface AlertContextType {
  success: (message: string) => void;
  info: (message: string) => void;
  warning: (message: string) => void;
  error: (message: string) => void;
  dark: (message: string) => void;
}

interface AlertType {
  type: string;
  message: string;
  id: string;
}

export const AlertContext = React.createContext<AlertContextType | null>(null);

const AlertContainer = ({ children }: { children: React.ReactNode }) => {
  const [alerts, setAlerts] = React.useState<AlertType[]>([]);

  const removeAlert = (index: number) => {
    setAlerts((alerts) => alerts.filter((_, i) => i !== index));
  };

  const showAlert = (type: string, message: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setAlerts((prev) => [...prev, { type, message, id }]);
    const timer = setTimeout(() => {
      setAlerts((prev) => prev.filter((alert) => alert.id !== id));
      clearTimeout(timer);
    }, 5000);
  };

  return (
    <AlertContext.Provider
      value={{
        success: (message: string) => showAlert("success", message),
        info: (message: string) => showAlert("info", message),
        warning: (message: string) => showAlert("warning", message),
        error: (message: string) => showAlert("error", message),
        dark: (message: string) => showAlert("dark", message),
      }}
    >
      {children}

      <div className="fixed flex flex-col gap-2 top-2 right-2">
        {alerts.map((alert, index) => {
          return (
            <Fragment key={alert.id}>
              {renderAlert(alert, index, removeAlert)}
            </Fragment>
          );
        })}
      </div>
    </AlertContext.Provider>
  );
};

export default AlertContainer;

const renderAlert = (
  alert: AlertType,
  index: number,
  dismis: (i: number) => void
) => {
  let alertClass = "";
  switch (alert.type) {
    case "success":
      alertClass =
        "text-green-800 bg-green-50 dark:bg-gray-800 dark:text-green-400";
      break;
    case "info":
      alertClass =
        "text-blue-800 bg-blue-50 dark:bg-gray-800 dark:text-blue-400";
      break;
    case "warning":
      alertClass =
        "text-yellow-800 bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300";
      break;
    case "error":
      alertClass = "text-red-800 bg-red-50 dark:bg-gray-800 dark:text-red-400";
      break;
    case "dark":
      alertClass =
        "text-gray-800 bg-gray-50 dark:bg-gray-800 dark:text-gray-300";
      break;
    default:
      // Default case for any missing or unspecified alert.type
      alertClass =
        "text-gray-800 bg-gray-50 dark:bg-gray-800 dark:text-gray-300";
      break;
  }
  return (
    <Alert className={alertClass} dismiss={() => dismis(index)}>
      {alert.message}
    </Alert>
  );
};
