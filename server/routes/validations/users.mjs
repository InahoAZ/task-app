import Joi from "joi";


export default {
    //POST /api/users

    createUser: {
        body: {
            username: Joi.string()
                .required(),
            password: Joi.string().required(),
        },
    },

    // GET-PUT-DELETE /api/users/:userId
    getUser: {
        params: {
            userId: Joi.string()
                .regex(/^[0-9a-fA-F]{24}$/)
                .required(),
        },
    },

    // PUT /api/users/:userId
    updateTask: {
        body: {
            username: Joi.string(),
            password: Joi.string(),
        },
    },
};