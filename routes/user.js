const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const userServices = require("../services/userServices");

router.post('/register', async function (req, res) {


    try {
        const newUserId = await userServices.createUser(req.body);
        res.json({
            message: `New user with userId:${newUserId} has been created`
        })
    } catch (e) {
        console.error(e);
        res.status(500);
    }

})

router.post('/login', async function (req, res) {
    const user = await userServices.login(req.body.email, req.body.password);

    const token = jwt.sign({
        userId: user ? user.id : null
    }, process.env.JWT_SECRET, { expiresIn: '7d' })

    res.json({
        token
    })
})

router.get('/me', function (req, res) {
    res.json({
        'message': 'Getting the profile of the current logged in user'
    })
})

module.exports = router;