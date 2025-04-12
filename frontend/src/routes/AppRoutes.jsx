import { Route,Routes,Navigate } from "react-router-dom";
import AuthGuard from "../utils/AuthGuard";
import { Home } from "../component/home/home";
import { SignIn } from "../component/signin/signin";
import Dashboard from "../pages/Dashboard";
import RentItemsPage from "../component/items/items"
import RentItemCard from "../component/rental/rental";
import { Contact } from "../component/contactUs/contactUs";
import { About } from "../component/aboutUs/aboutUs";
import { Signup } from "../component/signup/signup";

const AppRoutes = () => {
    return (
        <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/home" element={<RentItemsPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/rent" element={<RentItemCard />} />
            <Route path="/contact-us" element={<Contact />} />

            <Route element={<AuthGuard isProtected={false} />}>
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<Signup />} />
            </Route>

            <Route element={<AuthGuard isProtected={true} />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="*" element={<RentItemsPage />} />
            </Route>
        </Routes>
    )
}

export default AppRoutes;