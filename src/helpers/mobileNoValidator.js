export const mobileValidator = (_, value) => {
    if(!value){
        return Promise.reject(new Error('Phonenumber is required'))
    } else if(value.toString().length !== 10){
        return Promise.reject(new Error('Phonenumber length should be 10 '));
    }else{
        return  Promise.resolve()
    }
}
