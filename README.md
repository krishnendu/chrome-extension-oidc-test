# chrome-extension-oidc-test

- Add a file `confidentials.js` like below

```
const AUTHORIZATION_URL = "<The authorize url to authorize the RP>"; // Url of the backend or api
const ALLOWED_HOSTS = [
    'www.host1.com',
    'www.host2.com',
    'localhost:8080'
]; // Host of the frontend server


const fetchAuthorizationToken = function() {
    // return the authorization token
    const token = "";

    return `Bearer ${token}`;
}
```
- Open chrome extensions page `chrome://extensions/`
- Turn developer mode on present on top right
- Click the Load unpacked button present on top left and select the extracted folder’s location