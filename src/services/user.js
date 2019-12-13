import {create, fetchByQuery, deleteOne, deleteMany, edit} from '../utils/crudAPI';

export const createUser = (obj, url) => {
    return create(obj, url);
};

export const fetchUserByQuery = (query) => {
    return fetchByQuery(query);
}

export const deleteUser = (_id, url) => {
    return deleteOne(_id, url);
} 

export const deleteUsers = (users, url) => {
    return deleteMany(users, url);
}

export const editUser = (user, url) => {
    return edit(user, url);
}