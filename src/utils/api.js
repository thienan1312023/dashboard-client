import axios from "axios";
export const fetchData = (offset, limit, searchText = '', url) => {
    const options = {
        offset: offset,
        limit: limit,
        searchText: searchText
    };
    return axios.get(url, { params: { ...options } })
};
