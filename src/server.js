const router = require('express').Router();
const currencyRouter = require('./routers/CurrencyRouter');
const LogRouter = require('./routers/LogRouter');

router.use(currencyRouter);
router.use(LogRouter);

router.use((req, res, next) => {
    res.status(404).json('Route not found');
});

router.use((err, req, res, next) => {
    console.error(err);
    res.status(err.statusCode || 500).json({ message: err.message });
});

module.exports = router;
