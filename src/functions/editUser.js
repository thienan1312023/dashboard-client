export const updateUser = ({array, obj}) => {
    let user = {...obj};
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