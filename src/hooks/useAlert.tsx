import { useContext } from "react";
import { AlertContext } from "../component/AlertContainer";

const useAlert = () => {
  const conext = useContext(AlertContext);

  if (!conext) throw new Error("useAlert must be used within AlertProvider");

  return conext;
};

export default useAlert;
