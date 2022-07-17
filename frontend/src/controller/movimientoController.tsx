import { IMovimientoDTO } from "../schemas/dto/IMovimientoDTO";
import { ImovimientoRepresentation } from "../schemas/iMovimientoRepresentation";
import { fetcher } from "./instance";

class MovimientoController{
    constructor(){
        //this.Movimientos  = Array.from({length:5}).map(()=>createFakerClient());
    }
    async getMovimientoById(id:string):Promise<ImovimientoRepresentation>{
        return fetcher.get({url:'/api/v1/movimiento',config:{params:{id:id}}}).then(res=>res);
    }
    async editarMovimiento(movimiento:ImovimientoRepresentation):Promise<ImovimientoRepresentation>{
        return fetcher.put({url:'/api/v1/movimiento',config:movimiento}).then((res)=>res.data);
    }
    async eliminarMovimiento(id:string){
        return fetcher.delete({url:'/api/v1/movimiento',config:{params:{id:id}}}).then(res=>res);
    }
    async todosMovimiento(): Promise<ImovimientoRepresentation[]>{
        return fetcher.get({url:'/api/v1/movimiento/lista'}).then(respose=>respose);
    }
    async postMovimiento(movimiento:ImovimientoRepresentation):Promise<ImovimientoRepresentation>{
        return fetcher.post({url:'/api/v1/movimiento',config:movimiento}).then(respose=>respose.data);
    }
    async getInforme(inicio:string,fin:string,clienteId:string):Promise<IMovimientoDTO[]>{
        return fetcher.get({url:'/api/v1/movimiento/informe',config:{params:{inicio:inicio,fin:fin,clienteId:clienteId}}})
        .then(res=>res);
    }
    async getInformePdf(inicio:string,fin:string,clienteId:string){
        return fetcher.get({url:'/api/v1/movimiento/informe/pdf',config:{
            params:{inicio:inicio,fin:fin,clienteId:clienteId},
            responseType:'blob'
        }})
    }
    async searchElement(array:ImovimientoRepresentation[],keyword:string){
        const searchTerm = keyword.toLowerCase()
        console.log(searchTerm)
            return array.filter(value => {
                return value.cuenta?.cliente?.nombre!.toLowerCase().match(new RegExp(searchTerm, 'g')) ||
                value.tipoMovimiento!.toLowerCase().match(new RegExp(searchTerm, 'g')) ||
                `${value.tipoMovimiento + ' de ' + value.valor}`.toLowerCase().match(new RegExp(searchTerm, 'g'))
        })
    }
}

export const movimientoApi = new MovimientoController();