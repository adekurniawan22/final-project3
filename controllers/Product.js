const { Product } = require('../models/');
const { Category } = require('../models/');

class ProductController {
    static async getAllProduct(req, res) {
        try {
            const dataProduct = await Product.findAll();
            return res.status(200).json({ products: dataProduct })
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    static async createProduct(req, res) {
        try {
            const { title, price, stock, CategoryId } = req.body;

            const dataCategory = await Category.findOne({ where: { id: CategoryId } })
            if (dataCategory) {
                const newProduct = await Product.create({
                    title, price, stock, CategoryId
                })
                return res.status(201).json({ Product: newProduct.dataValues })
            } else {
                return res.status(201).json({ message: 'Categories id not found' })
            }

        } catch (error) {
            // const errObj = {};
            // error.errors.map(error => {
            //     errObj[error.path] = error.message;
            // })
            // return res.status(500).json(errObj);
            console.log(error)
        }
    }
}

module.exports = ProductController