const DOCUMENT_URL_PATTERNS = ['http://*/*', 'https://*/*']
const MAIN_ITEM_ID = 'groupify_main'

async function installedHandler() {
    await createContextMenuMainItem()

    chrome.contextMenus.onClicked.addListener((info, tab) => {
        console.log('Item ' + info.menuItemId + ' clicked ' + 'in tab ' + tab.url)
    })
}

function createContextMenuMainItem() {
    return new Promise((resolve, reject) =>
        chrome.contextMenus.create(
            {
                id: MAIN_ITEM_ID,
                title: 'KEKW',
                documentUrlPatterns: DOCUMENT_URL_PATTERNS,
            },
            () => (chrome.runtime.lastError ? reject(Error(chrome.runtime.lastError.message)) : resolve())
        )
    )
}

function createContextMenuSubItem(title, id) {
    return new Promise((resolve, reject) =>
        chrome.contextMenus.create(
            {
                title,
                id: `groupify_${id}`,
                parentId: MAIN_ITEM_ID,
                documentUrlPatterns: DOCUMENT_URL_PATTERNS,
            },
            () => (chrome.runtime.lastError ? reject(Error(chrome.runtime.lastError.message)) : resolve())
        )
    )
}

function getStorageData(key) {
    return new Promise((resolve, reject) =>
        chrome.storage.sync.get(key, (result) =>
            chrome.runtime.lastError ? reject(Error(chrome.runtime.lastError.message)) : resolve(result)
        )
    )
}

function setStorageData(data) {
    return new Promise((resolve, reject) =>
        chrome.storage.sync.set(data, () =>
            chrome.runtime.lastError ? reject(Error(chrome.runtime.lastError.message)) : resolve()
        )
    )
}

chrome.runtime.onInstalled.addListener(installedHandler)
