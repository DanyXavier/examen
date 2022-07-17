import axios from 'axios';
import { IconfigRepresentation } from '../schemas/iConfigRepresentation';
import { IErrorHandlerRepresentation } from '../schemas/iErrorHandlerRepresentation';
import { RequestAxios } from '../schemas/RequestAxios';

export const fetcher = {
  get:async(instance:RequestAxios)=>axios.get(instance.url,instance.config).then(res=>res.data),
  post:async(instance:RequestAxios)=>axios.post(instance.url,instance.config).then(res=>res),
  put:async(instance:RequestAxios)=>axios.put(instance.url,instance.config).then(res=>res),
  delete:async(instance:RequestAxios)=>axios.delete(instance.url,instance.config).then(res=>res)
}