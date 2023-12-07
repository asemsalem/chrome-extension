chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "service_worker") {
    if (request.content == "field_found")
      fetchRandomImage(request, sendResponse);
    else if (request.content == "no_field_found")
      fetchRandomQuote(request, sendResponse);
  }
  return true;
});

const fetchRandomImage = async (request: unknown, sendResponse: any) => {
  let response: Response;
  try {
    response = await fetch("https://random.imagecdn.app/500/150");
    sendResponse({
      type: "image",
      response: response.url,
    });
  } catch (errors) {
    console.log("errors: ", JSON.stringify(errors));
    sendResponse({
      type: "error",
      response: {
        message: "We are expressing some difficulties. Please try again Later",
      },
    });
  }
};

const fetchRandomQuote = async (request: unknown, sendResponse: any) => {
  try {
    const response: Response = await fetch(
      "https://api.quotable.io/quotes/random"
    );
    const jsonResponse: object[] = await response.json();
    sendResponse({
      type: "quote",
      response: jsonResponse[0],
    });
  } catch (errors) {
    sendResponse({
      type: "error",
      response: errors,
    });
  }
};
