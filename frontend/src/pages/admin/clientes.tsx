import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import Modal from "../../components/modal/Modal";
import { clientesApi } from "../../controller/clienteController";
import { IclienteRepresentation } from "../../schemas/iClienteRepresentation";
import { IErrorHandlerRepresentation } from "../../schemas/iErrorHandlerRepresentation";
const base = {
    nombre: '',
    edad: '',
    estado: false,
    identificacion: '',
    telefono: '',
    password: '',
    direccion: '',
    genero: '',
}
const genero = ["MASCULINO", "FEMENINO", "OTRO"]
export default function Clientes() {
    const clientes = clientesApi;
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);
    const [clienteList, setClienteList] = useState<IclienteRepresentation[]>([]);
    const [filtrado, setFlitrado] = useState<IclienteRepresentation[]>([]);
    const [editCliente, setEditCliente] = useState<IclienteRepresentation>({});
    const [idx, setIdx] = useState<number>(-1);

    useEffect(() => {
        clientes.todosCliente().then(res => {
            setClienteList(res);
            setFlitrado(res)
        })
    }, [])

    async function handledSearch(event: React.ChangeEvent<HTMLInputElement>) {
        let value = event.target.value;
        if (value.length > 2) {
            let search = await clientesApi.searchElement(clienteList, value);
            setFlitrado(search)
        } else {
            setFlitrado(clienteList)
        }
    }
    async function handlerEliminar(cliente: IclienteRepresentation) {
        clientesApi.eliminarCliente(cliente.id!).then(response => {
            let lista = clienteList;
            let newLista = lista.filter(item=>item!==cliente);
            setFlitrado(newLista);
            setClienteList(newLista);
        })
    }
    async function handledEditar(cliente: IclienteRepresentation, index: number) {
        setIdx(index);
        setEditCliente(cliente);
        setIsOpenEdit(true);
    }
    return (
        <div className="clientes">
            <span>Clientes</span>
            <div className="controller">
                <input className="input" type="text" placeholder="Buscar" onChange={handledSearch} />
                <button className="btn color-amarillo amarillo" onClick={() => setIsOpen(true)}>Nuevo</button>
            </div>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th className="color-amarillo">Nombres</th>
                            <th className="color-amarillo">Direccion</th>
                            <th className="color-amarillo">Teléfono</th>
                            <th className="color-amarillo">Contraseña</th>
                            <th className="color-amarillo">Estado</th>
                            <th className="color-amarillo">Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtrado.map((item, idx) => (
                            <tr key={idx}>
                                <td>{item.nombre}</td>
                                <td>{item.direccion}</td>
                                <td>{item.telefono}</td>
                                <td>{item.password}</td>
                                <td>{`${item.estado}`}</td>
                                <td>
                                    <div className="moda-footer">
                                        <button className="btn color-amarillo amarillo" onClick={(e) => handledEditar(item, clienteList.indexOf(item))}>Editar</button>
                                        <button className="btn color-error error" onClick={(e) => handlerEliminar(item)}>Eliminar</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                    <ModalCrearCliente clienteList={clienteList}
                        setFlitrado={setFlitrado}
                        setIsOpen={() => setIsOpen(false)}
                        setClienteList={setClienteList}></ModalCrearCliente>
                </Modal>
                <Modal isOpen={isOpenEdit} onClose={() => setIsOpenEdit(false)}>
                    <ModalEditarCliente editCliente={editCliente}
                        indx={idx}
                        clienteList={clienteList}
                        setFlitrado={setFlitrado}
                        setIsOpen={() => setIsOpenEdit(false)}
                        setClienteList={setClienteList} />
                </Modal>
            </div>
        </div>
    );
}
type PropsCreate = {
    clienteList: IclienteRepresentation[],
    setIsOpen: () => void,
    setClienteList: React.Dispatch<React.SetStateAction<IclienteRepresentation[]>>,
    setFlitrado: React.Dispatch<React.SetStateAction<IclienteRepresentation[]>>,

}
function ModalCrearCliente(props: PropsCreate) {
    const [isError, setIsError] = useState<boolean>(false);
    const [error, setError] = useState<IErrorHandlerRepresentation>();
    const [cliente, setCliente] = useState<IclienteRepresentation>(base);
    function handledOnChange(event: React.ChangeEvent<HTMLInputElement>) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setCliente({
            ...cliente,
            [name]: value
        })
    }
    function handledOnClickCrear() {
        setIsError(false);
        clientesApi.postCliente(cliente).then(res => {
            let lista = props.clienteList;
            lista.push(res);
            props.setClienteList(lista);
            props.setFlitrado(lista);
            setCliente(base);
            props.setIsOpen();
        }).catch(err => {
            if (err instanceof AxiosError) {
                let data: IErrorHandlerRepresentation = err.response?.data;
                setIsError(true);
                setError(data);
            }
        })
    }
    return (
        <>
            <div className="modal-header">
                <span>Agregar un nuevo Cliente</span>
            </div>
            <div className="modal-body">
                <div>
                    <label htmlFor="nombre">Nombre</label>
                    <input className="input" name="nombre" onChange={handledOnChange} value={cliente?.nombre}></input>
                    <label htmlFor="edad">Edad</label>
                    <input className="input" name="edad" onChange={handledOnChange} value={cliente?.edad}></input>
                    <label htmlFor="genero">Genero</label>
                    <div>
                        <select style={{ width: '99%', marginBottom: '4px' }} className="input" name="genero" onChange={(e) => { setCliente({ ...cliente, genero: e.target.value }) }} value={cliente.genero}>
                            {genero.map((item, idx) => (
                                <option key={idx} value={item}>{item}</option>
                            ))}
                        </select>
                    </div>
                    <label htmlFor="identificacion">Identificacion</label>
                    <input maxLength={10} className="input" name="identificacion" onChange={handledOnChange} value={cliente?.identificacion}></input>
                </div>
                <div>
                    <label htmlFor="direccion">Direccion</label>
                    <input className="input" name="direccion" onChange={handledOnChange} value={cliente?.direccion}></input>
                    <label htmlFor="telefono">Telefono</label>
                    <input maxLength={10} className="input" name="telefono" onChange={handledOnChange} value={cliente?.telefono}></input>
                    <label htmlFor="password">Contraseña</label>
                    <input type='password' className="input" name="password" onChange={handledOnChange} value={cliente?.password}></input>
                    <label htmlFor="estado">Estado</label>
                    <input type='checkbox' name="estado" onChange={handledOnChange} checked={cliente?.estado}></input>
                </div>
            </div>
            <div className="modal-footer">
                <button className="btn color-info info" onClick={() => handledOnClickCrear()}>Guardar</button>
                <button className="btn color-error error" onClick={() => props.setIsOpen()}>Cerrar</button>
            </div>
        </>
    );
}
type EditarCliente = {
    editCliente: IclienteRepresentation,
    indx: number,
    setIsOpen: () => void,
    clienteList: IclienteRepresentation[],
    setClienteList: React.Dispatch<React.SetStateAction<IclienteRepresentation[]>>,
    setFlitrado: React.Dispatch<React.SetStateAction<IclienteRepresentation[]>>
}
function ModalEditarCliente(props: EditarCliente) {
    const [editor, setEditor] = useState<IclienteRepresentation>(props.editCliente);
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
                let newList = props.clienteList;
                newList[props.indx] = res;
                props.setClienteList(newList);
                props.setFlitrado(newList);
                props.setIsOpen()
            }
        })
    }
    return (
        <>
            <div className="modal-header">
                <span>Editar el Cliente</span>
            </div>
            <div className="modal-body">
                <div>
                    <label htmlFor="nombre">Nombre</label>
                    <input className="input" name="nombre" onChange={handledOnChange} value={editor?.nombre}></input>
                    <label htmlFor="edad">Edad</label>
                    <input className="input" name="edad" onChange={handledOnChange} value={editor?.edad}></input>
                    <label htmlFor="genero">Genero</label>
                    <div>
                        <select style={{ width: '99%', marginBottom: '4px' }} className="input" name="genero" onChange={(e) => { setEditor({ ...editor, genero: e.target.value }) }} value={editor.genero}>
                            {genero.map((item, idx) => (
                                <option key={idx} value={item}>{item}</option>
                            ))}
                        </select>
                    </div>
                    <label htmlFor="identificacion">Identificacion</label>
                    <input maxLength={10} className="input" name="identificacion" onChange={handledOnChange} value={editor?.identificacion}></input>
                </div>
                <div>
                    <label htmlFor="direccion">Direccion</label>
                    <input className="input" name="direccion" onChange={handledOnChange} value={editor?.direccion}></input>
                    <label htmlFor="telefono">Telefono</label>
                    <input maxLength={10} className="input" name="telefono" onChange={handledOnChange} value={editor?.telefono}></input>
                    <label htmlFor="password">Contraseña</label>
                    <input type='password' className="input" name="password" onChange={handledOnChange} value={editor?.password}></input>
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