import axios from "axios";
export const fetchData = (offset, limit, url) => {
    const options = {
        offset: offset,
        limit: limit
    };
    return axios.get(url, { params: { ...options } })
};