const { TransactionHistory } = require('../models/');
const { Product } = require('../models/');

async function authorizationTransaction(req, res, next) {
    try {
        const transactionId = req.params.transactionId;
        const transaction = await TransactionHistory.findOne({
            attributes: { exclude: ['id'] },
            where: { id: +transactionId },
            include:
            {
                model: Product,
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            }
        });

        if (transaction) {
            if (transaction.UserId == res.authentication.id || res.authentication.role == 1) {
                res.transaction = transaction;
                next()
            } else {
                return res.status(403).json({ message: 'Forbidden' })
            }
        } else {
            return res.status(404).json({ message: 'Data not found' })
        }
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = authorizationTransaction