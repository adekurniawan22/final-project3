const { Category } = require('../models/');

class CategoriesController {
    static async createCategories(req, res) {
        try {
            const { type } = req.body;
            await Category.create({
                id: res.authentication.id,
                type: type,
            })

            return res.status(201).json({ message: 'OK' })
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}

module.exports = CategoriesController;