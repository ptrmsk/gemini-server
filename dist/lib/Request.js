"use strict";
exports.__esModule = true;
var Request = /** @class */ (function () {
    function Request(u, c) {
        var _a;
        this.url = u;
        this.path = u.pathname;
        this.query = ((_a = u.search) === null || _a === void 0 ? void 0 : _a.slice(1)) || null;
        this.cert = c;
        this.fingerprint = c.fingerprint;
        this.params = {};
        this.baseUrl = '';
    }
    return Request;
}());
exports["default"] = Request;
