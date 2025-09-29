const PREFERENCE_NAME = "_widget_preference_";

export class Widget {
    constructor() {
        this.title = "";
        this.uwaUrl = "./";
        this.readOnly = false;
        this.id = "local-widget";
        this.data = {};
        this.setValue = (prefName, value) => {
            this.preferences[prefName].value = value;
            this.savePrefsLocalStorage();
        };
        this.events = {};
        this.title = "";
        this.preferences = this.loadPreferences();
    }
    loadPreferences() {
        const prefsLocalStr = localStorage.getItem(PREFERENCE_NAME);
        let prefsLocal;
        if (prefsLocalStr && prefsLocalStr !== "null") {
            try {
                prefsLocal = JSON.parse(prefsLocalStr);
            }
            catch (err) {
                localStorage.setItem(PREFERENCE_NAME, JSON.stringify({}));
            }
        }
        else {
            prefsLocal = {};
            localStorage.setItem(PREFERENCE_NAME, JSON.stringify(prefsLocal));
        }
        return prefsLocal;
    }
    savePrefsLocalStorage() {
        localStorage.setItem(PREFERENCE_NAME, JSON.stringify(this.preferences));
    }
    addEvent(event, callback, bind, priority) {
        this.events[event] = callback;
        if (event === "onLoad") {
            if (document.readyState === "loading") {
                window.addEventListener("DOMContentLoaded", callback);
            }
            else {
                callback();
            }
        }
        return this;
    }
    dispatchEvent(event, args, bind) {
        const cb = this.events[event];
        if (!cb)
            return;
        if (bind)
            cb.bind(bind, args);
        else
            cb();
        return this;
    }
    addPreference(pref) {
        pref.value = pref.defaultValue;
        this.preferences[pref.name] = pref;
        this.savePrefsLocalStorage();
    }
    getPreference(prefName) {
        return this.preferences[prefName];
    }
    getValue(prefName) {
        return this.preferences[prefName]?.value;
    }
    setTitle(title) {
        this.title = title;
        window.document.title = this.title;
    }
    getTitle() {
        return this.title;
    }
    setIcon(icon) {
        let link = document.querySelector("link[rel~='icon']");
        if (!link) {
            link = document.createElement("link");
            link.rel = "icon";
            document.getElementsByTagName("head")[0].appendChild(link);
        }
        link.href = icon;
    }
}
