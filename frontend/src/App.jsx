import { BrowserRouter } from "react-router-dom";
import InterceptorProvider from "./providers/Interceptor/InterceptorProvider";
import { AuthProvider } from "./providers/Auth/AuthProvider";
import { ItemProvider } from "./providers/Items/ItemProvider";
import { UserProvider } from "./providers/User/UserProvider";
import { Layout } from "./component/layout/layout";
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import { LoaderProvider } from "./providers/Loader/LoaderProvider";
import { Loader } from "./component/loader/Loader";
export const App = () => {
  return (
    <>
      <BrowserRouter>
        <InterceptorProvider>
          <LoaderProvider>
            <AuthProvider>
              <UserProvider>
                <ItemProvider>
                  <Layout>
                    <Loader />
                    <AppRoutes />
                    <ToastContainer />
                  </Layout>
                </ItemProvider>
              </UserProvider>
            </AuthProvider>
          </LoaderProvider>
        </InterceptorProvider>
      </BrowserRouter>
    </>
  );
};
