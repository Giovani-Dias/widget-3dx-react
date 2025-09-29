import { Widget } from "./components/Widget";

declare global {
    var widget: Widget;
}

export declare function widgetStart(callback: () => void): void;

export * from "./utils/RequirejsUtils";
/**
 * Enables or disables default widget styles.
 *
 * @param disable - Whether to disable the styles (default: true).
 */
export declare function disableDefaultCSS(disable?: boolean): void;
