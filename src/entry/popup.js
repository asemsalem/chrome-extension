let activityBtn, loading, quote, image


document.addEventListener("DOMContentLoaded", function() {
    activityBtn = document.getElementById("start-btn")
    loading = document.getElementById("loading")
    quote = document.getElementById("response-quote")
    image = document.getElementById("response-image")
    activityBtn.addEventListener("click", findInputFieldsHandler);
});


function findInputFieldsHandler() {
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
        var activeTab = tabs[0];
        activityBtn.style.display = "none";
        loading.style.display = "flex";
        chrome.tabs.sendMessage(activeTab.id, {"message": "start"}, ({type, response}) =>{
            if(type == "image"){
                image.src = response;
            }else{
                quote.style.textAlign = "center";
                quote.innerHTML = response;
            }
            activityBtn.style.display = "block";
            loading.style.display = "none";
        });
    });
}