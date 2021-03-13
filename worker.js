function installedHandler() {
    console.log('test')

    chrome.contextMenus.create(
        {
            title: 'KEKW',
            id: 'groupify13',
            documentUrlPatterns: ['http://*/*', 'https://*/*'],
        },
        () => console.log('Context menu item created')
    )

    chrome.contextMenus.onClicked.addListener((info, tab) => {
        console.log('Item ' + info.menuItemId + ' clicked ' + 'in tab ' + tab.url)
    })
}

chrome.runtime.onInstalled.addListener(installedHandler)
