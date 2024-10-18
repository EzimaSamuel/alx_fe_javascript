// Initialize an array of quotes
let quotes = [
    { text: "The best way to predict the future is to create it.", category: "Inspiration" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "Get busy living or get busy dying.", category: "Motivation" },
    { text: "You only live once, but if you do it right, once is enough.", category: "Life" },
    { text: "Whether you think you can or you think you can't, you're right.", category: "Motivation" }
];

// Get references to DOM elements
const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteButton = document.getElementById('newQuote');
const newQuoteText = document.getElementById('newQuoteText');
const newQuoteCategory = document.getElementById('newQuoteCategory');
const addQuoteButton = document.getElementById('addQuoteButton');

// Function to show a random quote
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    quoteDisplay.innerHTML = `"${randomQuote.text}" - <strong>${randomQuote.category}</strong>`;
}

// Function to add a new quote
function addQuote() {
    const quoteText = newQuoteText.value.trim();
    const quoteCategory = newQuoteCategory.value.trim();

    // Validate input
    if (quoteText === "" || quoteCategory === "") {
        alert("Please enter both quote text and category.");
        return;
    }

    // Add the new quote to the array
    const newQuote = { text: quoteText, category: quoteCategory };
    quotes.push(newQuote);

    // Clear the input fields
    newQuoteText.value = '';
    newQuoteCategory.value = '';

    // Show the newly added quote
    showRandomQuote();
    alert("Quote added successfully!");
}

// Event listeners
newQuoteButton.addEventListener('click', showRandomQuote);
addQuoteButton.addEventListener('click', addQuote);