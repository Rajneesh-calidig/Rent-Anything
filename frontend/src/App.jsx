import {BrowserRouter} from "react-router-dom"
import InterceptorProvider from "./providers/Interceptor/InterceptorProvider"
import { AuthProvider } from "./providers/Auth/AuthProvider"
import AppRoutes from "./routes/AppRoutes.jsx"
import { Layout } from "./component/layout/layout.jsx"
import { ToastContainer } from "react-toastify"
import { UserProvider } from "./providers/User/UserProvider.jsx"
 export const App=()=>{
  return (
    <>
     <BrowserRouter>
      <InterceptorProvider>
        <AuthProvider>
          <UserProvider>
            <Layout>
              <AppRoutes />
              <ToastContainer />
            </Layout>
          </UserProvider>
        </AuthProvider>
      </InterceptorProvider>
    </BrowserRouter>
    </>
  )
}