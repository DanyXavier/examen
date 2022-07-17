import { Outlet } from "react-router-dom";
import DashboardNavbar from "../components/DashboardNavbar";
import DashboardSidebar from "../components/DashboardSidebar";

export default function Layout(){
    return(
        <div className="main">
            <DashboardNavbar/>
            <div className="container">
                <DashboardSidebar/>
                <div className="content">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
}