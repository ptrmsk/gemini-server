"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.Response = exports.TitanRequest = exports.Request = void 0;
var tls_1 = __importDefault(require("tls"));
var url_1 = __importDefault(require("url"));
var middleware_1 = require("./middleware");
var path_to_regexp_1 = require("path-to-regexp");
var Request_js_1 = __importDefault(require("./Request.js"));
var Response_js_1 = __importDefault(require("./Response.js"));
var TitanRequest_1 = __importDefault(require("./TitanRequest"));
var truncate_utf8_bytes_1 = __importDefault(require("truncate-utf8-bytes"));
function starMatch() {
    return {
        path: "*",
        index: 0,
        params: {}
    };
}
var Server = /** @class */ (function () {
    function Server(key, cert, titanEnabled) {
        if (titanEnabled === void 0) { titanEnabled = false; }
        this._key = key;
        this._cert = cert;
        this._stack = [];
        this._titanStack = [];
        this._middlewares = [];
        this._titanEnabled = titanEnabled;
    }
    Server.prototype.listen = function (portOrCallback, callback) {
        var _this = this;
        if (portOrCallback === void 0) { portOrCallback = 1965; }
        var port = 1965;
        if (typeof portOrCallback === "number") {
            port = portOrCallback;
        }
        else {
            callback = portOrCallback;
        }
        //try catch the handler. if error, respond with error
        var s = tls_1["default"].createServer({
            key: this._key,
            cert: this._cert,
            requestCert: true,
            rejectUnauthorized: false
        }, function (conn) {
            conn.on("error", function (err) {
                if (err && err.code === "ECONNRESET")
                    return;
                console.error(err);
            });
            var chunks = [];
            var byteCount = 0;
            var isURLReceived = false;
            var t = {
                token: null,
                size: 0,
                mime: null
            };
            var u, ulength;
            var protocol = "gemini";
            conn.on("data", function (data) { return __awaiter(_this, void 0, void 0, function () {
                // const middlewareHandlers = middlewares.flatMap(({ handlers }) =>
                //   handlers
                // );
                function handle(handlers, request) {
                    return __awaiter(this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!(handlers.length > 0)) return [3 /*break*/, 2];
                                    return [4 /*yield*/, handlers[0](request, res, function () { return handle(handlers.slice(1), request); })];
                                case 1:
                                    _a.sent();
                                    _a.label = 2;
                                case 2: return [2 /*return*/];
                            }
                        });
                    });
                }
                function handleMiddleware(m, request) {
                    return __awaiter(this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!(m.length > 0)) return [3 /*break*/, 3];
                                    request.baseUrl = m[0].mountPath || '';
                                    return [4 /*yield*/, handle(m[0].handlers, request)];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, handleMiddleware(m.slice(1), request)];
                                case 2:
                                    _a.sent();
                                    _a.label = 3;
                                case 3: return [2 /*return*/];
                            }
                        });
                    });
                }
                var getMatch, isMatch, uStr, req, titanreq, concatenatedBuffer, _i, _a, param, _b, k, v, res, middlewares, _c, _d, route, m, _e, _f, route, m;
                return __generator(this, function (_g) {
                    switch (_g.label) {
                        case 0:
                            getMatch = function (route) {
                                return route.fast_star ||
                                    route.regexp != null && route.match(u.pathname);
                            };
                            isMatch = function (route) { return getMatch(route) != false; };
                            byteCount += data.length;
                            // data is Buffer | String
                            // data can be incomplete
                            // Store data until we receive <CR><LF>
                            if (isURLReceived && byteCount < (ulength + t.size))
                                return [2 /*return*/];
                            chunks.push(data);
                            if (!data.toString("utf8").includes('\r\n'))
                                return [2 /*return*/];
                            uStr = (0, truncate_utf8_bytes_1["default"])(Buffer.concat(chunks).toString("utf-8").split(/\r\n/, 1)[0], 1024);
                            if (!u) {
                                try {
                                    u = new url_1["default"].URL(uStr.split(';')[0]);
                                }
                                catch (error) {
                                    conn.write("59 Invalid URL.\r\n");
                                    conn.destroy();
                                    return [2 /*return*/];
                                }
                                ulength = uStr.length + 2;
                                isURLReceived = true;
                                req = new Request_js_1["default"](u, conn.getPeerCertificate());
                                if (!["gemini", "gemini:", "titan", "titan:"].includes(u.protocol) || ["titan", "titan:"].includes(u.protocol) && !this._titanEnabled) {
                                    //error
                                    conn.write("59 Invalid protocol.\r\n");
                                    conn.destroy();
                                    return [2 /*return*/];
                                }
                                if (["titan", "titan:"].includes(u.protocol)) {
                                    protocol = "titan";
                                }
                                else {
                                    protocol = "gemini";
                                }
                            }
                            else {
                                return [2 /*return*/];
                            }
                            if (protocol == "titan") {
                                titanreq = new TitanRequest_1["default"](u, conn.getPeerCertificate());
                                concatenatedBuffer = Buffer.concat(chunks);
                                for (_i = 0, _a = uStr.split(';').slice(1); _i < _a.length; _i++) {
                                    param = _a[_i];
                                    _b = param.split('='), k = _b[0], v = _b[1];
                                    if (k === "token" || k === "mime") {
                                        t[k] = v;
                                    }
                                    else if (k === "size") {
                                        t[k] = parseInt(v) || 0;
                                    }
                                }
                                if (this._titanStack.some(isMatch) && (byteCount < (ulength + t.size)))
                                    return [2 /*return*/]; // Stop listening when no titan handler exists
                                // console.log(titanreq.data.toString("utf-8"))
                                if (t.size > 0)
                                    titanreq.data = Buffer.from(concatenatedBuffer.slice(concatenatedBuffer.indexOf("\r\n") + 2));
                                titanreq.uploadSize = t.size;
                                titanreq.token = t.token;
                                titanreq.mimeType = t.mime;
                                req = titanreq;
                            }
                            else {
                                req = new Request_js_1["default"](u, conn.getPeerCertificate());
                            }
                            res = new Response_js_1["default"](51, "Not Found.");
                            middlewares = this._middlewares.filter(isMatch);
                            ;
                            return [4 /*yield*/, handleMiddleware(middlewares, req)];
                        case 1:
                            _g.sent();
                            if (!(protocol === "gemini")) return [3 /*break*/, 6];
                            _c = 0, _d = this._stack;
                            _g.label = 2;
                        case 2:
                            if (!(_c < _d.length)) return [3 /*break*/, 5];
                            route = _d[_c];
                            if (!isMatch(route)) return [3 /*break*/, 4];
                            m = getMatch(route);
                            if (typeof m !== "boolean") {
                                req.params = m.params;
                            }
                            return [4 /*yield*/, handle(route.handlers, req)];
                        case 3:
                            _g.sent();
                            return [3 /*break*/, 5];
                        case 4:
                            _c++;
                            return [3 /*break*/, 2];
                        case 5: return [3 /*break*/, 10];
                        case 6:
                            _e = 0, _f = this._titanStack;
                            _g.label = 7;
                        case 7:
                            if (!(_e < _f.length)) return [3 /*break*/, 10];
                            route = _f[_e];
                            if (!isMatch(route)) return [3 /*break*/, 9];
                            m = getMatch(route);
                            if (typeof m !== "boolean") {
                                req.params = m.params;
                            }
                            return [4 /*yield*/, handle(route.handlers, req)];
                        case 8:
                            _g.sent();
                            return [3 /*break*/, 10];
                        case 9:
                            _e++;
                            return [3 /*break*/, 7];
                        case 10:
                            conn.write(res.format_header());
                            if (res.getStatus() == 20 && res._body != null) {
                                //send body
                                conn.write(res._body);
                                conn.end();
                            }
                            else {
                                conn.destroy();
                            }
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        return s.listen(port, callback);
    };
    Server.prototype.on = function (path) {
        var handlers = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            handlers[_i - 1] = arguments[_i];
        }
        this._stack.push({
            regexp: path === "*" ? null : (0, path_to_regexp_1.pathToRegexp)(path, [], {
                sensitive: true,
                strict: false,
                end: true
            }),
            match: path === "*"
                ? starMatch
                : (0, path_to_regexp_1.match)(path, { encode: encodeURI, decode: decodeURIComponent }),
            handlers: handlers,
            fast_star: path === "*",
            mountPath: path
        });
    };
    Server.prototype.titan = function (path) {
        var handlers = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            handlers[_i - 1] = arguments[_i];
        }
        this._titanEnabled = true;
        this._titanStack.push({
            regexp: path === "*" ? null : (0, path_to_regexp_1.pathToRegexp)(path, [], {
                sensitive: true,
                strict: false,
                end: true
            }),
            match: path === "*"
                ? starMatch
                : (0, path_to_regexp_1.match)(path, { encode: encodeURI, decode: decodeURIComponent }),
            handlers: handlers,
            fast_star: path === "*",
            mountPath: path
        });
    };
    Server.prototype.use = function (pathOrMiddleware) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        if (typeof pathOrMiddleware == "string") {
            this._middlewares.push({
                regexp: pathOrMiddleware !== "*"
                    ? (0, path_to_regexp_1.pathToRegexp)(pathOrMiddleware, [], {
                        sensitive: true,
                        strict: false,
                        end: false
                    })
                    : null,
                match: pathOrMiddleware === "*"
                    ? starMatch
                    : (0, path_to_regexp_1.match)(pathOrMiddleware, { encode: encodeURI, decode: decodeURIComponent, end: false }),
                handlers: params,
                fast_star: pathOrMiddleware === "*",
                mountPath: pathOrMiddleware
            });
        }
        else {
            this._middlewares.push({
                regexp: null,
                match: starMatch,
                handlers: __spreadArray([pathOrMiddleware], params, true),
                fast_star: true,
                mountPath: null
            });
        }
    };
    return Server;
}());
function GeminiServer(_a) {
    var key = _a.key, cert = _a.cert, _b = _a.titanEnabled, titanEnabled = _b === void 0 ? false : _b;
    if (!key || !cert) {
        throw new Error("Must specify key and cert");
    }
    return new Server(key, cert, titanEnabled);
}
exports["default"] = GeminiServer;
var Request_1 = require("./Request");
__createBinding(exports, Request_1, "default", "Request");
var TitanRequest_2 = require("./TitanRequest");
__createBinding(exports, TitanRequest_2, "default", "TitanRequest");
var Response_1 = require("./Response");
__createBinding(exports, Response_1, "default", "Response");
var middleware_2 = require("./middleware");
GeminiServer.redirect = middleware_2.redirect;
GeminiServer.requireInput = middleware_2.requireInput;
GeminiServer.requireCert = middleware_2.requireCert;
GeminiServer.serveStatic = middleware_1.serveStatic;
