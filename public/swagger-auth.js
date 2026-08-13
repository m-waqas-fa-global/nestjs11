(function () {
  const checkSwaggerReady = setInterval(() => {
    const ui = window.ui;

    if (!ui) {
      return;
    }

    clearInterval(checkSwaggerReady);

    console.log('Swagger UI loaded');

    ui.getConfigs().responseInterceptor = (response) => {
      try {
        if (
          response.url?.includes('/api/auth/login') &&
          response.status >= 200 &&
          response.status < 300
        ) {
          let body = response.body;

          if (typeof body === 'string') {
            body = JSON.parse(body);
          }

          const token =
            body?.data?.token ||
            body?.data?.accessToken ||
            body?.token ||
            body?.accessToken;

          if (!token) {
            console.warn('JWT token not found');
            return response;
          }

          console.log('JWT token captured');

          ui.authActions.authorize({
            bearerAuth: {
              value: token,
            },
          });

          console.log('Swagger authorization updated');
        }
      } catch (error) {
        console.error('Swagger auth error:', error);
      }
      return response;
    };
    
  }, 100);
})();