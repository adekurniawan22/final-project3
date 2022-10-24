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
                    console.log(res.authentication.balance, cekProduk.price)
                    if (res.authentication.balance > cekProduk.price) {
                        const newStock = cekProduk.stock - quantity;
                        const newBalance = res.authentication.balance - cekProduk.price;

                        await Product.update({ stock: newStock }, { where: { id: productId } });
                        await User.update({ balance: newBalance }, { where: { id: res.authentication.id } });
                        await Category.increment('sold_product_amount', { by: +quantity, where: { id: cekProduk.CategoryId } });

                        const data = await TransactionHistory.create({
                            ProductId: productId,
                            UserId: res.authentication.id,
                            quantity: quantity,
                            total_price: cekProduk.price * quantity,
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
}
module.exports = TransactionController;