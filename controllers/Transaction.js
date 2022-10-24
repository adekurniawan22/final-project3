const { TransactionHistory } = require('../models/');
const { Product } = require('../models/');
const { User } = require('../models/');
const { Category } = require('../models/');

class TransactionController {
    static async createTransaction(req, res) {
        try {
            const { productId, quantity } = req.body;
            const cekProduk = await Product.findOne({ where: { id: productId } })
            if (cekProduk) {
                if (cekProduk.stock > 5) {
                    if (res.authentication.balance >= cekProduk.price) {
                        const newStock = cekProduk.stock - quantity;
                        const totalPrice = cekProduk.price * quantity
                        const newBalance = res.authentication.balance - totalPrice;

                        await Product.update({ stock: newStock }, { where: { id: productId } });
                        await User.update({ balance: newBalance }, { where: { id: res.authentication.id } });
                        await Category.increment('sold_product_amount', { by: +quantity, where: { id: cekProduk.CategoryId } });

                        await TransactionHistory.create({
                            ProductId: productId,
                            UserId: res.authentication.id,
                            quantity: quantity,
                            total_price: totalPrice,
                        })

                        return res.status(201).json({
                            message: 'You have succesfully purchase the product',
                            transactionBill: {
                                total_price: `Rp. ${cekProduk.price * quantity}`,
                                quantity: quantity,
                                product_name: cekProduk.title
                            },
                        })
                    } else {
                        return res.status(500).json({ message: 'Your funds are lacking, please top up first ' })
                    }
                } else {
                    return res.status(500).json({ message: 'This item is out of stock' })
                }
            } else {
                return res.status(500).json({ message: 'Product with this id not found' })
            }
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    static async getTransactionUser(req, res) {
        try {
            const data = await TransactionHistory.findAll({ attributes: { exclude: ['id'] }, where: { UserId: +res.authentication.id }, include: { model: Product, attributes: { exclude: ['createdAt', 'updatedAt'] } } });
            return res.status(200).json({
                transactionHistories: data
            })
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    static async getTransactionAll(req, res) {
        try {
            const data = await TransactionHistory.findAll({
                attributes: { exclude: ['id'] },
                include: [
                    {
                        model: Product,
                        attributes: { exclude: ['createdAt', 'updatedAt'] }
                    },
                    {
                        model: User,
                        attributes: { exclude: ['createdAt', 'updatedAt', 'full_name', 'password'] }
                    }]
            });
            return res.status(200).json({
                transactionHistories: data
            })
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    static async getTransactionById(req, res) {
        try {
            const data = res.transaction;
            return res.status(200).json(data)
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }
}
module.exports = TransactionController;