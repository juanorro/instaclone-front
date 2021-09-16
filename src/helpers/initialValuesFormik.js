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

const initialValuesChangePassword = () => {
    return {
        currentPassword: '',
        newPassword: '',
        repeatNewPassword: '',
    }
};

const initialValuesChangeEmail = (currentEmail) => {
    return {
        email: currentEmail,
    }
};

const initialValuesChangeDescription = (currentDescription) => {
    return {
        description: currentDescription,
    }
};

const initialValuesChangeSiteWeb = (currentSiteWeb) => {
    return {
        siteWeb: currentSiteWeb,
    }
};

export {
    initialValuesRegister,
    initialValuesLogin,
    initialValuesChangePassword,
    initialValuesChangeEmail,
    initialValuesChangeDescription,
    initialValuesChangeSiteWeb
}