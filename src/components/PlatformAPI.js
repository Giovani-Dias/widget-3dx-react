export class PlatformAPI {
    constructor() {
        this.events = [];
    }
    generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    publish(topic, data, mode) {
        const event = new CustomEvent(topic, { detail: data });
        window.dispatchEvent(event);
    }
    subscribe(topic, callback) {
        const identifier = this.generateUUID();
        const newCallback = (e) => {
            callback(e.detail);
        }
        this.events.push({ topic, identifier, newCallback });
        window.addEventListener(topic, newCallback)
        return identifier;
    }
    unsubscribe(identifier) {
        const regex = /[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        //test if identifier is a UUID 
        if (regex.test(identifier)) {
            const eventCallback = this.events.find((e) => e.identifier === identifier);
            if (eventCallback !== undefined) {
                {
                    window.removeEventListener(eventCallback.topic, eventCallback.newCallback);
                    this.events = this.events.filter((e) => e.identifier !== eventCallback.identifier);
                }
            } else {
                const eventCallbacks = this.events.filter((e) => e.topic === identifier);
                for (const eventCallback of eventCallbacks) {
                    window.removeEventListener(eventCallback.topic, eventCallback.newCallback);
                    this.events = this.events.filter((e) => e.identifier !== eventCallback.identifier);
                }
            }
        }
    }
}
