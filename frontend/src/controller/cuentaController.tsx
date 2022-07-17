import { IcuentaRepresentation } from "../schemas/iCuentaRepresentation";
import { fetcher } from "./instance";

class CuentaController{
    constructor(){
        //this.Cuentas  = Array.from({length:5}).map(()=>createFakerClient());
    }
    async getCuentaById(id:string){
        return fetcher.get({url:'/api/v1/cuenta',config:{params:{id:id}}}).then(res=>res);
    }
    async editarCuenta(cuenta:IcuentaRepresentation){
        return fetcher.put({url:'/api/v1/cuenta',config:cuenta}).then((res)=>res.data);
    }
    async eliminarCuenta(id:string){
        return fetcher.delete({url:'/api/v1/cuenta',config:{params:{id:id}}}).then(res=>res);
    }
    async todosCuenta(): Promise<IcuentaRepresentation[]>{
        return fetcher.get({url:'/api/v1/cuenta/lista'}).then(respose=>respose);
    }
    async postCuenta(cuenta:IcuentaRepresentation):Promise<IcuentaRepresentation>{
        return fetcher.post({url:'/api/v1/cuenta',config:cuenta}).then(respose=>respose.data);
    }
    async searchElement(array:IcuentaRepresentation[],keyword:string){
        const searchTerm = keyword.toLowerCase()
            return array.filter(value => {
                return value.cliente?.nombre!.toLowerCase().match(new RegExp(searchTerm, 'g')) ||
                value.numeroCuenta!.toLowerCase().match(new RegExp(searchTerm, 'g')) ||
                value.tipoCuenta!.toLowerCase().match(new RegExp(searchTerm, 'g'))
        })
    }
}

export const cuentaApi = new CuentaController();