chrome.webNavigation.onCompleted.addListener(function(details) {
    const url = new URL(details.url);
    var authUrl, authToken, tabId;
    chrome.tabs.query({active: true, lastFocusedWindow: true}).then(([tab]) => {
        tabId = tab.id;
        return chrome.tabs.sendMessage(tabId, {action: "fetch_allowed_hosts"});
    }).then((res) => {
        if (res.allowedHosts.includes(url.host)){
            const oidcToken = url.searchParams.get('oidc_token');

            if (oidcToken) {
                chrome.tabs.query({active: true, lastFocusedWindow: true}).then(([tab]) => {
                    tabId = tab.id;
                    return chrome.tabs.sendMessage(tabId, {action: "fetch_auth_url"});
                }).then((res) => {
                    authUrl = res.authUrl;
                }).then(() => {
                    return chrome.tabs.sendMessage(tabId, {action: "fetch_auth_token"});
                }).then((res) => {
                    authToken = res.authToken;
                }).then(() => {
                    fetch(authUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': authToken
                        },
                        body: JSON.stringify({
                            "oidc_token": oidcToken,
                            "allow": true
                        })
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log('Response:', data);

                        chrome.tabs.sendMessage(tabId, {
                            action: "redirect_to_rp",
                            redirectUrl: data.redirect_url
                        });
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
                });
            }
        }
    });
});