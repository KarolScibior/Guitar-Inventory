"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const oidc_middleware_1 = require("@okta/oidc-middleware");
const express_session_1 = __importDefault(require("express-session"));
exports.register = (app) => {
    const oidc = new oidc_middleware_1.ExpressOIDC({
        client_id: process.env.OKTA_CLIENT_ID,
        client_secret: process.env.OKTA_CLIENT_SECRET,
        issuer: `${process.env.OKTA_ORG_URL}/oauth2/default`,
        redirect_uri: `${process.env.HOST_URL}/authorization-code/callback`,
        scope: 'openid profile'
    });
    app.use(express_session_1.default({
        resave: true,
        saveUninitialized: false,
        secret: process.env.SESSION_SECRET
    }));
    app.use(oidc.router);
    app.locals.oidc = oidc;
};
//# sourceMappingURL=sessionAuth.js.map