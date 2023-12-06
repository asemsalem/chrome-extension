import PopUpVue from "@/view/PopUp.vue";
import { createApp } from "vue";

const contentDetectorWrapper: HTMLElement = document.createElement("div");
contentDetectorWrapper.id = "data-detector-wrapper-container";
document.body.appendChild(contentDetectorWrapper);

const app = createApp(PopUpVue);
app.mount("#data-detector-wrapper-container");

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "start") {
    findInputFields(sendResponse);
    return true;
  }
});

const findInputFields = (sendResponse: any) => {
  const inputFields = document.getElementsByTagName("input");
  if (inputFields.length > 0) {
    chrome.runtime.sendMessage(
      { message: "service_worker", content: "field_found" },
      (response) => {
        console.log(response);
        sendResponse(response);
      }
    );
  } else if (inputFields.length == 0) {
    chrome.runtime.sendMessage(
      { message: "service_worker", content: "no_field_found" },
      (response) => {
        console.log(response);
        sendResponse(response);
      }
    );
  }
};
