import { TagNavigatorProxy } from "../components/TagNavigatorProxy";
import { WAFData } from "../components/WAFData";
import { PlatformAPI } from "../components/PlatformAPI";
import { i3DXCompassServices } from "../components/i3DXCompassServices";

const LocalModules = {
  "DS/WAFData/WAFData": new WAFData(),
  "DS/PlatformAPI/PlatformAPI": new PlatformAPI(),
  "DS/i3DXCompassServices/i3DXCompassServices": new i3DXCompassServices(),
  "DS/TagNavigatorProxy/TagNavigatorProxy": new TagNavigatorProxy(),
};

export function require3Dx(modules) {
  return new Promise((resolve, reject) => {
    if (window.requirejs === undefined) {
      try {
        const loadedModules = modules.map((name) => {
          const module = LocalModules[name];
          if (!module) {
            throw new Error(`Module "${name}" not found.`);
          }
          return module;
        });
        resolve(loadedModules);
      } catch (error) {
        reject(error);
      }

    } else {
      window.requirejs(modules, (...m) => resolve(m), reject);
    }
  });
}
