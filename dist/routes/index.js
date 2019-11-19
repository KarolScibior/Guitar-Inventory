"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const api = __importStar(require("./api"));
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
        res.render('guitars', { isAuthenticated: req.isAuthenticated(), user });
    });
    api.register(app);
};
//# sourceMappingURL=index.js.map