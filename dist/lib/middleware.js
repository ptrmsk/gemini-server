"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.serveStatic = exports.requireCert = exports.requireInput = exports.redirect = void 0;
var fs_1 = require("fs");
var path_1 = __importDefault(require("path"));
// export type middleware = geminiMiddleware | titanMiddleware;
function redirect(url) {
    return function (req, res) {
        res.redirect(url);
    };
}
exports.redirect = redirect;
;
function requireInput(prompt) {
    if (prompt === void 0) { prompt = "Input requested"; }
    return function (req, res, next) {
        if (!req.query) {
            res.input(prompt);
        }
        else {
            next();
        }
    };
}
exports.requireInput = requireInput;
;
var requireCert = function (req, res, next) {
    if (!req.fingerprint) {
        res.certify();
    }
    else {
        next();
    }
};
exports.requireCert = requireCert;
//TODO: make async, check for malicious paths
function serveStatic(basePath, opts) {
    var options = __assign({ index: true, indexExtensions: ['.gemini', '.gmi'], redirectOnDirectory: true }, opts); // apply default options
    return function (req, res, next) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var filePath, safeSuffix, fullPath, stat, extension, i, file, ex_1, _e_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (req.path != null && !/^[a-zA-Z0-9_\.\/-]+$/.test(req.path)) {
                            res.error(59, "Forbidden characters in path");
                            return [2 /*return*/];
                        }
                        filePath = ((_a = req.path) === null || _a === void 0 ? void 0 : _a.replace(req.baseUrl, '')) || '/';
                        safeSuffix = path_1["default"].normalize(filePath).replace(/^(\.\.(\/|\\|$))+/, '');
                        fullPath = path_1["default"].join(basePath, safeSuffix);
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 10, , 11]);
                        return [4 /*yield*/, fs_1.promises.stat(fullPath)];
                    case 2:
                        stat = _c.sent();
                        if (!stat.isDirectory()) return [3 /*break*/, 9];
                        if (!((_b = req.path) === null || _b === void 0 ? void 0 : _b.endsWith('/'))) {
                            if (options.redirectOnDirectory) {
                                res.redirect(req.path + '/');
                                return [2 /*return*/];
                            }
                            else {
                                throw Error("Not a file but a directory");
                            }
                        }
                        if (!options.index) return [3 /*break*/, 9];
                        extension = -1;
                        i = 0;
                        _c.label = 3;
                    case 3:
                        if (!(i < options.indexExtensions.length)) return [3 /*break*/, 8];
                        _c.label = 4;
                    case 4:
                        _c.trys.push([4, 6, , 7]);
                        file = fullPath + 'index' + options.indexExtensions[i];
                        return [4 /*yield*/, fs_1.promises.access(file)];
                    case 5:
                        _c.sent();
                        extension = i;
                        return [3 /*break*/, 8];
                    case 6:
                        ex_1 = _c.sent();
                        return [3 /*break*/, 7];
                    case 7:
                        i++;
                        return [3 /*break*/, 3];
                    case 8:
                        if (extension !== -1) {
                            res.file(fullPath + 'index' + options.indexExtensions[extension]);
                            return [2 /*return*/];
                        }
                        _c.label = 9;
                    case 9:
                        if (stat.isFile()) {
                            res.file(fullPath);
                            return [2 /*return*/];
                        }
                        return [3 /*break*/, 11];
                    case 10:
                        _e_1 = _c.sent();
                        res.status(51);
                        next();
                        return [3 /*break*/, 11];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
}
exports.serveStatic = serveStatic;
;
