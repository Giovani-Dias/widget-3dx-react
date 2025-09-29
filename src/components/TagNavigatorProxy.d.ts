export declare type TaggerSubject = {
    sixw: string;
    object: string;
    dispValue?: string;
    type?: "integer" | "string" | "date";
};
export declare type TaggerSubjects = Record<string, TaggerSubject[]>;
export declare type FilterDefinition = {
    allfilters: Record<string, FilteredTag>;
    localfilters: Record<string, FilteredTag>;
    filteredSubjectList?: string[];
};
export declare type FilteredTag = {
    object: string;
    disptext: string;
    type: "integer" | "string" | "date";
    field?: unknown[];
};
export declare abstract class AbstractTaggerProxy {
    protected cbMap: Record<string, (filter: FilterDefinition, bind?: unknown) => void>;
    protected filters: FilterDefinition;
    constructor();
    activate(): void;
    protected addEvent(event: "onFilterChange" | "onFilterSubjectsChange", cb: (filter: FilterDefinition, bind?: unknown) => void): void;
    deactivate(): void;
    die(): void;
    focusOnSubjects(subjects: string[]): void;
    getCurrentFilter(): FilterDefinition;
    unfocus(): void;
    unsetTags(): void;
    clearLocalFilter(): void;
    protected setLocalFilter(f: Record<string, FilteredTag>, event: string): Promise<void>;
}
export declare class Tagger6WProxy extends AbstractTaggerProxy {
    addSubjects(subjects: TaggerSubjects): void;
    setTags(subjects: TaggerSubjects): void;
    setLocalFilter(f: Record<string, FilteredTag>): Promise<void>;
    addEvent(event: "onFilterChange", cb: (filter: FilterDefinition, bind?: unknown) => void): void;
}
export declare class Tagger6WProxyWithFilteringServices extends AbstractTaggerProxy {
    addSubjectsTags(subjects: TaggerSubjects): void;
    setSubjectsTags(subjects: TaggerSubjects): void;
    setLocalFilter(f: Record<string, FilteredTag>): Promise<void>;
    addEvent(event: "onFilterSubjectsChange", cb: (filter: FilterDefinition, bind?: unknown) => void): void;
}
export declare type TagNavigatorProxyCreateOptions = {
    filteringMode: "WithFilteringServices" | "FilteringOnServer";
    widgetId: string;
    tenant?: string;
};
export declare class TagNavigatorProxy {
    constructor();
    createProxy<T extends TagNavigatorProxyCreateOptions & {
        filteringMode: "WithFilteringServices";
    }>(options: T): Tagger6WProxyWithFilteringServices;
    createProxy<T extends TagNavigatorProxyCreateOptions & {
        filteringMode: "FilteringOnServer";
    }>(options: T): Tagger6WProxy;
}
