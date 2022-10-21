const { User } = require('../models');

async function authorizationUser(req, res, next) {
    try {
        const id = req.params.id;
        const authentication = res.authentication
        if (authentication.id == id) {
            next();
        } else {
            return res.status(403).json({ message: 'Forbidden' })
        }
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = authorizationUser