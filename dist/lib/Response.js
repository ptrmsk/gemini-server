"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var truncate_utf8_bytes_1 = __importDefault(require("truncate-utf8-bytes"));
var mime_1 = __importDefault(require("mime"));
var fs_1 = __importDefault(require("fs"));
mime_1["default"].define({ "text/gemini": ["gemini", "gmi"] });
var Response = /** @class */ (function () {
    function Response(status, meta) {
        if (status === void 0) { status = 20; }
        if (meta === void 0) { meta = ""; }
        this._status = 20;
        this._meta = "";
        this._body = null;
        this._status = status;
        this._setMeta(meta);
    }
    Response.prototype._setMeta = function (m) {
        this._meta = (0, truncate_utf8_bytes_1["default"])(m, 1024);
    };
    Response.prototype.status = function (s) {
        this._status = s;
        return this;
    };
    Response.prototype.getStatus = function () {
        return this._status;
    };
    Response.prototype.error = function (s, msg) {
        if (s === void 0) { s = 40; }
        this.status(s);
        this._setMeta(msg);
        return this;
    };
    Response.prototype.data = function (d, mimeType) {
        if (mimeType === void 0) { mimeType = "text/plain"; }
        this.status(20);
        this._body = d;
        this._setMeta(mimeType);
        return this;
    };
    //for success, The <META> line is a MIME media type which applies to the response body.
    //for redirect, <META> is a new URL for the requested resource. The URL may be absolute or relative.
    //for 4* and 5*, The contents of <META> may provide additional information on the failure, and should be displayed to human users.
    Response.prototype.file = function (filename) {
        var mimetype = mime_1["default"].getType(filename);
        if (mimetype == null) {
            console.error("mime type of file", filename, "not found");
            return this;
        }
        else {
            this._body = fs_1["default"].readFileSync(filename);
            this.status(20);
            this._setMeta(mimetype);
            return this;
        }
    };
    Response.prototype.input = function (prompt, sensitive) {
        if (sensitive === void 0) { sensitive = false; }
        this.status(sensitive ? 11 : 10);
        this._setMeta(prompt);
        return this;
    };
    Response.prototype.certify = function (info) {
        if (info === void 0) { info = "Please include a certificate."; }
        this._setMeta(info);
        this.status(60);
        return this;
    };
    Response.prototype.redirect = function (url) {
        this.status(30);
        this._setMeta(url);
        return this;
    };
    Response.prototype.format_header = function () {
        return "".concat(this._status, " ").concat(this._meta, "\r\n");
    };
    return Response;
}());
exports["default"] = Response;
