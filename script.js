// 1. TAB NAVIGATION LOGIC

function openTab(tabId) {
    let tabs = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove("active-tab");
    }
    document.getElementById(tabId).classList.add("active-tab");
}


// 2. POMODORO TIMER LOGIC

let timerInterval; 
let timeLeft = 1500; 

function startTimer() {
    clearInterval(timerInterval); 
    timerInterval = setInterval(function() {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert("Time is up! Take a break.");
        } else {
            timeLeft = timeLeft - 1; 
            let minutes = Math.floor(timeLeft / 60);
            let seconds = timeLeft % 60;
            if (seconds < 10) { seconds = "0" + seconds; }
            document.getElementById("timeDisplay").innerText = minutes + ":" + seconds;
        }
    }, 1000); 
}

function stopTimer() {
    clearInterval(timerInterval); 
}

function resetTimer() {
    clearInterval(timerInterval);
    timeLeft = 1500; 
    document.getElementById("timeDisplay").innerText = "25:00";
}


// 3. TO-DO LIST LOGIC (createElement, onclick)

function addTask() {
    // Read the text from the input box
    let taskText = document.getElementById("taskInput").value;
    
    // Condition: Don't add empty tasks
    if (taskText === "") {
        alert("Please enter a task!");
        return; 
    }
    
    // Create list item (li)
    let li = document.createElement("li");
    
    // Create a span for the text so we can strike it through later
    let span = document.createElement("span");
    span.innerText = taskText;
    span.className = "task-text";
    
    // Create the "Done" button
    let doneBtn = document.createElement("button");
    doneBtn.innerText = "Done";
    doneBtn.className = "done-btn";
    
    // Add an onclick event directly to the new button
    doneBtn.onclick = function() {
        span.classList.add("completed"); // Adds strikethrough CSS
        doneBtn.disabled = true; // Grays out the button
        doneBtn.innerText = "Finished";
    };
    
    // Put the span and button inside the list item
    li.appendChild(span);
    li.appendChild(doneBtn);
    
    // Put the list item inside the unordered list in HTML
    document.getElementById("taskList").appendChild(li);
    
    // Clear the input box for the next task
    document.getElementById("taskInput").value = "";
}


// 4. SGPA ESTIMATOR LOGIC (Percentage based)

function calculateSGPA() {
    let percIds = ["perc1", "perc2", "perc3"];
    let credIds = ["cred1", "cred2", "cred3"];
    
    let totalCreditPoints = 0;
    let totalCredits = 0;
    
    // Loop to calculate values for the 3 subjects
    for (let i = 0; i < 3; i++) {
        let percentage = Number(document.getElementById(percIds[i]).value);
        let cred = Number(document.getElementById(credIds[i]).value);
        
        if (percentage > 0 && cred > 0) {
            // Convert percentage to 10-point scale (e.g., 85% = 8.5 points)
            let gradePoint = percentage / 10; 
            
            totalCredits = totalCredits + cred;
            totalCreditPoints = totalCreditPoints + (gradePoint * cred);
        }
    }
    
    if (totalCredits > 0) {
        let sgpa = totalCreditPoints / totalCredits;
        document.getElementById("sgpaResult").innerText = "Estimated SGPA: " + sgpa.toFixed(2);
    } else {
        document.getElementById("sgpaResult").innerText = "Please enter valid percentages and credits!";
    }
}


// 5. FLASHCARDS LOGIC

let flashcards = [
    { question: "What does HTML stand for?", answer: "HyperText Markup Language" },
    { question: "What is an Array?", answer: "A variable that can hold multiple values at once." },
    { question: "What does CSS do?", answer: "Styles and designs web pages." },
    { question: "What is the DOM?", answer: "Document Object Model. It represents the HTML as a tree structure." }
];

let currentCardIndex = 0;
let isShowingAnswer = false;

function nextCard() {
    currentCardIndex = (currentCardIndex + 1) % flashcards.length;
    isShowingAnswer = false; 
    document.getElementById("cardText").innerText = flashcards[currentCardIndex].question;
    document.getElementById("flashcardBox").style.background = "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)";
}

function flipCard() {
    if (isShowingAnswer === false) {
        document.getElementById("cardText").innerText = flashcards[currentCardIndex].answer;
        document.getElementById("flashcardBox").style.background = "linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)";
        isShowingAnswer = true;
    } else {
        document.getElementById("cardText").innerText = flashcards[currentCardIndex].question;
        document.getElementById("flashcardBox").style.background = "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)";
        isShowingAnswer = false;
    }
}


// 6. MOTIVATION GENERATOR

let quotes = [
    "Code is like humor. When you have to explain it, it’s bad.",
    "First, solve the problem. Then, write the code.",
    "Make it work, make it right, make it fast.",
    "The expert in anything was once a beginner.",
    "It's not a bug. It's an undocumented feature."
];

function generateQuote() {
    let randomIndex = Math.floor(Math.random() * quotes.length);
    document.getElementById("quoteText").innerText = '"' + quotes[randomIndex] + '"';
}