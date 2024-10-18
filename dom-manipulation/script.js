// Load quotes from LocalStorage or initialize with default quotes
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
    { text: "The best way to predict the future is to create it.", category: "Inspiration" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "Get busy living or get busy dying.", category: "Motivation" },
    { text: "You only live once, but if you do it right, once is enough.", category: "Life" },
    { text: "Whether you think you can or you think you can't, you're right.", category: "Motivation" }
];

// DOM Elements
const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteButton = document.getElementById('newQuote');
const categorySelect = document.getElementById('categorySelect');
const addQuoteButton = document.getElementById('addQuoteButton');
const newQuoteText = document.getElementById('newQuoteText');
const newQuoteCategory = document.getElementById('newQuoteCategory');
const exportQuotesButton = document.getElementById('exportQuotesButton');

// Initialize category dropdown
function initializeCategories() {
    categorySelect.innerHTML = ''; // Clear existing options
    const categories = ["All Categories", ...new Set(quotes.map(q => q.category))];
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.toLowerCase();
        option.textContent = category;
        categorySelect.appendChild(option);
    });
}

// Function to display a random quote
function showRandomQuote() {
    const selectedCategory = categorySelect.value;
    const filteredQuotes = selectedCategory === 'all categories' ? quotes : quotes.filter(q => q.category.toLowerCase() === selectedCategory);

    if (filteredQuotes.length === 0) {
        quoteDisplay.textContent = "No quotes available for this category.";
        return;
    }

    const randomQuote = filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)];
    quoteDisplay.innerHTML = `"${randomQuote.text}" - ${randomQuote.category} <button id="removeQuote">Remove</button>`;

    document.getElementById('removeQuote').addEventListener('click', () => removeQuote(randomQuote));
}

// Function to add a new quote
function addQuote() {
    const quoteText = newQuoteText.value.trim();
    const quoteCategory = newQuoteCategory.value.trim();

    if (quoteText === "" || quoteCategory === "") {
        alert("Please enter both quote text and category.");
        return;
    }

    // Add new quote to quotes array
    quotes.push({ text: quoteText, category: quoteCategory });

    // Update LocalStorage
    localStorage.setItem('quotes', JSON.stringify(quotes));

    // Clear input fields
    newQuoteText.value = '';
    newQuoteCategory.value = '';

    alert("Quote added successfully!");

    // Optionally, display the new quote
    showRandomQuote();
}

// Function to remove a quote
function removeQuote(quoteToRemove) {
    quotes = quotes.filter(q => q !== quoteToRemove);

    // Update LocalStorage
    localStorage.setItem('quotes', JSON.stringify(quotes));

    alert("Quote removed successfully!");

    showRandomQuote();
}

// Function to export quotes as a JSON file using application/json MIME type and Blob
function exportQuotes() {
    const quotesToExport = JSON.parse(localStorage.getItem('quotes')) || quotes;

    // Create a Blob from the quotes in JSON format
    const blob = new Blob([JSON.stringify(quotesToExport, null, 2)], { type: 'application/json' });

    // Create a link to download the Blob as a file
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'quotes.json';
    link.click();
}

// Event listeners
document.addEventListener('DOMContentLoaded', initializeCategories);
newQuoteButton.addEventListener('click', showRandomQuote);
addQuoteButton.addEventListener('click', addQuote);
exportQuotesButton.addEventListener('click', exportQuotes);