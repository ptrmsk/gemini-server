/// <reference types="node" />
import { status } from "./status";
export default class Response {
    _status: status;
    _meta: string;
    _body: Uint8Array | string | Buffer | null;
    _setMeta(m: string): void;
    constructor(status?: status, meta?: string);
    status(s: status): Response;
    getStatus(): status;
    error(s: status | undefined, msg: string): Response;
    data(d: Uint8Array | string | Buffer, mimeType?: string): Response;
    file(filename: string): Response;
    input(prompt: string, sensitive?: boolean): Response;
    certify(info?: string): Response;
    redirect(url: string): Response;
    format_header(): string;
}
