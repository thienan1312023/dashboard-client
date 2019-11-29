export const pathUrl = 'http://localhost:3000/api/user/'
export const headerUserList = [
    {
        sortable: true,
        text: "Họ tên",
        value: "userName"
    },
    {
        sortable: false,
        text: "Địa chỉ",
        value: "address"
    },
    {
        sortable: false,
        text: "Số điện thoại",
        value: "phone"
    },
    {
        sortable: false,
        text: "Ghi chú",
        value: "note"
    },
    {
        sortable: false,
        text: "Chỉnh sửa",
        value: ""
    }
]

export const userFields = {
    userName: "Họ tên",
    phone: "Số điện thoại",
    address: "Địa chỉ",
    note: "Ghi chú",
    email: "Email",
    birthDate: "Ngày sinh",

}

export const defaultItem = {
    userName: "",
    address: "",
    phone: "",
    note: ""
}