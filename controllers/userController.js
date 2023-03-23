const {User} = require('../models')
const bcrypt = require('bcrypt')
const {generateJWT} = require('../helpers/jwt')


const register = async (req, res, next) => {
    try {
        console.log('masuk ga ya')
        const {name, email, password, age, gender, address} = req.body
        const response = await User.create({
            name,
            email,
            password,
            age,
            gender,
            address,
        })
        res.status(201).json({
            name: response.name,
            email: response.email,
            age: response.age,
            gender: response.gender,
            address: response.address
        })
        
    } catch (error) {
        console.log(error, "<<< ini error")
        if (
            error.name === 'SequelizeValidationError' ||
            error.name === 'SequelizeUniqueConstraintError'
        ) {
            error.errors.forEach((el) => {
                errMsgs = el.message
            });
            res.status(400).json({
                code: 400,
                status: "failed",
                message: errMsgs,
                data: [],
            });
        }
    }
}

const login = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) {
        throw {name: 'Bad Request'}
        }

        const response = await User.findOne({ where: { email } });
        if(!response) {
            throw {name: 'Unauthorized'};
        }

        const isValid = bcrypt.compareSync(password, response.password);
        if (!isValid) {
            throw {name: 'Unauthorized'};
        }
        const payload = {
            id: response.id,
            name: response.name,
            email: response.email,
        }

        const data = {
            id: response.id,
            name: response.name,
            email: response.email,
            access_token: generateJWT(payload)
        }


        res.status(200).json({
            code: 200,
            status: 'succes',
            message: 'Succes Login',
            data,
        });
    } catch (error) {
        console.log(error, "ERROR")
        if (
            error.name === 'SequelizeValidationError' ||
            error.name === 'SequelizeUniqueConstraintError'
        ) {
            (errorCode = 400), (msg = error.errors.map((el) => el.message));
        } else if (error.name === 'Bad Request') {
        res.status(400).json({
            code: 400,
            status: 'failed',
            message: 'Email and Password cannot be blank',
            data: []
            });
        } else if (error.name === 'Unauthorized') {
            res.status(400).json({
            code: 400,
            status: 'failed',
            message: 'wrong email or password',
            data: []
            })
        }
    }
}


module.exports = {register, login}