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
  const response: Response = await fetch("https://random.imagecdn.app/500/150");
  sendResponse({
    type: "image",
    response: response.url,
  });
};

const fetchRandomQuote = async (request: unknown, sendResponse: any) => {
  const response: Response = await fetch(
    "https://api.quotable.io/quotes/random"
  );
  const jsonResponse: object[] = await response.json();
  sendResponse({
    type: "quote",
    response: jsonResponse[0],
  });
};
