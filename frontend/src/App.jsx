import {BrowserRouter,Route,Routes} from "react-router-dom"
import { Layout } from "./component/layout/layout"
import { Home } from "./component/home/home"
import { Signup } from "./component/signup/signup"
import { SignIn } from "./component/signin/signin"
 export const App=()=>{
  return (
    <>
     <BrowserRouter>
     <Layout>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/signin" element={<SignIn/>}></Route>
      </Routes>
      </Layout>
    </BrowserRouter>
    </>
  )
}