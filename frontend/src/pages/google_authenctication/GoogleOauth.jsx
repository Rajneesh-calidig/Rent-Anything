import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useInterceptor } from "../../providers/Interceptor/InterceptorProvider";

const GoogleOauth = () => {
  const navigate = useNavigate();
  const { api } = useInterceptor();
  const query = new URLSearchParams(window.location.search);
  const code = query.get("code");
  const error = query.get("error");
  useEffect(() => {
    console.log(code);
    const callback = async () => {
      try {
        if (code) {
          await api.get(`/auth/google/callback?code=${code}`);
          console.log(window.opener);
          if (window.opener) {
            window.opener.postMessage(
              { type: "GOOGLE_AUTH_SUCCESS" },
              window.origin
            );
          }
          window.close();
        }
      } catch (err) {
        console.error(err);
      }
    };
    callback();
  }, [code]);
  return <p>Authenticating...</p>;
};

export default GoogleOauth;
