/// <reference types="node" />
/// <reference types="node" />
import tls from "tls";
import url from "url";
export default class Request {
    url: url.URL;
    path: string | null;
    query: string | null;
    cert: tls.PeerCertificate | tls.DetailedPeerCertificate;
    fingerprint: string;
    params: Record<string, string>;
    baseUrl: string;
    constructor(u: url.URL, c: tls.PeerCertificate | tls.DetailedPeerCertificate);
}
