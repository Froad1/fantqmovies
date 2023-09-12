import axios from "axios";

export default class PostService{
    static async getAll(url, options){
        const responce = await axios.get(url, options ? options : '');
        return responce;
    }
}