const { User } = require('../models/');
class UserController {
    static async createUser(req, res) {
        const { full_name, email, password, gender } = req.body;
        try {
            const user = await User.create(
                {
                    full_name,
                    email,
                    password,
                    gender,
                    role: 2,
                    balance: 0
                }
            );
            return res.status(201).json({
                user: {
                    id: user.dataValues.id,
                    full_name: user.dataValues.full_name,
                    email: user.dataValues.email,
                    gender: user.dataValues.gender,
                    balance: `Rp. ${user.dataValues.balance}`,
                    createdAt: user.dataValues.createdAt
                }
            })
        } catch (error) {
            const errObj = {};
            error.errors.map(error => {
                errObj[error.path] = error.message;
            })
            return res.status(500).json(errObj);
        }
    }
}

module.exports = UserController;