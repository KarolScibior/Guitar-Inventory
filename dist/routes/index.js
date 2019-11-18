"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = (app) => {
    const oidc = app.locals.oidc;
    app.get('/', (req, res) => {
        const user = req.userContext ? req.userContext.userinfo : null;
        res.render('index', { isAuthenticated: req.isAuthenticated(), user });
    });
    app.get('/login', oidc.ensureAuthenticated(), (req, res) => {
        res.redirect('/guitars');
    });
    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });
    app.get('/guitars', oidc.ensureAuthenticated(), (req, res) => {
        const user = req.userContext ? req.userContext.userinfo : null;
        res.render('guitars');
    });
};
//# sourceMappingURL=index.js.map