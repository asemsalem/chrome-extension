
let results = ''
chrome.runtime.onMessage.addListener(
    async function (request, sender, sendResponse) {
        if( request.message === "service_worker" ) {
            if(request.content != 'field_found'){
                results = apiFetch('https://random.imagecdn.app/500/150')
            }else{
                results = apiFetch('https://api.quotable.io/quotes/random')
            }
        }
        sendResponse(results)
    }
);


async function apiFetch(url) {
    const response = await fetch(url);
    // const results = await response.json();
    console.log(response);
}

async function sendResponse(results) {
    await chrome.runtime.sendMessage({"message": "append result", "result": results})
}