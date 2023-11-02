import { PassedInitialConfig } from "angular-auth-oidc-client";
import { environment } from "src/environments/environment";

export const authConfig: PassedInitialConfig = {
  config: {
    authority: environment.authAuthority,
    redirectUrl: window.location.origin + "/callback",
    postLogoutRedirectUri: window.location.origin,
    clientId: "default",
    scope: "openid profile offline_access",
    responseType: "code",
    silentRenew: true,
    useRefreshToken: true,
    renewTimeBeforeTokenExpiresInSeconds: 30,
    secureRoutes: [environment.apiUrl],
  },
};
