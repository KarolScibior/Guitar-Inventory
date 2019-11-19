"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_promise_1 = __importDefault(require("pg-promise"));
exports.register = (app) => {
    const oidc = app.locals.oidc;
    const port = parseInt(process.env.PGPORT || '5432', 10);
    const config = {
        database: process.env.PGDATABASE || 'postgres',
        host: process.env.PGHOST || 'localhost',
        port,
        user: process.env.PGUSER || 'postgres'
    };
    const pgp = pg_promise_1.default();
    const db = pgp(config);
    app.get(`/api/guitars/all`, oidc.ensureAuthenticated(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userId = req.userContext.userinfo.sub;
            const guitars = yield db.any(`
        SELECT id, brand, model, year, color
        FROM guitars
        WHERE user_id=$[userId]
        ORDER BY year, brand, model`, { userId });
            return res.json(guitars);
        }
        catch (err) {
            console.log(err);
            res.json({ error: err.message || err });
        }
    }));
    app.get(`/api/guitars/total`, oidc.ensureAuthenticated(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userId = req.userContext.userinfo.sub;
            const total = yield db.one(`
      SELECT count(*) AS total
      FROM guitars
      WHERE user_id = $[userId]`, { userId }, (data) => {
                return {
                    total: +data.total
                };
            });
            return res.json(total);
        }
        catch (err) {
            console.log(err);
            res.json({ error: err.message || err });
        }
    }));
    app.get(`/api/guitars/find/:search`, oidc.ensureAuthenticated(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userId = req.userContext.userinfo.sub;
            const guitars = yield db.any(`
        SELECT id, brand, model, year, color
        FROM guitars
        WHERE user_id=$[userId]
        AND (brand ILIKE $[search] OR model ILIKE $[search])`, { userId, search: `%${req.params.search}%` });
            return res.json(guitars);
        }
        catch (err) {
            console.log(err);
            res.json({ error: err.messagge || err });
        }
    }));
    app.post(`/api/guitars/add`, oidc.ensureAuthenticated(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userId = req.userContext.userinfo.sub;
            const id = yield db.one(`
        INSERT INTO guitars(user_id, brand, model, year, color)
        VALUES($[userId], $[brand], $[model], $[year], $[color])
        RETURNING id;`, Object.assign({ userId }, req.body));
            return res.json({ id });
        }
        catch (err) {
            console.log(err);
            res.json({ error: err.message || err });
        }
    }));
    app.post(`/api/guitars/update`, oidc.ensureAuthenticated(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userId = req.userContext.userinfo.sub;
            const id = yield db.one(`
        UPDATE guitars
        SET brand=$[brand],
        model=$[model],
        year=$[year],
        color=$[color]
        WHERE id=$[id]
        AND user_id=$[userId]
        RETURNING id;`, Object.assign({ userId }, req.body));
            return res.json({ id });
        }
        catch (err) {
            console.log(err);
            res.json({ error: err.message || err });
        }
    }));
    app.delete(`/api/guitars/remove/:id`, oidc.ensureAuthenticated(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userId = req.userContext.userinfo.sub;
            const id = yield db.result(`
        DELETE
        FROM guitars
        WHERE user_id=$[userId]
        AND id=$[id]`, { userId, id: req.params.id }, (r) => r.rowCount);
            return res.json({ id });
        }
        catch (err) {
            console.log(err);
            res.json({ error: err.message || err });
        }
    }));
};
//# sourceMappingURL=api.js.map