declare type Subscription = string | unknown;
export declare class PlatformAPI {
    constructor();
    private generateUUID(): string;
    private events: [];
    getUser(): {
        address: string;
        city: string;
        email: string;
        enabled: boolean;
        firstname: string;
        id: number;
        language: string;
        lastName: string;
        login: string;
        superUser: boolean;
        telephone: string;
        type: number;
        properties: {};
    };
    publish(topic: string, data?: Record<string, any>, mode?: ("web" | "web-in-win")[]): void;
    subscribe(topic: string, callback: Function): Subscription;
    unsubscribe(identifier: Subscription | string): void;
}
