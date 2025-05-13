import {BrowserRouter} from "react-router-dom"
import InterceptorProvider from "./providers/Interceptor/InterceptorProvider"
import { AuthProvider } from "./providers/Auth/AuthProvider"
import { ItemProvider } from "./providers/Items/ItemProvider"
import { UserProvider } from "./providers/User/UserProvider"
import { Layout } from "./component/layout/layout"
import AppRoutes from "./routes/AppRoutes"
import { ToastContainer } from "react-toastify"
import AdminDashboard from "./component/admin/admin-dashboard"
 export const App=()=>{
  return (
    <>
     <BrowserRouter>
      <InterceptorProvider>
        <AuthProvider>
          <UserProvider>
            <ItemProvider>
              <Layout>
                <AppRoutes />
                <ToastContainer />
              </Layout>
            </ItemProvider>
          </UserProvider>
        </AuthProvider>
      </InterceptorProvider>
    </BrowserRouter>
    </>

  )
}