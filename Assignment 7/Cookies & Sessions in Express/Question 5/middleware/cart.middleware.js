const cartMiddleware = (req, res, next) => {

    if (req.session.user) {
        if (!req.session.cart) {
            req.session.cart = [];
        }
        req.cart = req.session.cart;
    } 
    else {
        let cart = [];

        try {
            cart = req.cookies.cart ? JSON.parse(req.cookies.cart) : [];
        } catch (err) {
            cart = [];
        }

        req.cart = cart;
    }

    next();
};

module.exports = cartMiddleware;