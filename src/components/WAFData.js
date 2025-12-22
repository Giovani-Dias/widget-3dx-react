export class WAFData {
    constructor() {
        this.defaultRequest = {
            method: "GET",
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
            },
            data: null,
            async: true,
            type: "",
            timeout: 25000,
            responseType: "text",
            cache: -1,
            proxy: "ajax",
            withCredentials: true,
            onComplete: () => {
            },
            onFailure: (error, result, headers) => {
                throw error;
            },
            onPassportError: () => {
                throw new Error("Passport error...");
            },
            onTimeout: error => {
                throw error;
            },
            onProgress: () => {
            },
            onUploadProgress: () => {
            }
        };
    }
    getHeaders(xhr) {
        const headers = {};
        const arr = xhr
            .getAllResponseHeaders()
            .trim()
            .split(/[\r\n]+/);
        arr.forEach(line => {
            const parts = line.split(": ");
            const header = parts.shift();
            const value = parts.join(": ");
            if (header)
                headers[header] = value;
        });
        return headers;
    }
    handleRedirect(xhr, allOptions) {
        const { onFailure, onPassportError, onTimeout } = allOptions;
        const redirRes = this.request(xhr.response.x3ds_auth_url, {
            onFailure: () => {
                const response = JSON.parse(redirRes.xhr.response);
                console.error(response.error_description);
                onFailure(new Error(response.error_description), redirRes.xhr.response, this.getHeaders(redirRes.xhr));
            },
            onPassportError,
            onTimeout,
            headers: {
                Accept: "application/json"
            },
            withCredentials: true,
            onComplete: resp => {
                const redirUrlWithServiceTicket = JSON.parse(resp)?.x3ds_service_redirect_url;
                if (redirUrlWithServiceTicket)
                    this.request(redirUrlWithServiceTicket, allOptions);
            }
        });
    }
    request(url, options) {
        const allOptions = {
            ...this.defaultRequest,
            ...options
        };
        const { method, headers, async, timeout, data, type, responseType, withCredentials, onComplete, onFailure, onProgress, onUploadProgress, onTimeout } = allOptions;
        const urlObj = new URL(url);
        if (!urlObj.searchParams.get("xrequestedwith")) {
            urlObj.searchParams.set("xrequestedwith", "xmlhttprequest");
            headers["X-Requested-With"] = "XMLHttpRequest";
        }
        const xhr = new XMLHttpRequest();
        xhr.addEventListener("load", () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                onComplete?.(type === "xml" ? xhr.responseXML : xhr.response, this.getHeaders(xhr));
            }
            else {
                if ((xhr.status === 400 || xhr.status === 401) && xhr.response.x3ds_auth_url) {
                    this.handleRedirect(xhr, allOptions);
                }
                else {
                    onFailure?.(new Error(`URL "${url}" return ResponseCode with value "${xhr.status}"`), xhr.response, this.getHeaders(xhr));
                }
            }
        });
        xhr.addEventListener("progress", event => onProgress?.(event));
        xhr.upload.addEventListener("progress", event => onUploadProgress?.(event));
        xhr.addEventListener("error", _error => {
            const err = `XHR error, please check that\n\t1- CORS is disabled in your browser (use CORS Unblock Chrome/Firefox extension),\n\t2- You are connected to the platform. Try opening ${urlObj.toString()} in another browser tab.`;
            onFailure?.(new Error(err), xhr.response, this.getHeaders(xhr));
        });
        xhr.addEventListener("timeout", _event => {
            onTimeout?.(new Error(`The request has timedout after ${timeout}ms`));
        });
        xhr.open(method, urlObj.toString(), async);
        for (const key in headers) {
            xhr.setRequestHeader(key, headers[key]);
        }
        xhr.withCredentials = withCredentials;
        xhr.timeout = timeout;
        xhr.responseType = responseType;
        if (type !== "" && type !== "xml")
            xhr.responseType = type;
        switch (type) {
            case "xml":
                xhr.responseType = "document";
                xhr.setRequestHeader("Accept", "application/xml,text/javascript,*/*");
                break;
            case "json":
                xhr.setRequestHeader("Accept", "application/json,text/javascript,*/*");
                break;
            case "text":
                xhr.setRequestHeader("Accept", "text/plain,application/json");
                break;
            default:
                break;
        }
        xhr.send(data);
        return {
            cancel: () => {
                xhr.abort();
            },
            xhr
        };
    }
    authenticatedRequest(url, options) {
        return this.request(url, options);
    }
    proxifiedRequest(url, options) {
        console.warn("proxifiedRequest not implemented in standalone context. Trying to fetch without proxification.");
        return this.request(url, options);
    }
}
