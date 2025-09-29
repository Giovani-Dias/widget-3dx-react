export interface CompatibleAppsOptions {
  content: Content;
  onComplete: (result: CompatibleAppResult[]) => void;
}

interface Content {
  protocol: string;
  version: string;
  source: string;
  target: string;
  data: ContentData;
}

interface ContentData {
  items: [ContentItem, ...ContentItem[]];
}

interface ContentItem {
  envId: string;
  serviceId: string;
  contextId: string;
  objectId: string;
  objectType: string;
  displayName: string;
}

interface CompatibleAppResult {
  className?: string;
  name: string;
  text: string;
  icon?: string;
  fonticon?: string | null;
}

export interface PlatformServicesOptions {
  platformId?: string;
  onComplete: (result: PlatformServicesResult | PlatformServicesResult[]) => void;
  onFailure?: (error: Error) => void;
}

interface PlatformServicesResult {
  "platformId": string;
  "displayName": string;
  "3DSwym": string;
  "3DCompass": string;
  "3DPassport": string;
  "3DSpace": string;
}

export interface ServiceUrlOptions {
  serviceName: string;
  platformId?: string;
  onComplete: (result: string | ServiceUrlResult[]) => void;
  onFailure?: (error: Error) => void;
}

interface ServiceUrlResult {
  platformId: string;
  url: string;
}

export declare class i3DXCompassServices {
  getCompatibleApps(options:CompatibleAppsOptions): void;
  getPlatformServices(options: PlatformServicesOptions): void;
  getServiceUrl(options: ServiceUrlOptions): void;
}
