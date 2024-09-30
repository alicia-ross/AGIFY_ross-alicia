const searchButton = document.getElementById("searchButton");
const nameInput = document.getElementById("nameInput");
const errorMessage = document.getElementById("errorMessage");
const answerElement = document.getElementById("answer");
const historyList = document.getElementById("historyList");


function getHistory() {
    const history = localStorage.getItem("ageHistory");
    return history ? JSON.parse(history) : [];
}


function saveHistory(history) {
    localStorage.setItem("ageHistory", JSON.stringify(history));
}


function addNameToHistory(name) {
    const history = getHistory();
    
    history.unshift(name);  

    if (history.length > 10) {  
        history.pop();
    }
    
    saveHistory(history);  
}


function updateHistoryDisplay() {
    const history = getHistory();
    
    
    while (historyList.firstChild) {
        historyList.removeChild(historyList.firstChild);
    }
    
    
    history.forEach(name => {
        const li = document.createElement("li");
        li.textContent = name;
        historyList.appendChild(li);
    });
}


searchButton.addEventListener("click", function(event) {
    event.preventDefault();

    const name = nameInput.value.trim();

    
    if (name === "") {
        errorMessage.classList.remove("hidden");
        return;
    } else {
        errorMessage.classList.add("hidden");
    }
    
    
    addNameToHistory(name);

    
    fetch(`https://api.agify.io?name=${name}`)
        .then(response => response.json())
        .then(data => {
            if (data.age !== null) {
                answerElement.textContent = `${data.age} ans`;
            } 
        });

    updateHistoryDisplay();
});


updateHistoryDisplay();


const toggleHistoryBtn = document.getElementById("toggleHistoryBtn");
const historyContent = document.getElementById("historyContent");

toggleHistoryBtn.addEventListener("click", function() {
    historyContent.classList.toggle("hidden");
});
