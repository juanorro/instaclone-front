const initialValuesRegister = () => {
    return {
        name: '',
        username: '',
        email: '',
        password: '',
        checkPassword: '',
    }
}

const initialValuesLogin = () => {
    return {
        email: '',
        password: ''
    }
}

export {
    initialValuesRegister,
    initialValuesLogin
}