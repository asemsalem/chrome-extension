chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
        fetchRandom(request, sendResponse)
        return true
    }
);

const fetchRandom = async (request, sendResponse) => {
    if( request.message === "service_worker" ) {

        if(request.content == 'field_found'){
            fetch('https://random.imagecdn.app/500/150').then(async response => {
                sendResponse({
                    type : 'image',
                    response : response.url
                })
            })
        }
        else{
            fetch('https://api.quotable.io/quotes/random').then(async response => {
                const jsonResponse = await response.json()
                console.log(jsonResponse);
                sendResponse({
                    type : 'quote',
                    response : jsonResponse[0].content
                })
            })
        }
        
    }
}