const express = require('express');
const router = express.Router();


app.post('/login', (req, res) => {
    var username = req.body.user
    var password = req.body.password

    if (!(username === 'oscar' && password === '1234')) {
        res.status(401).send({
            error: 'usuario o contraseña inválidos'
        })
        return
    }

    var tokenData = {
        username: username
        // ANY DATA
    }

    var token = jwt.sign(tokenData, 'Secret Password', {
        expiresIn: 60 * 60 * 24 // expires in 24 hours
    })

    res.send({
        token
    })
})

module.exports = router;