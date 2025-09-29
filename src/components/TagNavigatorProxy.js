export class AbstractTaggerProxy {
    constructor() {
        this.cbMap = {};
        this.filters = { allfilters: {}, localfilters: {} };
    }
    activate() {
    }
    addEvent(event, cb) {
        this.cbMap[event] = cb;
    }
    deactivate() {
    }
    die() {
    }
    focusOnSubjects(subjects) {
    }
    getCurrentFilter() {
        return this.filters;
    }
    unfocus() {
    }
    unsetTags() {
    }
    clearLocalFilter() {
        this.filters.localfilters = {};
        this.filters.allfilters = {};
    }
    async setLocalFilter(f, event) {
        this.filters.localfilters = f;
        this.filters.allfilters = f;
        const cb = this.cbMap[event];
        return Promise.resolve(cb(this.filters));
    }
}
export class Tagger6WProxy extends AbstractTaggerProxy {
    addSubjects(subjects) {
    }
    setTags(subjects) {
    }
    async setLocalFilter(f) {
        return super.setLocalFilter(f, "onFilterChange");
    }
    addEvent(event, cb) {
        super.addEvent(event, cb);
    }
}
export class Tagger6WProxyWithFilteringServices extends AbstractTaggerProxy {
    addSubjectsTags(subjects) {
    }
    setSubjectsTags(subjects) {
    }
    async setLocalFilter(f) {
        return super.setLocalFilter(f, "onFilterSubjectsChange");
    }
    addEvent(event, cb) {
        super.addEvent(event, cb);
    }
}
export class TagNavigatorProxy {
    constructor() {
    }
    createProxy(options) {
        if (options.filteringMode === "WithFilteringServices")
            return new Tagger6WProxyWithFilteringServices();
        else
            return new Tagger6WProxy();
    }
}
