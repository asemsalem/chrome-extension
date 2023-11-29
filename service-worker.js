chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
        fetchRandom(request,sendResponse)
        return true
    }
);

const fetchRandom = async (request, sendResponse) => {
    let url
    if( request.message === "service_worker" ) {

        if(request.content != 'field_found')
            url = 'https://random.imagecdn.app/500/150'
        else
            url = 'https://api.quotable.io/quotes/random'

        fetch(url).then(async response => {
            const jsonResponse = await response.json()
            sendResponse(jsonResponse)
        })
    }
}