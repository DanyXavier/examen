import { useEffect, useState } from "react"
import { clientesApi } from "../../controller/clienteController";
import { movimientoApi } from "../../controller/movimientoController";
import { IMovimientoDTO } from "../../schemas/dto/IMovimientoDTO"
import { IclienteRepresentation } from "../../schemas/iClienteRepresentation";
const date = new Date();
const base = `${date.getFullYear()}-${date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : date.getMonth()}-${date.getDate()}`;
export default function Reportes() {
    const [movimientos, setMovimientos] = useState<IMovimientoDTO[]>([]);
    const [clientes, setClientes] = useState<IclienteRepresentation[]>([]);
    const [cliente, setCliente] = useState<IclienteRepresentation>({});
    const [inicio, setInicio] = useState<string>(base);
    const [fin, setFin] = useState<string>(base);
    //
    useEffect(() => {
        clientesApi.todosCliente().then(res => {
            setClientes(res);
        })
    }, []);
    useEffect(() => {
        if (clientes.length != 0) {
            setCliente(clientes[0]);
        }
    }, [clientes]);
    function handledSearch() {
        let dateIni = new Date(inicio);
        let dateFin = new Date(fin);
        let fechaInicial = `${dateIni.getFullYear()}-${dateIni.getMonth() < 10 ? '0' + (dateIni.getMonth() + 1) : dateIni.getMonth()}-${dateIni.getDate()}`;
        let fechaFinal = `${dateFin.getFullYear()}-${dateFin.getMonth() < 10 ? '0' + (dateFin.getMonth() + 1) : dateFin.getMonth()}-${dateFin.getDate()}`;
        movimientoApi.getInforme(fechaInicial,fechaFinal,cliente.id!).then(response=>{
            setMovimientos(response)
        })
    }
    function handledPdf(){
        let dateIni = new Date(inicio);
        let dateFin = new Date(fin);
        let fechaInicial = `${dateIni.getFullYear()}-${dateIni.getMonth() < 10 ? '0' + (dateIni.getMonth() + 1) : dateIni.getMonth()}-${dateIni.getDate()}`;
        let fechaFinal = `${dateFin.getFullYear()}-${dateFin.getMonth() < 10 ? '0' + (dateFin.getMonth() + 1) : dateFin.getMonth()}-${dateFin.getDate()}`;
        movimientoApi.getInformePdf(fechaInicial,fechaFinal,cliente.id!).then(response=>{
            const url = window.URL.createObjectURL(new Blob([response], { type: 'application/pdf' }));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'reporte.pdf'); //or any other extension
            document.body.appendChild(link);
            link.click();
        })  
    }
    return (
        <div className="clientes">
            <span>Reporte</span>
            <div className="opciones-informe">
                <div>
                    <label htmlFor="clietes">Clientes</label>
                    <select className="input" onChange={e => setCliente(clientes[+e.target.value])}>
                        {clientes.map((item, idx) => (
                            <option key={idx} value={idx}>{item.nombre}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="fechaInicial">Fecha de inicio</label>
                    <input className="input" type="date" onChange={e => setInicio(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="fechaFin">Fecha final</label>
                    <input className="input" type="date" onChange={e => setFin(e.target.value)} />
                </div>
                <button className="btn color-amarillo amarillo" onClick={() => handledSearch()}>Buscar</button>
                <button className="btn color-amarillo amarillo" onClick={() => handledPdf()}>REPORTE PDF</button>
            </div>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th className="color-amarillo">Fecha</th>
                            <th className="color-amarillo">Cliente</th>
                            <th className="color-amarillo">Numero de cuenta</th>
                            <th className="color-amarillo">Tipo</th>
                            <th className="color-amarillo">Saldo inicial</th>
                            <th className="color-amarillo">Estado</th>
                            <th className="color-amarillo">Movimiento</th>
                            <th className="color-amarillo">Saldo Disponible</th>
                        </tr>
                    </thead>
                    <tbody>
                        {movimientos.map((item, idx) => (
                            <tr key={idx}>
                                <td>{item.fecha}</td>
                                <td>{item.cliente}</td>
                                <td>{item.numeroCuenta}</td>
                                <td>{item.tipo}</td>
                                <td>{item.saldoInicial}</td>
                                <td>{`${item.estado}`}</td>
                                <td>{item.movimiento}</td>
                                <td>{item.saldoDisponible}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}