
async function authorizationProduct(req, res, next) {
    try {
        const authentication = res.authentication
        if (authentication.role == 1) {
            next();
        } else {
            return res.status(403).json({ message: 'Forbidden' })
        }
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = authorizationProduct