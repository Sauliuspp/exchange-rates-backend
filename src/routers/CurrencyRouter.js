const router = require('express').Router();

router.get('/exchange-rates', [], async (req, res) => {
    res.json({ rates: {} });
});

module.exports = router;
