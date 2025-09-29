
import { Widget } from "./components/Widget";

const widgetDefaultStyleSheets = ["UWA/assets/css/iframe.css"];

const disableDefaultCSS = (disable = true) => {
  for (const sheet of Array.from(document.styleSheets)) {
    if (sheet.href && widgetDefaultStyleSheets.some(path => sheet.href.includes(path))) {
      sheet.disabled = disable;
    }
  }
};

const widgetStart = (cb) => {
    if (typeof widget !== 'undefined') {
        cb();
    }else{
        setTimeout(cb, 100);
    }
}

if (!window.UWA) {
  window.widget = new Widget();
}

export * from "./utils/RequirejsUtils";
export { disableDefaultCSS, widgetStart };
