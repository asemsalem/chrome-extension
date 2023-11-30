chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if( request.message === "start" ){
            findInputFields(sendResponse)
            return true
        }
    }
);

const start = () =>{
    chrome.runtime.sendMessage({"message": "start"});
}


const findInputFields = (sendResponse) => {
    const inputFields = document.getElementsByTagName("input");
    if( inputFields.length > 0){
        chrome.runtime.sendMessage({"message": "service_worker", "content": "field_found"}, response => {
            console.log(response);
            sendResponse(response)
        });
    }else{
        chrome.runtime.sendMessage({"message": "service_worker", "content": "no_field_found"}, response => {
            console.log(response);
            sendResponse(response)
        });
    }
    
}