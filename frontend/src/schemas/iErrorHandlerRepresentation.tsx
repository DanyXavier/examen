export interface IErrorHandlerRepresentation extends Error{
    status?:string,
    timestamp?:string,
    message:string,
    debugMessage?:string
}