import { setSessionData } from "../services/session.service";

export const openGooglePopup = () => {
  // const callbackURL = "http://localhost:4000/api/auth/google/callback";
  const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${
    import.meta.env.VITE_GOOGLE_CLIENT_ID
  }&redirect_uri=${
    import.meta.env.VITE_GOOGLE_CALLBACK_URL
  }&response_type=code&scope=openid%20email%20profile`;

  const width = 500;
  const height = 600;
  const left = window.innerWidth / 2 - width / 2;
  const top = window.innerHeight / 2 - height / 2;

  const popup = window.open(
    GOOGLE_AUTH_URL,
    "_blank",
    `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes,status=yes`
  );

  const listener = (event) => {
    if (event.origin !== `${import.meta.env.VITE_FILE_URL}`) return;
    console.log(event);
    const { email, error } = event.data;
    if (email) {
      // localStorage.setItem('token', token);
      popup?.close();
      setSessionData("email", email);
      window.location.reload();
      // Optional: trigger login state change or redirect
    } else if (error) {
      console.error("Login failed:", error);
    }
    window.removeEventListener("message", listener);
  };

  window.addEventListener("message", listener);
};
