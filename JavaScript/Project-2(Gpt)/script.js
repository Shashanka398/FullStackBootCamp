
  const searchButton = document.getElementById("searchButton");
  const loadingElement = document.getElementById("loading");
  const idChatElement = document.getElementById("idChat");

  searchButton.addEventListener("click", async () => {
    const searchInput = document.getElementById("searchInput").value;
    idChatElement.innerText = ""; 
    loadingElement.style.display = "block";
 
    try {
      const searchResults = await showSearchResult(searchInput);
       
      displayResults(searchResults);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      loadingElement.style.display = "none"; 
    }
  });

  const showSearchResult = async searchData => {
 
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer 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");

    const raw = JSON.stringify({
      "model": "text-davinci-003",
      "prompt": `${searchData}`,
      "temperature": 1,
      "max_tokens": 256,
      "top_p": 1,
      "frequency_penalty": 0,
      "presence_penalty": 0
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    try {
      const response = await fetch("https://api.openai.com/v1/completions", requestOptions);
      const result = await response.json();
      return result.choices;
    } catch (error) {
      console.log('Error:', error);
      return [];
    }
  };
 
  const displayResults = choices => {
    const str = choices.map(choice => `${choice.text}\n`).join("");
    idChatElement.innerText = str;
  };
