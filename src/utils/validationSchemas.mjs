export const createUserValidationSchema = {
    username: {
        notEmpty: {
            errorMessage: "Must not be empty",
        },
        isLength: {
            options: {
                min: 5,
                max: 32,
            },
            errorMessage: "Length must be between 5 and 32",
        },
        isString: {
            errorMessage: "Must be a string",
        },
    },
    displayName: {
        notEmpty: {
            errorMessage: "Must not be empty",
        },
    },
    password: {
        notEmpty: {
            errorMessage: "Must not be empty",
        },
        isLength: {
            options: {
                min: 5,
                max: 32,
            },
            errorMessage: "Length must be between 5 and 32",
        },
    },
};

export const queryParamsValidationSchema = {
    filter: {
        notEmpty: {
            errorMessage: "Must not be empty",
        },
        isString: {
            errorMessage: "Must be a string",
        },
        isLength: {
            options: {
                min: 3,
                max: 10,
            },
            errorMessage: "Length must be between 5 and 32",
        },
    },
    value: {
        notEmpty: {
            errorMessage: "Must not be empty",
        },
        isString: {
            errorMessage: "Must be a string",
        },
        isLength: {
            options: {
                min: 1,
                max: 15,
            },
            errorMessage: "Length must be between 5 and 32",
        },
    },
};
