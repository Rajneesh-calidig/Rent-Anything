import React, { useCallback, useContext, useEffect, useState } from "react";
import { useInterceptor } from "../Interceptor/InterceptorProvider.jsx";
import { clearSessionData, setSessionData } from "../../services/session.service";

const defaultUser = {};

const AuthContext = React.createContext({
  user: defaultUser,
  updateUser: () => {},
  register: async () => {},
  login: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }) => {
  const { api } = useInterceptor();
  const [user, setUser] = useState(defaultUser);

  const updateUser = useCallback((inputUser) => {
    setUser((prevState) => ({ ...prevState, ...inputUser }));
  }, []);

  const getUser = useCallback(async () => {
    try {
      const response = await api.get("/auth/user");
      if (response?.data?.user) {
        updateUser(response.data.user);
        setSessionData("email", response.data.user.email);
        setSessionData("name", response.data.user.name);
        return response;
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  }, [api, updateUser]);

  const register = useCallback(
    async (data) => {
      try {
        const response = await api.post("/auth/register", data);
        return response;
      } catch (err) {
        return Promise.reject(err);
      }
    },
    [api]
  )

  const login = useCallback(
    async (data) => {
      try {
        const response = await api.post("/auth/login", data);
        console.log("email",response.data.user.email)
        setUser(response.data.user)
        setSessionData("email", response.data.user.email);
        setSessionData("name", response.data.user.name);
        // getUser();
        // setSessionData()
        return response;
      } catch (err) {
        return Promise.reject(err);
      }
    },
    [api, getUser]
  );

  const logout = useCallback(async () => {
    try {
      const response = await api.post("/auth/logout", {});
      setUser({});
      clearSessionData();
      console.log(response)
      return response;
    } catch (err) {
      return err.response.data.message;
    }
  }, [api]);

  useEffect(() => {
    if (user._id) {
      return;
    }
    async function fetchUser() {
      const response = await getUser();
      if (response === "jwt expired") {
        clearSessionData();
      }
      // console.log("user from user effect -> ", response);
    }
    fetchUser();
  }, [user, getUser, updateUser]);

  return (
    <AuthContext.Provider
      value={{
        user,
        updateUser,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const AuthContext2 = useContext(AuthContext);

  return AuthContext2;
}