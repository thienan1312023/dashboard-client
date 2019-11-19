export function convertObjectToArray(obj){
    let result = Object.keys(obj).map((key) => {
        return { [key]: obj[key] };
    });
    return result;
}