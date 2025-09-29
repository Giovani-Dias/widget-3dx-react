declare type Subscription = string | unknown;
export declare class PlatformAPI {
    constructor();
    private generateUUID(): string;
    private events: [];
    publish(topic: string, data?: Record<string, any>, mode?: ("web" | "web-in-win")[]): void;
    subscribe(topic: string, callback: Function): Subscription;
    unsubscribe(identifier: Subscription | string): void;
}
