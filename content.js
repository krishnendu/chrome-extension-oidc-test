chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
        if (message.action === "fetch_allowed_hosts") {
            sendResponse({allowedHosts: ALLOWED_HOSTS});
        } else if (message.action === "fetch_auth_url") {
            sendResponse({authUrl: AUTHORIZATION_URL});
        } else if (message.action === "fetch_auth_token") {
            var authToken = fetchAuthorizationToken();
            if (!authToken) {
                alert("Not Authenticated!!!");
            }
            sendResponse({authToken});
        } else if (message.action === "redirect_to_rp") {
            window.location.href = message.redirectUrl;
        }
    }
);