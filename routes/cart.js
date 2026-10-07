const express = require('express');
const AuthenticateWithJWT = require('../middlewares/AuthenticateWithJWT');
const router = express.Router();

const cartServices = require('../services/cartServices');


router.get('/', [AuthenticateWithJWT], async function (req, res) {
    const cartContents = await cartServices.getCart(req.userId);
    res.json(cartContents);
})


router.put('/', [AuthenticateWithJWT], async function (req, res) {
    try {
        await cartServices.updateCart(req.userId, req.body.cart_items)
        res.json({
            message: "Updated the user's shopping cart"
        })

    } catch (e) {
        console.error(e);
        res.status(500).json({
            'message':'Unable to update the shopping cart'
        })
    }

})
module.exports = router;