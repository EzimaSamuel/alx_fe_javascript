// script.js

// Initial array of quotes
let quotes = [
    { text: "The best way to predict the future is to create it.", category: "Inspiration" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "Get busy living or get busy dying.", category: "Motivation" },
    { text: "You only live once, but if you do it right, once is enough.", category: "Life" },
    { text: "Whether you think you can or you think you can't, you're right.", category: "Motivation" }
];

// Extract unique categories from quotes
let categories = ["All Categories", ...new Set(quotes.map(q => q.category))];

// DOM Elements
const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteButton = document.getElementById('newQuote');
const categorySelect = document.getElementById('categorySelect');
const addQuoteButton = document.getElementById('addQuoteButton');
const newQuoteText = document.getElementById('newQuoteText');
const newQuoteCategory = document.getElementById('newQuoteCategory');

// Initialize category dropdown
function initializeCategories() {
    categorySelect.innerHTML = ''; // Clear existing options
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.toLowerCase();
        option.textContent = category;
        categorySelect.appendChild(option);
    });
}

// Function to display a random quote
function showRandomQuote() {
    let filteredQuotes = quotes;
    const selectedCategory = categorySelect.value;

    if (selectedCategory !== 'all categories') {
        filteredQuotes = quotes.filter(q => q.category.toLowerCase() === selectedCategory);
    }

    if (filteredQuotes.length === 0) {
        quoteDisplay.textContent = "No quotes available for this category.";
        return;
    }

    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const randomQuote = filteredQuotes[randomIndex];
    quoteDisplay.textContent = `"${randomQuote.text}" - ${randomQuote.category}`;
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

    // If the category is new, add it to categories and update the dropdown
    if (!categories.includes(quoteCategory)) {
        categories.push(quoteCategory);
        initializeCategories();
    }

    // Clear input fields
    newQuoteText.value = '';
    newQuoteCategory.value = '';

    alert("Quote added successfully!");

    // Optionally, display the new quote
    showRandomQuote();
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    initializeCategories();
});

newQuoteButton.addEventListener('click', showRandomQuote);
addQuoteButton.addEventListener('click', addQuote);