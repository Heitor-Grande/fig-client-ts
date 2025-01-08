import NavBar from "../components/navBar"
import { Outlet } from "react-router-dom";
import Footer from "../components/footer";

function MainPage() {
    return (
        <>
            <NavBar />
            <Outlet />
            <Footer />
        </>
    )
}


export default MainPage