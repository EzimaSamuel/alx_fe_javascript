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
const addQuoteButton = document.getElementById('addQuoteButton');

// Function to show a random quote
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    quoteDisplay.innerHTML = `"${randomQuote.text}" - <strong>${randomQuote.category}</strong>`;
}

// Function to add a new quote
function addQuote(quoteText, quoteCategory) {
    // Validate input
    if (quoteText === "" || quoteCategory === "") {
        alert("Please enter both quote text and category.");
        return;
    }

    // Add the new quote to the array
    const newQuote = { text: quoteText, category: quoteCategory };
    quotes.push(newQuote);

    // Show the newly added quote
    showRandomQuote();
    alert("Quote added successfully!");
}

// Function to create the add quote form
function createAddQuoteForm() {
    const formDiv = document.getElementById('quoteForm');

    // Create input fields
    const newQuoteText = document.createElement('input');
    newQuoteText.setAttribute('type', 'text');
    newQuoteText.setAttribute('placeholder', 'Enter a new quote');

    const newQuoteCategory = document.createElement('input');
    newQuoteCategory.setAttribute('type', 'text');
    newQuoteCategory.setAttribute('placeholder', 'Enter quote category');

    // Create add quote button
    const button = document.createElement('button');
    button.textContent = 'Add Quote';
    button.addEventListener('click', () => {
        addQuote(newQuoteText.value.trim(), newQuoteCategory.value.trim());
        newQuoteText.value = ''; // Clear input after adding
        newQuoteCategory.value = '';
    });

    // Append elements to the form div
    formDiv.appendChild(newQuoteText);
    formDiv.appendChild(newQuoteCategory);
    formDiv.appendChild(button);
}

// Event listeners
newQuoteButton.addEventListener('click', showRandomQuote);

// Create the add quote form when the page loads
document.addEventListener('DOMContentLoaded', createAddQuoteForm);