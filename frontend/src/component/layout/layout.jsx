import { Header } from "../header/header";
import { Footer } from "../footer/footer";
import { useLocation } from "react-router-dom";
export const Layout = ({ children }) => {
  const location = useLocation();
  return (
    <>
      <div>
        {location.pathname !== "/google/callback" && <Header></Header>}
        <div className="min-h-dvh">{children}</div>
        {location.pathname !== "/google/callback" &&
          location.pathname !== "/dashboard" && <Footer></Footer>}
      </div>
    </>
  );
};
