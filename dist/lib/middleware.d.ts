import Request from "./Request";
import TitanRequest from "./TitanRequest";
import Response from "./Response";
export type NextFunction = () => void;
export type middleware<R extends Request = Request> = (req: R, res: Response, next: NextFunction) => void;
export type titanMiddleware = middleware<TitanRequest>;
export declare function redirect(url: string): middleware;
export declare function requireInput(prompt?: string): middleware;
export declare let requireCert: middleware;
type serveStaticOptions = {
    index?: boolean;
    indexExtensions?: string[];
    redirectOnDirectory?: boolean;
};
export declare function serveStatic(basePath: string, opts?: serveStaticOptions): middleware;
export {};
