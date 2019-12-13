import axios from "axios";

export const create = (obj, url) => {
    const pathUrl = `${url}create`;
    return axios.post(pathUrl, obj);
}
export const fetchByQuery = ({offset, limit, searchText = '', url}) => {
    const options = {
        offset: offset,
        limit: limit,
        searchText: searchText
    };
    return axios.get(url, { params: { ...options } })
};

export const deleteOne = (_id, url)=> {
     const pathUrl = `${url}${_id}/delete`;
     axios.delete(pathUrl);
}
export const deleteMany = (listItem, url) => {
    const pathUrl = `${url}deleteMany`;
    return axios.delete(pathUrl, listItem)
};

export const edit = (obj, url) => {
    const pathUrl = `${url}${objUpdate._id}/update`;
    return axios
        .put(
            pathUrl,
            obj
        )
}