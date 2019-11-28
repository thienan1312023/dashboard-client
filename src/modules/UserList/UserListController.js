import { userFields } from '../../constant/user';
import moment from "moment";

export const updateUser = ({ array, obj }) => {
    let user = { ...obj };
    let arrAtributesUser = [...array];
    arrAtributesUser.forEach(function (item) {
        user[item[0]] = item[1];
        if (item[0] === "birthDate") {
            let dateParts = item[1].split("-");
            user[item[0]] = new Date(
                +dateParts[2],
                dateParts[1] - 1,
                +dateParts[0]
            );
        }
    });
    return user;
}

export const convertEditItem = (editItem) => {
    let editItemConverted = {};
    let cloneItem = Object.assign({}, editItem);
    let array = Object.keys(cloneItem)
        .map(function (key) {
            return (
                key !== "createdAt" &&
                key !== "__v" &&
                key !== "profileImagePath" && [key, cloneItem[key]]
            );
        })
        .filter(function (item) {
            return item !== false;
        });
    const fieldsMapping = { ...userFields };
    editItemConverted.array = array.map(function (item, index) {
        if (array[index][0] === "birthDate" && array[index][1]) {
            array[index][1] = moment(array[index][1])
                .format("DD/MM/YYYY")
                .split("/")
                .join("-");
        }
        return (
            item.value !== "" && {
                0: array[index][0],
                1: array[index][1],
                2: fieldsMapping[array[index][0]]
            }
        );
    });
    editItemConverted.obj = cloneItem;
    return editItemConverted;
}