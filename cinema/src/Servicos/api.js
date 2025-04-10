import axios from "axios";

// URL_base https://api.themoviedb.org/3/
// URl_consulta movie/11?api_key=e7032580143498b1c0f963dbddca55ad

const api = axios.create({
    baseURL: "https://api.themoviedb.org/3/"
})

export default api;