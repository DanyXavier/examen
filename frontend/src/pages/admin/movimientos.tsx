import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import Modal from "../../components/modal/Modal";
import { cuentaApi } from "../../controller/cuentaController";
import { movimientoApi } from "../../controller/movimientoController";
import { IcuentaRepresentation } from "../../schemas/iCuentaRepresentation";
import { IErrorHandlerRepresentation } from "../../schemas/iErrorHandlerRepresentation";
import { ImovimientoRepresentation } from "../../schemas/iMovimientoRepresentation";
//2007-12-03
const tipoMovimiento = ["DEBITO", "CREDITO"];
const date = new Date();
const base: ImovimientoRepresentation = {
    fecha: `${date.getFullYear()}-${date.getMonth()<10?'0'+(date.getMonth()+1):date.getMonth()}-${date.getDate()}`,
    tipoMovimiento: tipoMovimiento[0],
    valor: 0,
    saldo: 0,
    cuenta:{
        tipoCuenta:'',
        saldoInicial:0,
        estado:false,
        cliente:{}
    }
}
export default function Movimientos() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [movimientoList, setMovimientoList] = useState<ImovimientoRepresentation[]>([]);
    const [filtrado, setFlitrado] = useState<ImovimientoRepresentation[]>([]);
    const [idx, setIdx] = useState<number>(-1);

    const [cuentas, setCuentas] = useState<IcuentaRepresentation[]>([]);

    useEffect(() => {
        movimientoApi.todosMovimiento().then(res => {
            setMovimientoList(res);
            setFlitrado(res);
        })
        cuentaApi.todosCuenta().then(res => {
            setCuentas(res);
        })
    }, []);
    
    async function handledSearch(event: React.ChangeEvent<HTMLInputElement>) {
        let value = event.target.value;
        if (value.length > 2) {
            let search = await movimientoApi.searchElement(movimientoList, value);
            setFlitrado(search)
        } else {
            setFlitrado(movimientoList)
        }
    }

    return (
        <div className="clientes">
            <span>Movimientos</span>
            <div className="controller">
                <input className="input" type="text" placeholder="Buscar" onChange={handledSearch} />
                <button className="btn color-amarillo amarillo" onClick={() => setIsOpen(true)}>Nueva transacción</button>
            </div>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th className="color-amarillo">Numero de cuenta</th>
                            <th className="color-amarillo">Tipo de cuenta</th>
                            <th className="color-amarillo">Saldo inicial</th>
                            <th className="color-amarillo">Estado</th>
                            <th className="color-amarillo">Movimiento</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtrado.map((item, idx) => (
                            <tr key={idx}>
                                <td>{item.cuenta?.numeroCuenta}</td>
                                <td>{item.cuenta?.tipoCuenta}</td>
                                <td>{item.cuenta?.saldoInicial}</td>
                                <td>{`${item.cuenta?.estado}`}</td>
                                <td>{item.tipoMovimiento + ' de ' + item.valor}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                    <BodyCrearCuenta movimientoList={movimientoList}
                        cuentas={cuentas}
                        setFlitrado={setFlitrado}
                        setIsOpen={() => setIsOpen(false)}
                        setMovimientoList={setMovimientoList}></BodyCrearCuenta>
                </Modal>
            </div>
        </div>
    );
}

type PropsTransaccion = {
    movimientoList: ImovimientoRepresentation[],
    setIsOpen: () => void,
    setMovimientoList: React.Dispatch<React.SetStateAction<ImovimientoRepresentation[]>>,
    setFlitrado: React.Dispatch<React.SetStateAction<ImovimientoRepresentation[]>>,
    cuentas: IcuentaRepresentation[]
}
function BodyCrearCuenta(props: PropsTransaccion) {
    const [movimiento, setMovimiento] = useState<ImovimientoRepresentation>(base);

    useEffect(()=>{
        if(props.cuentas.length!=0){
            setMovimiento({...base,cuenta:props.cuentas[0]})
        }
    },[])

    function handledOnChange(event: React.ChangeEvent<HTMLInputElement>) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setMovimiento({
            ...movimiento,
            [name]: value
        })
    }
    function handledOnClickCrear() {
        try {
            let cuentaMod: ImovimientoRepresentation = movimiento;
            if (!cuentaMod.cuenta) {
                cuentaMod['cuenta'] = props.cuentas[0];
            }
            movimientoApi.postMovimiento(cuentaMod).then(res => {
                let lista = props.movimientoList;
                lista.push(res);
                props.setMovimientoList(lista);
                props.setFlitrado(lista);
                setMovimiento(base);
                props.setIsOpen();
            }).catch(err => {
                if (err instanceof AxiosError) {
                    let data: IErrorHandlerRepresentation = err.response?.data;
                    
                }

                console.log(err)
            })
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <div className="modal-header">
                <span>Crear transacción</span>
            </div>
            <div className="modal-body alone">
                <label htmlFor="genero">Número de cuenta</label>
                <div>
                    <select style={{ width: '99%', marginBottom: '4px' }} className="input" name="numeroCuenta" onChange={(e) => { 
                        //setCuenta({ ...cuenta, tipoCuenta: tipoCuenta[+e.target.value] })
                        let selected:IcuentaRepresentation = props.cuentas[+e.target.value];
                        setMovimiento({...movimiento,cuenta:selected});
                     }}>
                        {props.cuentas.map((item, idx) => (
                            <option key={idx} value={idx}>{item.numeroCuenta} - {item.cliente?.nombre}</option>
                        ))}
                    </select>
                </div>
                <label htmlFor="tipoCuenta">Tipo de cuenta</label>
                <input className="input" name="valor" value={movimiento?.cuenta?.tipoCuenta} disabled></input>
                <label htmlFor="saldoInicial">Saldo Inicial</label>
                <input className="input" name="saldoInicial" value={movimiento?.cuenta?.saldoInicial} disabled></input>
                <label htmlFor="estado">Estado</label>
                <input type='checkbox' name="estado" disabled checked={movimiento.cuenta?.estado}></input>
                <div>
                    <select style={{ width: '99%', marginBottom: '4px' }} className="input" name="tipoMovimiento" onChange={(e) => { setMovimiento({ ...movimiento, tipoMovimiento:tipoMovimiento[+e.target.value] }) }}>
                        {tipoMovimiento.map((item, idx) => (
                            <option key={idx} value={idx}>{item}</option>
                        ))}
                    </select>
                </div>
                <label htmlFor="saldoInicial">Valor</label>
                <input className="input" name="valor" value={movimiento?.valor} onChange={handledOnChange}></input>
            </div>
            <div className="modal-footer">
                <button className="btn color-info info" onClick={() => handledOnClickCrear()}>Guardar</button>
                <button className="btn color-error error" onClick={() => props.setIsOpen()}>Cerrar</button>
            </div>
        </>
    );
}