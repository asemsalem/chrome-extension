let activityBtn, loading, resetBtn


document.addEventListener("DOMContentLoaded", function() {
    activityBtn = document.getElementById("start-btn")
    resetBtn = document.getElementById("reset-btn")
    loading = document.getElementById("loading")
    activityBtn.addEventListener("click", findInputFieldsHandler);
});


function findInputFieldsHandler() {
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
        var activeTab = tabs[0];
        activityBtn.style.display = "none";
        chrome.tabs.sendMessage(activeTab.id, {"message": "start"}, ({type, response}) =>{
            if(type == "image"){
                const element = document.createElement("img");
                element.src = response;
                const container = document.getElementById('response-preview')
                container.appendChild(element);
            }else{
                const element = document.createElement("p");
                element.innerHTML = response.content;
                const container = document.getElementById('response-preview')
                container.appendChild(element);
            }
        });
    });
}




