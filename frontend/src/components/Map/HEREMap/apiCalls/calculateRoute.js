function calculateRouteAsync(router, options) {
  return new Promise((resolve, reject) => {
    router.calculateRoute({ ...options }, resolve, reject);
  });
}

export default calculateRouteAsync;
