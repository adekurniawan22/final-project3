const { Category } = require('../models/');

class CategoriesController {
    static async createCategories(req, res) {
        try {
            const { type } = req.body;
            const dataCategories = await Category.create({
                type: type,
            })
            return res.status(201).json({ category: dataCategories })
        } catch (error) {
            return res.status(500).json(error)
        }
    }

    static async getCategories(req, res) {
        try {
            const dataCategories = await Category.findAll({ include: 'Product' });
            return res.status(200).json({
                categories: dataCategories
            })
        } catch (error) {
            return res.status(500).json(error)
        }
    }

    static async editCategories(req, res) {
        try {
            const categoryId = req.params.categoryId;
            const type = req.body.type;

            const dataUpdate = await Category.update({ type }, { where: { id: categoryId } });
            if (dataUpdate) {
                const category = await Category.findOne({ where: { id: categoryId } });
                if (category) {
                    return res.status(200).json({ category });
                } else {
                    return res.status(404).json({ message: 'This category id not found' })
                }
            }
        } catch (error) {
            return res.status(500).json(error)
        }
    }

    static async deleteCategories(req, res) {
        try {
            const categoryId = req.params.categoryId;
            const dataDelete = await Category.destroy({ where: { id: categoryId } });

            if (dataDelete) {
                return res.status(200).json({ message: 'Category has been succesfully deleted' })
            } else {
                return res.status(404).json({ message: 'This category id not found' })
            }
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}

module.exports = CategoriesController;