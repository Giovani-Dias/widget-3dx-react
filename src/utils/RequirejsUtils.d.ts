import { TagNavigatorProxy } from "../components/TagNavigatorProxy";
import { WAFData } from "../components/WAFData";
import { PlatformAPI } from "../components/PlatformAPI";
import { i3DXCompassServices } from "../components/i3DXCompassServices";

type ModulesMap = {
    "DS/WAFData/WAFData": WAFData;
    "DS/PlatformAPI/PlatformAPI": PlatformAPI;
    "DS/i3DXCompassServices/i3DXCompassServices": i3DXCompassServices;
    "DS/TagNavigatorProxy/TagNavigatorProxy": TagNavigatorProxy;
};

/**
 * Dynamically loads one or more 3DEXPERIENCE modules with full type safety.
 *
 * The `require3Dx` function accepts a tuple of module identifiers
 * and returns a Promise that resolves to a tuple of the corresponding module instances,
 * preserving both the order and the types of the requested modules.
 *
 * @param modules - An array of module identifiers to load.
 * @returns A Promise that resolves to an array of module instances, typed according to the input.
 *
 * @example
 * const [WAFData, PlatformAPI] = await require3Dx([
 *   "DS/WAFData/WAFData",
 *   "DS/PlatformAPI/PlatformAPI"
 * ]);
 *
 * @example
 * require3Dx([
 *   "DS/WAFData/WAFData",
 *   "DS/PlatformAPI/PlatformAPI"
 * ]).then(([WAFData, PlatformAPI]) => {
 *   // Use the modules with correct types
 * });
 *
 */
export declare function require3Dx<M extends readonly (keyof ModulesMap)[]>(
    modules: [...M]
): Promise<{ -readonly [K in keyof M]: ModulesMap[M[K]] }>;
