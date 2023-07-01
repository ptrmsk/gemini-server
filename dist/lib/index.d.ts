/// <reference types="node" />
/// <reference types="node" />
import tls from "tls";
import { middleware, titanMiddleware } from "./middleware";
import { MatchFunction } from "path-to-regexp";
import Request from "./Request.js";
import TitanRequest from "./TitanRequest";
type Route<R extends Request = Request> = {
    regexp: RegExp | null;
    match: MatchFunction<Record<string, string>>;
    handlers: middleware<R>[];
    fast_star: boolean;
    mountPath: string | null;
};
declare class Server {
    _key: string | Buffer | Array<Buffer | tls.KeyObject> | undefined;
    _cert: string | Buffer | Array<string | Buffer> | undefined;
    _stack: Route<Request>[];
    _titanStack: Route<TitanRequest>[];
    _middlewares: Route[];
    _titanEnabled: boolean;
    constructor(key: string | Buffer | Array<Buffer | tls.KeyObject>, cert: string | Buffer | Array<string | Buffer>, titanEnabled?: boolean);
    listen(port: number, callback?: (() => void)): tls.Server;
    listen(callback?: (() => void)): tls.Server;
    on(path: string, ...handlers: middleware[]): void;
    titan(path: string, ...handlers: titanMiddleware[]): void;
    use(...params: middleware[]): void;
    use(path: string, ...params: middleware[]): void;
}
type ServerOptions = {
    key: string | Buffer | Array<Buffer | tls.KeyObject>;
    cert: string | Buffer | Array<string | Buffer>;
    titanEnabled?: boolean;
};
declare function GeminiServer({ key, cert, titanEnabled }: ServerOptions): Server;
declare namespace GeminiServer {
    var redirect: typeof import("./middleware").redirect;
    var requireInput: typeof import("./middleware").requireInput;
    var requireCert: middleware<Request>;
    var serveStatic: typeof import("./middleware").serveStatic;
}
export default GeminiServer;
export { default as Request } from "./Request";
export { default as TitanRequest } from "./TitanRequest";
export { default as Response } from "./Response";
export { titanMiddleware, middleware, NextFunction } from "./middleware";
export { status } from "./status";
