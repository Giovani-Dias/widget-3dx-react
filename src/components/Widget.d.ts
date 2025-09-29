export declare type Preference = {
    name: string;
    type: "boolean" | "hidden" | "text" | "list" | "range";
    label: string;
    defaultValue?: string;
    onchange?: string;
    step?: number;
    min?: number;
    max?: number;
    options?: {
        label: string;
        value: string;
    }[];
    value?: string;
};
export interface WidgetEvent {
    endEdit: () => void;
    onKeyboardAction: (key: string) => void;
    onLoad: () => void;
    onRefresh: () => void;
    onResize: () => void;
    onViewChange: (event: {
        type: string;
    }) => void;
    onSearch: (searchString: string) => void;
    onResetSearch: () => void;
}
export declare const STANDALONE_WIDGET_ID = "standalone";
export declare class Widget {
    private events;
    title: string;
    readonly uwaUrl = "./";
    readonly readOnly = false;
    uwaPath: string;
    readonly id: string;
    data: unknown;
    private preferences;
    private static PREFERENCE_NAME;
    constructor();
    private loadPreferences;
    private savePrefsLocalStorage;
    addEvent<T extends keyof WidgetEvent>(event: T, callback: WidgetEvent[T], bind?: unknown, priority?: number): this;
    dispatchEvent(event: keyof WidgetEvent, args?: unknown[], bind?: unknown): this | undefined;
    addPreference(pref: Preference): void;
    getPreference(prefName: string): Preference;
    getValue(prefName: string): string | undefined;
    setValue: (prefName: string, value: string) => void;
    setTitle(title: string): void;
    getTitle(): string;
    setIcon(icon: string): void;
}
