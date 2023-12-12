const router = require('express').Router();

router.get('/logs', [], async (req, res) => {
    res.json({ logs: {} });
});

module.exports = router;
