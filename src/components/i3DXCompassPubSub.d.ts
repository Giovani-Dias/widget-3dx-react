export declare class PlatformAPI {
    constructor();
    publish(topic: string, data: Record<string, any>, callback: Function): void;
    subscribe(topic: string, callback: Function): void;
    unsubscribe(identifier: string): void;
}
