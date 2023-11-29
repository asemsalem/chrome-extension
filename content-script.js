chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if( request.message === "start" ) {
            // alert(request.message)
            findInputFields();
        }
    }
);

function start(){
    // alert("started");
    chrome.runtime.sendMessage({"message": "start"});
}


const findInputFields = () => {
    const inputFields = document.getElementsByTagName("input");
    if( inputFields.length > 0){
        chrome.runtime.sendMessage({"message": "service_worker", "content": "field_found"});
    }else{
        chrome.runtime.sendMessage({"message": "service_worker", "content": "no_field_found"});
    }
    return inputFields;
}


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if( request.message === "append result" ) {
            alert('Service worker Responded Successfully')
        }
    }
);