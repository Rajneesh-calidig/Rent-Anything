import {BrowserRouter,Route,Routes} from "react-router-dom"
import { Layout } from "./component/layout/layout"
import { Home } from "./component/home/home"
import { Signup } from "./component/signup/signup"
import { SignIn } from "./component/signin/signin"
import InterceptorProvider from "./providers/Interceptor/InterceptorProvider"
import { AuthProvider } from "./providers/Auth/AuthProvider"
import Dashboard from "./pages/Dashboard.jsx"
 export const App=()=>{
  return (
    <>
     <BrowserRouter>
     <InterceptorProvider>
      <AuthProvider>
     <Layout>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/signin" element={<SignIn/>}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
      </Routes>
      </Layout>
      </AuthProvider>
      </InterceptorProvider>
    </BrowserRouter>
    </>
  )
}