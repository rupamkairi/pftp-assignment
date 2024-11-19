import { credentials } from "@/config";
import IdentityManager from "@arcgis/core/identity/IdentityManager";
import OAuthInfo from "@arcgis/core/identity/OAuthInfo";
import Portal from "@arcgis/core/portal/Portal";

const info = new OAuthInfo({
  appId: credentials.vercel.clientId,
  popup: false,
});

IdentityManager.registerOAuthInfos([info]);

function handleSignedIn() {
  const portal = new Portal();
  portal.load().then((results) => {
    console.log(results.user.username);
  });
}

IdentityManager.checkSignInStatus(info.portalUrl)
  .then((credential) => {
    // console.log(credential);
    // console.log(credential.token);
    localStorage.setItem("token", credential.token);
    handleSignedIn();
  })
  .catch((error) => {
    console.log(error);
    signIn();
  });

export function signIn() {
  IdentityManager.getCredential(info.portalUrl).then((credential) => {
    // console.log(credential);
    // console.log(credential.token);
    localStorage.setItem("token", credential.token);
    handleSignedIn();
  });
}
