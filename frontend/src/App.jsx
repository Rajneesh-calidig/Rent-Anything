import {BrowserRouter} from "react-router-dom"
import InterceptorProvider from "./providers/Interceptor/InterceptorProvider"
import { AuthProvider } from "./providers/Auth/AuthProvider"
import AppRoutes from "./routes/AppRoutes.jsx"
import { Layout } from "./component/layout/layout.jsx"
import { ToastContainer } from "react-toastify"
 export const App=()=>{
  return (
    <>
     <BrowserRouter>
      <InterceptorProvider>
        <AuthProvider>
          <Layout>
            <AppRoutes />
            <ToastContainer />
          </Layout>
        </AuthProvider>
      </InterceptorProvider>
    </BrowserRouter>
    </>
  )
}