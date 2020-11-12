const {
    response
} = require('express');
const User = require('../models/User');

module.exports = {
    register: (req, res, next) => {
        let {
            name,
            email,
            username,
            password,
        } = req.body;
        const validateName = /^[A-Za-z]+([\ A-Za-z]+)*/;
        const validateEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        let responseToClient;
        let isError = false;


        if (!email || !username || !password || !name) {
            responseToClient = {
                message: 'Hãy điền đầy đủ thông tin'
            }
            isError = true;
        } else if (!validateName.test(username) || !validateEmail.test(email)) {
            responseToClient = {
                message: 'Tên hoặc email không hợp lệ'
            }
            isError = true;
        }

        if (isError) {
            responseToClient = JSON.stringify(responseToClient);
            res.status(400).json(responseToClient);
        } else {
            next();
        }
    },
    login: async (req, res, next) => {
        const {
            email,
            password
        } = req.body;

        if (!email || !password) {
            let responseToClient = {
                message: 'Hãy điền đầy đủ thông tin'
            }
            res.status(400).json(responseToClient)
        } else {
            next();
        }
    },
    checkExist: async (req, res, next) => {
        let {
            username,
            email
        } = req.body;

        const existEmail = await User.findOne({
            email
        })

        if (existEmail) {
            res.status(400).json({
                message: "Đã tồn tại email. Hãy chọn email khác"
            })
        } else {
            const existUsername = await User.findOne({
                username
            });

            if (existUsername) {
                res.status(400).json({
                    message: "Đã tồn tại username. Hãy chọn username khác"
                });
            } else {
                next();
            }
        }
    }
}