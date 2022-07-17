import { IclienteRepresentation } from "../schemas/iClienteRepresentation";
import { faker } from '@faker-js/faker/locale/es';
import { fetcher } from "./instance";
import { IClienteDTO } from "../schemas/dto/IClienteDTO";

class ClienteController{
    //private clientes:IclienteRepresentation[];
    constructor(){
        //this.clientes  = Array.from({length:5}).map(()=>createFakerClient());
    }
    async getClienteById(id:string){
        return fetcher.get({url:'/api/v1/cliente',config:{params:{clienteId:id}}}).then(res=>res);
    }
    async editarCliente(cliente:IclienteRepresentation){
        return fetcher.put({url:'/api/v1/cliente',config:cliente}).then((res)=>res.data);
    }
    async eliminarCliente(id:string){
        return fetcher.delete({url:'/api/v1/cliente',config:{params:{clienteId:id}}}).then(res=>res);
    }
    async todosCliente(): Promise<IclienteRepresentation[]>{
        return fetcher.get({url:'/api/v1/cliente/lista'}).then(respose=>respose);
    }
    async postCliente(cliente:IclienteRepresentation):Promise<IclienteRepresentation>{
        return fetcher.post({url:'/api/v1/cliente',config:cliente}).then(respose=>respose.data);
    }
    async searchElement(array:IclienteRepresentation[],keyword:string){
        const searchTerm = keyword.toLowerCase()
            return array.filter(value => {
                return value.nombre!.toLowerCase().match(new RegExp(searchTerm, 'g')) ||
                value.direccion!.toLowerCase().match(new RegExp(searchTerm, 'g')) ||
                value.password!.toLowerCase().match(new RegExp(searchTerm, 'g'))
        })
    }
}
function createFakerClient():IclienteRepresentation{
    return{
        id:faker.datatype.uuid(),
        nombre: faker.name.firstName() +' ' + faker.name.lastName(),
        genero:faker.name.gender(true),
        edad:faker.datatype.number({min:17,max:70}).toString(),
        identificacion:faker.phone.number('13#######-#'),
        direccion:faker.address.city(),
        telefono:faker.phone.number('+593 9########'),
        password:faker.internet.password(),
        estado:faker.datatype.boolean(),
    };
}

export const clientesApi = new ClienteController();
