import { Route, Routes } from "react-router-dom";
import Clientes from "./pages/admin/clientes";
import Cuentas from "./pages/admin/cuentas";
import Movimientos from "./pages/admin/movimientos";
import Reportes from "./pages/admin/reportes";
import Layout from "./pages/layout";

export default function App(){
    return(
       <Routes>
            <Route path="" element={<Layout/>}>
                <Route path="clientes" element={<Clientes/>}></Route>
                <Route path="cuentas" element={<Cuentas/>}></Route>
                <Route path="movimientos" element={<Movimientos/>}></Route>
                <Route path="reportes" element={<Reportes/>}></Route>
            </Route>
       </Routes>
    )
}