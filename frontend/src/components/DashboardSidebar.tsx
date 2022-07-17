import { Link } from "react-router-dom";

export default function DashboardSidebar(){
    return(
        <div className="nav-sidebar">
            <div className="nav-navigation">
                <ul>
                    <li><Link className="nav-item" to='/clientes'>Clientes</Link></li>
                    <li><Link className="nav-item" to='/cuentas'>Cuentas</Link></li>
                    <li><Link className="nav-item" to='/movimientos'>Movimientos</Link></li>
                    <li><Link className="nav-item" to='/reportes'>Reportes</Link></li>
                </ul>
            </div>
        </div>
    );
}