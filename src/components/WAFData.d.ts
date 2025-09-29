export declare type WAFDATARequestOptions = {
    method?: string;
    onComplete?: (result: any, responseHeaders: Record<string, string>) => void;
    onFailure?: (error: Error, result: any, responseHeaders: Record<string, string>) => void;
    onPassportError?: () => void;
    onTimeout?: (error: Error) => void;
    onProgress?: (event: ProgressEvent) => void;
    onUploadProgress?: (event: ProgressEvent) => void;
    async?: boolean;
    data?: Document | XMLHttpRequestBodyInit | null;
    type?: WAFDataResponseType | "xml";
    responseType?: WAFDataResponseType;
    headers?: Record<string, string>;
    timeout?: number;
    cache?: number;
    proxy?: "passport" | "ajax" | "feed" | "xml" | "soap";
    withCredentials?: boolean;
};
export declare type WAFDataResponseType = "text" | "json" | "arraybuffer" | "blob" | "document" | "";
export interface WAFDataRequestResult {
    cancel: () => void;
    xhr: XMLHttpRequest;
}
export declare class WAFData {
    constructor();
    private defaultRequest;
    private getHeaders;
    private handleRedirect;
    private request;
    authenticatedRequest(url: string, options?: WAFDATARequestOptions): WAFDataRequestResult;
    proxyfiedRequest(url: string, options?: WAFDATARequestOptions): WAFDataRequestResult;
}
