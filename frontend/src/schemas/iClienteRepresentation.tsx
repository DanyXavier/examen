import { IpersonaRepresentation } from "./iPersonaRepresentation";

export interface IclienteRepresentation extends IpersonaRepresentation{
    id?:string,
    password?:string,
    estado?:boolean,
}
