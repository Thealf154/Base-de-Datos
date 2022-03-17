import React, { useEffect, useState } from "react";
import "../../css/loading.css";

const LoadingPage = () => {
  const [loadingPercentage, setLoadingPercentage] = useState(0);
  const [userInfoIsLoading, setUserInfoIsLoading] = useState({});

  let widthStyle = {
    width: `${loadingPercentage}%`,
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (loadingPercentage <= 100) {
        setLoadingPercentage(loadingPercentage + 1);
      }
    }, 100);
    return () => {
      clearInterval(interval);
    };
  });

  return (
    <div className="loading-container">
      <div className="loading">
        <h2>Iniciando sesión: {loadingPercentage}%</h2>
        <div className="loading-bar" style={widthStyle}></div>
        <h3 className="loading-info">Usuario: Alfredo Vanegas Arcega</h3>
        <h3 className="loading-info">Teléfono: 442-168-12321</h3>
        <h3 className="loading-info">
          Dirección: Springfield, Avenida Siempre Viva #32
        </h3>
      </div>
    </div>
  );
};

export default LoadingPage;
