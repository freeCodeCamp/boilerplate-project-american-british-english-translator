// Function to handle translation
const translateHandler = async () => {
  // Get references to HTML elements
  const textArea = document.getElementById("text-input");
  const localeArea = document.getElementById("locale-select");
  const errorArea = document.getElementById("error-msg");
  const translatedArea = document.getElementById("translated-sentence");

  // Prepare data for translation
  const stuff = { "text": textArea.value, "locale": localeArea.value };
  errorArea.innerText = "";
  translatedArea.innerText = "";

  // Send a POST request to the translation API
  const data = await fetch("/api/translate", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-type": "application/json"
    },
    body: JSON.stringify(stuff)
  });

  // Parse the response data as JSON
  const parsed = await data.json();
  if (parsed.error) {
    errorArea.innerText = JSON.stringify(parsed);
    return;
  }

  // Display the translated text
  translatedArea.innerHTML = parsed.translation;
  return;
};

// Add a click event listener to the translate button
document.getElementById("translate-btn").addEventListener("click", translateHandler);
