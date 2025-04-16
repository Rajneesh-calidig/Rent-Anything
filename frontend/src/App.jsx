import {BrowserRouter} from "react-router-dom"
import InterceptorProvider from "./providers/Interceptor/InterceptorProvider"
import { AuthProvider } from "./providers/Auth/AuthProvider"
import AppRoutes from "./routes/AppRoutes.jsx"
import { Layout } from "./component/layout/layout.jsx"
import { ToastContainer } from "react-toastify"
import { UserProvider } from "./providers/User/UserProvider.jsx"
import { ItemProvider } from "./providers/Items/ItemProvider.jsx"
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