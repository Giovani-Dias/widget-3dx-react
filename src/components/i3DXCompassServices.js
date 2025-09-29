
const config = __USER_CONFIG__ || {};
const PlatformInfos = config.PlatformInfos || [] ;
const CompatibleApps = config.CompatibleApps || [];

export class i3DXCompassServices {

  getCompatibleApps(options) {
    // const content = options.content//not implemented on local debug
    options.onComplete(CompatibleApps)
  }

  getPlatformServices(options) {
    try {

      const platform = options.platformId ? PlatformInfos.find(p => p.platformId === options.platformId) : PlatformInfos;
      options.onComplete(platform);

    }
    catch (error) {
      if (options.onFailure) {
        options.onFailure(error);
      }
    }
  }
  getServiceUrl(options) {
    try {

      const { serviceName, platformId, onComplete } = options;

      // Se não tiver serviceName, retorna undefined
      if (!serviceName) {
        onComplete(undefined);
        return;
      }

      // Filtra os dados conforme o platformId (se fornecido)
      let filteredPlatforms = platformId
        ? PlatformInfos.filter(p => p.platformId === platformId)
        : PlatformInfos;

      // Se não houver plataformas após o filtro, retorna undefined
      if (!filteredPlatforms || filteredPlatforms.length === 0) {
        onComplete(undefined);
        return;
      }

      // Monta os resultados
      const results = filteredPlatforms.map(p => {
        return {
          platformId: p.platformId,
          url: p[serviceName] // pode ser undefined se o serviceName for inválido
        };
      });

      // Se foi fornecido platformId, retorna apenas a URL (ou undefined)
      if (platformId) {
        const singleResult = results[0];
        onComplete(singleResult?.url);
      } else {
        onComplete(results);
      }

    }
    catch (error) {
      if (options.onFailure) {
        options.onFailure(error);
      }
    }
  }
}
