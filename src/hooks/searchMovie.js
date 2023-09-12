import PostService from "../API/PostService";

export default class searchMovie{
    static async getSearchData(query){
        const options = {
            method: 'GET',
            headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NTYwZGU3MDdiMmI4NGM4MzRjMmVlOGFjOTM2ODM2NSIsInN1YiI6IjYzODgwODVlYTQxMGM4MDBhNDM1MjY2MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.v8FHXqdWbVqfbyEcZilf2Vpb-zSNFBM9xouxWc_HpJ0'
            }
        };

        const responce = await PostService.getAll(`https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&language=uk&page=1`, options);
        return responce
    }
}