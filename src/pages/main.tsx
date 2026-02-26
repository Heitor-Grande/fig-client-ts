import NavBar from "../components/navBar"
import { Outlet } from "react-router-dom";
import Footer from "../components/footer";
import "./css/style.css"

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