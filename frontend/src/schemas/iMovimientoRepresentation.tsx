import { IcuentaRepresentation } from "./iCuentaRepresentation";

export interface ImovimientoRepresentation{
    id?:string,
    fecha?:string,
    tipoMovimiento?:string,
    valor?:number,
    saldo?:number,
    cuenta?:IcuentaRepresentation
}