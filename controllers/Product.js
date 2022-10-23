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
            const errObj = {};
            error.errors.map(error => {
                errObj[error.path] = error.message;
            })
            return res.status(500).json(errObj);
        }
    }

    static async editProduct(req, res) {
        try {
            const productId = req.params.productId;
            const { title, price, stock } = req.body;

            const dataUpdate = await Product.update({ title, price, stock }, { where: { id: productId } });
            if (dataUpdate) {
                const product = await Product.findOne({ where: { id: productId } });
                if (product) {
                    return res.status(200).json({ product });
                } else {
                    return res.status(500).json({ message: 'This product id not found' })
                }
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    static async editCategoryId(req, res) {
        try {
            const productId = req.params.productId;
            const CategoryId = req.body.CategoryId;
            const cekCategoryId = await Category.findOne({ where: { id: CategoryId } });

            if (!cekCategoryId) {
                return res.status(500).json({ message: 'This category id not found' })
            }
            const dataUpdate = await Product.update({ CategoryId }, { where: { id: productId } });

            if (dataUpdate) {
                console.log(dataUpdate);
                const product = await Product.findOne({ where: { id: productId } });
                if (product) {
                    return res.status(200).json({ product });
                } else {
                    return res.status(500).json({ message: 'This product id not found' })
                }
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    static async deleteProduct(req, res) {
        try {
            const productId = req.params.productId;
            const dataDelete = await Product.destroy({ where: { id: productId } });
            if (dataDelete) {
                return res.status(200).json({ message: 'Product has been succesfully deleted' })
            } else {
                return res.status(200).json({ message: 'This product id not found' })
            }
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}

module.exports = ProductController