import { IclienteRepresentation } from "./iClienteRepresentation"

export interface IcuentaRepresentation{
    id?:string
    numeroCuenta?:number,
    tipoCuenta?:string,
    saldoInicial?:number,
    estado?:boolean,
    cliente?:IclienteRepresentation
}