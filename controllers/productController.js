const {Product} = require('../models')

const createProduct = async (req, res, next) => {
    try {
        // console.log('masuk product')
        const {productName, price, quantity, description, userId} = req.body
        const response = await Product.create({
            productName,
            price,
            quantity,
            description,
            userId
        })
        res.status(201).json({
            productName: response.productName,
            price: response.price,
            quantity: response.quantity,
            description: response.description,
            userId: response.userId
        })
    } catch (error) {
        // console.log(error, "ERROR")
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

const getProduct = async (res) => {
    try {
        const getAllProducts = await Product.findAll()
        res.status(200).json({
            code: 200,
            status: 'succes',
            message: 'Succes get all products',
            data: getAllProducts,
        });
    } catch (error) {
        if (
            error.name === 'SequelizeValidationError' ||
            error.name === 'SequelizeUniqueConstraintError'
        ) {
            (errorCode = 400), (msg = error.errors.map((el) => el.message));
        }
    }
}

const getOneProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const getOne = await Product.findByPk(id)
        // console.log(getOne, '!!!!!!!!');
        res.status(200).json({
            code: 200,
            status: 'succes',
            message: 'Succes get one products',
            data: getOne,
        });
    } catch (error) {
        console.log(error);
        if (
            error.name === 'SequelizeValidationError' ||
            error.name === 'SequelizeUniqueConstraintError'
        ) {
            (errorCode = 400), (msg = error.errors.map((el) => el.message));
        }
    }
}

const updateProduct = async (req, res) => {
    try {
        const {productName, price, quantity, description} = req.body
        const id = req.params.id;
        const getOne = await Product.findByPk(id)
        if (getOne) {
            const update = await Product.update( {
                productName,
                price,
                quantity,
                description,
            },
            {where: {id}, returning: true}
            );
            res.status(200).json({
                code: 200,
                status: 'succes',
                message: 'Succes update product',
                data: update,
            });
        } else {
            throw {name: 'id not found'}
        }
        // console.log(getOne, '!!!!!!!!');
    } catch (error) {
        // console.log(error, 'ERROR');
        if (
            error.name === 'SequelizeValidationError' ||
            error.name === 'SequelizeUniqueConstraintError'
        ) {
            (errorCode = 400), (msg = error.errors.map((el) => el.message));
        }else if (error.name === 'id not found') {
            res.status(400).json({
                code: 400,
                status: 'failed',
                message: 'id not found',
                data: []
                });
            }
    }
}

const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const delProduct = await Product.destroy({
            where: {id}
        })
        if (delProduct) {
            res.status(200).json({
                code: 200,
                status: 'success',
                message: 'Success Delete Product',
                data: [],
            });
        } else {
            throw {name: 'id not found'}
        }
    } catch (error) {
        if (
            error.name === 'SequelizeValidationError' ||
            error.name === 'SequelizeUniqueConstraintError'
        ) {
            (errorCode = 400), (msg = error.errors.map((el) => el.message));
        } else if (error.name === 'id not found') {
            res.status(400).json({
                code: 400,
                status: 'failed',
                message: 'id not found',
                data: []
                });
            }
    }
}

module.exports = {createProduct, getProduct, getOneProduct, updateProduct, deleteProduct}