import { userFields } from '../../constant/user';
import moment from "moment";

const checkValidDateInArr = (arr) => {
    for(let i = 0; i < arr.length; i++){
        if (arr[i][0] === "birthDate" && !isValidDate(arr[i][1])) {
            return false;
        }
    }
    return true;
}

const updateUser = ({ array, obj }) => {
    let user = { ...obj };
    let arrAtributesUser = [...array];
    arrAtributesUser.forEach(function (item) {
        user[item[0]] = item[1];
        if (item[0] === "birthDate") {
            if (isValidDate(item[1])) {
                let dateParts = item[1].split("-");
                user[item[0]] = new Date(
                    +dateParts[2],
                    dateParts[1] - 1,
                    +dateParts[0]
                );
            }
        }
    });
    return user;
}

const convertEditItem = (editItem) => {
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

const isValidDate = (dateStr) => {
    const regexDate = /^([0-2][0-9]|(3)[0-1])(\-)(((0)[0-9])|((1)[0-2]))(\-)\d{4}$/;
    return regexDate.test(dateStr);
}

const isValidePhoneNumber = (phoneStr) =>{
    const regexPhoneNumber = /(09|01[2|6|8|9])+([0-9]{8})\b/;
    return regexPhoneNumber.test(phoneStr);
}

const isValideEmail = (email) =>{
    const regexEmail = /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/;
    return regexEmail.test(email);
}

export {
    updateUser,
    convertEditItem,
    isValidDate,
    isValidePhoneNumber,
    isValideEmail,
    checkValidDateInArr
}