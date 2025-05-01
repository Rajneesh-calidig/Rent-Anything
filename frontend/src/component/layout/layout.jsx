import { Header } from "../header/header";
import { Footer } from "../footer/footer";
export const Layout = ({ children }) => {
  return (
    <>
      <div>
        <Header></Header>
        <div className="min-h-dvh">{children}</div>
        <Footer></Footer>
      </div>
    </>
  );
};
