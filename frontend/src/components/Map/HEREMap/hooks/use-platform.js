import React from 'react';

export function usePlatform(platformOptions, scriptsLoaded = true) {
  const [platform, setPlatform] = React.useState(undefined);

  React.useEffect(() => {
    const H = window.H;

    if (!platform && scriptsLoaded) {
      setPlatform(new H.service.Platform(platformOptions));
    }
  }, [platform, platformOptions, scriptsLoaded]);

  return platform;
}
