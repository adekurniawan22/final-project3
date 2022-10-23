const { User } = require('../models/');
const { comparePassword } = require('../helper/bcrypt');
const { generateToken } = require('../helper/jwt');

class UserController {
    static async register(req, res) {
        const { full_name, email, password, gender } = req.body;
        try {
            const data = await User.findAll();
            for (var key in data) {
                if (email == data[key].email) {
                    return res.status(500).json({
                        message: 'This email is already in use '
                    })
                }
            }
            const user = await User.create(
                {
                    full_name,
                    email,
                    password,
                    gender
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

    static async login(req, res) {
        const { email, password } = req.body;
        try {
            const dataLogin = await User.findOne({
                where: {
                    email: email
                }
            })

            if (dataLogin) {
                const isCorrect = comparePassword(password, dataLogin.password);
                if (isCorrect) {
                    const token = generateToken({
                        id: dataLogin.id,
                    })
                    return res.status(200).json({ token: token })
                } else {
                    return res.status(500).json({ message: 'Wrong password' })
                }
            } else {
                return res.status(500).json({ message: 'Data not found' })
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    static async editUser(req, res) {
        try {
            const authentication = res.authentication
            const { full_name, email } = req.body;

            const data = await User.findAll();
            for (var key in data) {
                if (email == data[key].email) {
                    return res.status(500).json({
                        message: 'This email is already in use '
                    })
                }
            }

            const dataUpdate = await User.update({ full_name, email }, { where: { id: authentication.id } });
            if (dataUpdate) {
                const user = await User.findOne({ where: { id: authentication.id } });
                return res.status(200).json({
                    user: {
                        id: user.dataValues.id,
                        full_name: user.dataValues.full_name,
                        email: user.dataValues.email,
                        createdAt: user.dataValues.createdAt,
                        updatedAt: user.dataValues.updatedAt
                    }
                });
            }
        } catch (error) {
            const errObj = {};
            error.errors.map(error => {
                errObj[error.path] = error.message;
            })
            return res.status(500).json(errObj);
        }
    }

    static async deleteUser(req, res) {
        try {
            const authentication = res.authentication
            const dataDelete = await User.destroy({ where: { id: authentication.id } });
            if (dataDelete) {
                return res.status(200).json({ message: 'Your account has been succesfully deleted' });
            }
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async topup(req, res) {
        try {
            const authentication = res.authentication;
            const balance = req.body.balance;
            if (balance) {
                await User.update({ balance }, { where: { id: authentication.id } });
                return res.status(200).json({ message: `Your balance has been successfully updated to Rp. ${balance}` });
            } else {
                return res.status(500).json({ message: 'Wrong request body' });
            }
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