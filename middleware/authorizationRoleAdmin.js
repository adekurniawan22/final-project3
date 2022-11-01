
async function authorizationRoleAdmin(req, res, next) {
    try {
        const authentication = res.authentication
        if (authentication.role == 0) {
            next();
        } else {
            return res.status(403).json({ message: 'Forbidden' })
        }
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = authorizationRoleAdmin