import axios from "axios";
import React, { useContext, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { routes } from "routes/routes";
import { clearSessionData } from "../../services/session.service";

const InterceptorContext = React.createContext({
  api: null,
});

const InterceptorProvider = ({ children }) => {
  // const navigate = useNavigate();
  const instance = useRef(axios.create());
  const api = instance.current;
  api.defaults.baseURL =import.meta.env.VITE_API_BASE_URL;
  api.defaults.withCredentials = true;

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        clearSessionData();
        // navigate(routes.landing);
        return;
      }
      return Promise.reject(error);
    }
  );

  return (
    <InterceptorContext.Provider value={{ api }}>
      {children}
    </InterceptorContext.Provider>
  );
};

export function useInterceptor() {
  const interceptorContext = useContext(InterceptorContext);

  return interceptorContext;
}

export default InterceptorProvider;