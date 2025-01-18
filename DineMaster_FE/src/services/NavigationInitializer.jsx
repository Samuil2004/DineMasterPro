import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { setNavigationFunction } from "./TokenManager";

const NavigationInitializer = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setNavigationFunction(navigate);
  }, [navigate]);

  return null;
};

export default NavigationInitializer;
