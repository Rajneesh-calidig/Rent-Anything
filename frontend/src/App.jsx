import {BrowserRouter,Route,Routes} from "react-router-dom"
import { Layout } from "./component/layout/layout"
import { Home } from "./component/home/home"
import { Signup } from "./component/signup/signup"
import { SignIn } from "./component/signin/signin"
import InterceptorProvider from "./providers/Interceptor/InterceptorProvider"
import { AuthProvider } from "./providers/Auth/AuthProvider"
import { Contact } from "./component/contactUs/contactUs"
import { About } from "./component/aboutUs/aboutUs"
import RentItemsPage from "./component/items/items"
import RentItemCard from "./component/rental/rental"
 export const App=()=>{
  return (
    <>
     <BrowserRouter>
     <InterceptorProvider>
      <AuthProvider>
     <Layout>
      <Routes>
        {/* <Route exact path="/" element={<Home></Home>}></Route> */}
        <Route exact path="/" element={<RentItemsPage/>}></Route>
        <Route exact path="/signup" element={<Signup/>}></Route>
        <Route exact path="/signin" element={<SignIn/>}></Route>
        <Route exact path="/contact-us" element={<Contact/>}></Route>
        <Route exact path="/about" element={<About/>}></Route>
        <Route exact path="/rent" element={<RentItemCard/>}></Route>
      </Routes>
      </Layout>
      </AuthProvider>
      </InterceptorProvider>
    </BrowserRouter>
    </>
  )
}