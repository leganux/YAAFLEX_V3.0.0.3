
const express = require('express');
const router = express.Router();

router.get("/.well-known/acme-challenge/H2baTftkKS2Cmdw1-0R1UnEpo426qTy7Z5SPFQiuduA", (req, res) => {
    res.status(200).send('H2baTftkKS2Cmdw1-0R1UnEpo426qTy7Z5SPFQiuduA.OJgLx97fYNL9mkMhXNPFB4yg6ejag6y_K3rxKxDT_Gw');
});

module.exports = router;