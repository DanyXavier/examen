import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import Modal from "../../components/modal/Modal";
import { clientesApi } from "../../controller/clienteController";
import { cuentaApi } from "../../controller/cuentaController";
import { IcuentaRepresentation } from "../../schemas/iCuentaRepresentation";
import { IclienteRepresentation } from "../../schemas/iClienteRepresentation";
import { IErrorHandlerRepresentation } from "../../schemas/iErrorHandlerRepresentation";
const tipoCuenta = ["AHORRO", "CORRIENTE"];
const base: IcuentaRepresentation = {
    numeroCuenta: 0,
    tipoCuenta: '',
    saldoInicial: 0,
    estado: false,
    cliente: {}
}
export default function Cuentas() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [cuentaList, setCuentaList] = useState<IcuentaRepresentation[]>([]);
    const [filtrado, setFlitrado] = useState<IcuentaRepresentation[]>([]);
    const [idx, setIdx] = useState<number>(-1);

    const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);
    const [editCuenta, setEditCuenta] = useState<IcuentaRepresentation>({});
    const [clientes, setClientes] = useState<IclienteRepresentation[]>([]);

    useEffect(() => {
        cuentaApi.todosCuenta().then(res => {
            setCuentaList(res);
            setFlitrado(res);
        });
        clientesApi.todosCliente().then(res => {
            setClientes(res);
        })
    }, []);

    async function handledSearch(event: React.ChangeEvent<HTMLInputElement>) {
        let value = event.target.value;
        if (value.length > 2) {
            let search = await cuentaApi.searchElement(cuentaList, value);
            setFlitrado(search)
        } else {
            setFlitrado(cuentaList)
        }
    }
    async function handlerEliminar(cuenta: IcuentaRepresentation) {
        cuentaApi.eliminarCuenta(cuenta.id!).then(response => {
            let lista = cuentaList;
            let newLista = lista.filter(item => item !== cuenta);
            setFlitrado(newLista);
            setCuentaList(newLista);
        })
    }
    async function handledEditar(cuenta: IcuentaRepresentation, index: number) {
        setIdx(index);
        setEditCuenta(cuenta);
        setIsOpenEdit(true);
    }

    return (
        <div className="clientes">
            <span>Cuentas</span>
            <div className="controller">
                <input className="input" type="text" placeholder="Buscar" onChange={handledSearch} />
                <button className="btn color-amarillo amarillo" onClick={() => setIsOpen(true)}>Nueva cuenta</button>
            </div>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th className="color-amarillo">Numero de cuenta</th>
                            <th className="color-amarillo">Tipo de cuenta</th>
                            <th className="color-amarillo">Saldo inicial</th>
                            <th className="color-amarillo">Estado</th>
                            <th className="color-amarillo">Cliente</th>
                            <th className="color-amarillo">Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtrado.map((item, idx) => (
                            <tr key={idx}>
                                <td>{item.numeroCuenta}</td>
                                <td>{item.tipoCuenta}</td>
                                <td>{item.saldoInicial}</td>
                                <td>{`${item.estado}`}</td>
                                <td>{item.cliente?.nombre}</td>
                                <td>
                                    <div className="moda-footer">
                                        <button className="btn color-amarillo amarillo" onClick={(e) => handledEditar(item, cuentaList.indexOf(item))}>Editar</button>
                                        <button className="btn color-error error" onClick={(e) => handlerEliminar(item)}>Eliminar</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                    <BodyCrearCuenta cuentaList={cuentaList}
                        clientes={clientes}
                        setFlitrado={setFlitrado}
                        setIsOpen={() => setIsOpen(false)}
                        setCuentaList={setCuentaList}></BodyCrearCuenta>
                </Modal>
                <Modal isOpen={isOpenEdit} onClose={() => setIsOpenEdit(false)}>
                    <BodyEditarCliente editCuenta={editCuenta}
                        indx={idx}
                        CuentaList={cuentaList}
                        setFlitrado={setFlitrado}
                        setIsOpen={() => setIsOpenEdit(false)}
                        setCuentaList={setCuentaList} />
                </Modal>
            </div>
        </div>
    );
}
type PropsCreate = {
    cuentaList: IcuentaRepresentation[],
    setIsOpen: () => void,
    setCuentaList: React.Dispatch<React.SetStateAction<IcuentaRepresentation[]>>,
    setFlitrado: React.Dispatch<React.SetStateAction<IcuentaRepresentation[]>>,
    clientes: IclienteRepresentation[]
}
function BodyCrearCuenta(props: PropsCreate) {
    const [isError, setIsError] = useState<boolean>(false);
    const [error, setError] = useState<IErrorHandlerRepresentation>();
    const [cuenta, setCuenta] = useState<IcuentaRepresentation>({ ...base,tipoCuenta: tipoCuenta[0] });
    function handledOnChange(event: React.ChangeEvent<HTMLInputElement>) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setCuenta({
            ...cuenta,
            [name]: value
        })
    }
    function handledOnClickCrear() {
        try {
            let clienteMod:IcuentaRepresentation = cuenta;
            if(!clienteMod.cliente){
                clienteMod['cliente'] = props.clientes[0];
            }
            setIsError(false);
            cuentaApi.postCuenta(clienteMod).then(res => {
                let lista = props.cuentaList;
                lista.push(res);
                props.setCuentaList(lista);
                props.setFlitrado(lista);
                setCuenta(base);
                props.setIsOpen();
            }).catch(err => {
                if (err instanceof AxiosError) {
                    let data: IErrorHandlerRepresentation = err.response?.data;
                    setIsError(true);
                    setError(data);
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <div className="modal-header">
                <span>Abrir una nueva cuenta</span>
            </div>
            <div className="modal-body alone">
                <label htmlFor="numeroCuenta">Numero de cuenta</label>
                <input className="input" name="numeroCuenta" onChange={handledOnChange} value={cuenta?.numeroCuenta}></input>
                <label htmlFor="saldoInicial">Saldo Inicial</label>
                <input className="input" name="saldoInicial" onChange={handledOnChange} value={cuenta?.saldoInicial}></input>
                <label htmlFor="genero">Tipo de cuenta</label>
                <div>
                    <select style={{ width: '99%', marginBottom: '4px' }} className="input" name="tipoCuenta" onChange={(e) => { setCuenta({ ...cuenta, tipoCuenta: tipoCuenta[+e.target.value] }) }}>
                        {tipoCuenta.map((item, idx) => (
                            <option key={idx} value={idx}>{item}</option>
                        ))}
                    </select>
                </div>
                <label htmlFor="estado">Estado</label>
                <input type='checkbox' name="estado" onChange={handledOnChange} checked={cuenta?.estado}></input>
                <div>
                    <select style={{ width: '99%', marginBottom: '4px' }} className="input" name="cliente" onChange={(e) => { setCuenta({ ...cuenta, cliente: props.clientes[+e.target.value] }) }}>
                        {props.clientes.map((item, idx) => (
                            <option key={idx} value={idx}>{item.nombre}</option>
                        ))}
                    </select>
                </div>

            </div>
            <div className="modal-footer">
                <button className="btn color-info info" onClick={() => handledOnClickCrear()}>Guardar</button>
                <button className="btn color-error error" onClick={() => props.setIsOpen()}>Cerrar</button>
            </div>
        </>
    );
}
type EditarCuenta = {
    editCuenta: IcuentaRepresentation,
    indx: number,
    setIsOpen: () => void,
    CuentaList: IcuentaRepresentation[],
    setCuentaList: React.Dispatch<React.SetStateAction<IcuentaRepresentation[]>>,
    setFlitrado: React.Dispatch<React.SetStateAction<IcuentaRepresentation[]>>
}
function BodyEditarCliente(props: EditarCuenta) {
    const [editor, setEditor] = useState<IcuentaRepresentation>(props.editCuenta);
    function handledOnChange(event: React.ChangeEvent<HTMLInputElement>) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setEditor({
            ...editor,
            [name]: value
        })
    }
    function handledEditar() {
        clientesApi.editarCliente(editor).then((res: IclienteRepresentation) => {
            if (props.indx !== -1) { 
                let newList = props.CuentaList;
                newList[props.indx] = res;
                props.setCuentaList(newList);
                props.setFlitrado(newList);
                props.setIsOpen()
            }
        })
    }
    return (
        <>
            <div className="modal-header">
                <span>Editar la cuenta</span>
            </div>
            <div className="modal-body">
                <div>
                    <label htmlFor="estado">Estado</label>
                    <input type='checkbox' name="estado" onChange={handledOnChange} checked={editor?.estado}></input>
                </div>
            </div>
            <div className="modal-footer">
                <button className="btn color-info info" onClick={() => handledEditar()}>Editar</button>
                <button className="btn color-error error" onClick={() => props.setIsOpen()}>Cerrar</button>
            </div>
        </>
    );
}
