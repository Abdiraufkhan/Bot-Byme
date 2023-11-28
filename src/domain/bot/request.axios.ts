import axios, { AxiosResponse } from "axios";

class SendRequest{

    public get(method, params){
        return axios.get(`/${method}`, {
            baseURL: process.env.BASE_URL,
            params,
        });
    }
    
    // public post(method, data){
    //     console.log(process.env.BASE_URL);
        
        
    //     return axios({
    //         method: "post",
    //         baseURL: process.env.BASE_URL,
    //         url: `/${method}`,
    //         data,
    //     });
    // }
    public async post(method, data) {
        console.log(process.env.BASE_URL);
        return await axios({
            method: "post",
            baseURL: process.env.BASE_URL,
            url: `/${method}`,
            data,
        });
    }
}

export default SendRequest;