export default class User {
    constructor(_userName = '', _address = '', _phone = '', _email = '', _birthDate = null, _note = ''){
        this.userName = _userName;
        this.address = _address;
        this.phone = _phone;
        this.email = _email;
        this.birthDate = _birthDate;
        this.note = _note;
    }
}