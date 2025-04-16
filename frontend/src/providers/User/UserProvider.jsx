import React, { createContext, useCallback, useContext, useState } from "react";
import { useInterceptor } from "../Interceptor/InterceptorProvider";

const UserContext = createContext({
    updateProfile: async () => {},
    updateDetails: async () => {},
    updatePassword: async () => {},
    applyKYC: async () => {},
});

export const UserProvider = ({ children }) => {
    const { api } = useInterceptor();
    const [isLoading, setIsLoading] = useState(false);
  
    const updateProfile = useCallback(
      async (userId, formData) => {
        try {
          setIsLoading(true);
          const response = await api.put(`/user/${userId}/profile`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          return response;
        } catch (error) {
          return Promise.reject(error);
        } finally {
          setIsLoading(false);
        }
      },
      [api]
    );
  
    const updateDetails = useCallback(
      async (userId, userData) => {
        try {
          const response = await api.put(`/user/${userId}/update`, userData);
          return response;
        } catch (error) {
          return Promise.reject(error);
        }
      },
      [api]
    );
  
    const updatePassword = useCallback(
      async (userId, passwordData) => {
        try {
          const response = await api.put(`/user/${userId}/update-password`, passwordData);
          return response;
        } catch (error) {
          return Promise.reject(error);
        }
      },
      [api]
    );
  
    const applyKYC = useCallback(
      async (userId, formData) => {
        try {
          const response = await api.put(`/user/${userId}/apply-kyc`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          return response;
        } catch (error) {
          return Promise.reject(error);
        }
      },
      [api]
    );
  
    return (
      <UserContext.Provider
        value={{
          updateProfile,
          updateDetails,
          updatePassword,
          applyKYC,
          isLoading,
        }}
      >
        {children}
      </UserContext.Provider>
    );
  };
  
  export const useUser = () => useContext(UserContext);