/// <reference types="node" />
/// <reference types="node" />
/// <reference types="node" />
import Request from "./Request";
import tls from "tls";
import url from "url";
export default class TitanRequest extends Request {
    data: Buffer | null;
    uploadSize: number;
    token: string | null;
    mimeType: string | null;
    constructor(u: url.URL, c: tls.PeerCertificate | tls.DetailedPeerCertificate);
}
