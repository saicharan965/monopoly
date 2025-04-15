import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAuth0 } from '@auth0/auth0-angular';


import { routes } from './app.routes';
import { environment } from '../env/env.local';


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideAuth0({
    domain: environment.auth.domain,
    clientId: environment.auth.clientId,
    authorizationParams: {
      redirect_uri: window.location.origin,
      audience: `https://${environment.auth.domain}/api/v2/`,
    },
  })]
};
