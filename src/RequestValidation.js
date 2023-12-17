const { validationResult } = require('express-validator');

const validate = (req, res, next) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
        return res.json({ errors: result.array() });
    }

    next();
}

module.exports = { validate };
