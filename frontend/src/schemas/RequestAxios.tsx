import { AxiosRequestConfig } from "axios";

export interface RequestAxios{
    url:string,
    config?:AxiosRequestConfig|{}
}