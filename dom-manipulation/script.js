let quotes = JSON.parse(localStorage.getItem('quotes')) || [
    { text: "The best way to predict the future is to create it.", category: "Inspiration" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "Get busy living or get busy dying.", category: "Motivation" },
    { text: "You only live once, but if you do it right, once is enough.", category: "Life" },
    { text: "Whether you think you can or you think you can't, you're right.", category: "Motivation" }
];

const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteButton = document.getElementById('newQuote');
const categoryFilter = document.getElementById('categoryFilter');
const newQuoteText = document.getElementById('newQuoteText');
const newQuoteCategory = document.getElementById('newQuoteCategory');
const addQuoteButton = document.getElementById('addQuoteButton');
const exportQuotesButton = document.getElementById('exportQuotesButton');
const importFileInput = document.getElementById('importFile');
const importQuotesButton = document.getElementById('importQuotesButton');

// Simulated server URL (using a mock API)
const serverUrl = 'https://jsonplaceholder.typicode.com/posts'; // Replace with your own mock server if needed

function populateCategories() {
    categoryFilter.innerHTML = '<option value="all">All Categories</option>'; // Clear existing options
    const categories = ["All Categories", ...new Set(quotes.map(q => q.category))];
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.toLowerCase();
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

function filterQuotes() {
    const selectedCategory = categoryFilter.value;
    localStorage.setItem('selectedCategory', selectedCategory);

    const filteredQuotes = selectedCategory === 'all' ? quotes : quotes.filter(q => q.category.toLowerCase() === selectedCategory);

    if (filteredQuotes.length === 0) {
        quoteDisplay.textContent = "No quotes available for this category.";
        return;
    }

    const randomQuote = filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)];
    quoteDisplay.innerHTML = `"${randomQuote.text}" - ${randomQuote.category}`;
}

function showRandomQuote() {
    filterQuotes(); // Show a random quote from the filtered list
}

function addQuote() {
    const quoteText = newQuoteText.value.trim();
    const quoteCategory = newQuoteCategory.value.trim();

    if (quoteText === "" || quoteCategory === "") {
        alert("Please enter both quote text and category.");
        return;
    }

    const newQuote = { text: quoteText, category: quoteCategory };
    quotes.push(newQuote);
    localStorage.setItem('quotes', JSON.stringify(quotes));
    newQuoteText.value = '';
    newQuoteCategory.value = '';
    alert("Quote added successfully!");

    // Send new quote to server
    postQuoteToServer(newQuote);

    populateCategories();
    showRandomQuote();
}

// Function to send a new quote to the server
async function postQuoteToServer(quote) {
    try {
        const response = await fetch(serverUrl, {
            method: 'POST', // Use POST method to send data
            headers: {
                'Content-Type': 'application/json' // Set content type to application/json
            },
            body: JSON.stringify(quote) // Convert quote to JSON string
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const serverResponse = await response.json();
        console.log("Quote posted to server:", serverResponse);
    } catch (error) {
        console.error("Error posting quote to server:", error);
    }
}

function exportQuotes() {
    const quotesToExport = JSON.parse(localStorage.getItem('quotes')) || quotes;
    const blob = new Blob([JSON.stringify(quotesToExport, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'quotes.json';
    link.click();
}

function importQuotes() {
    const file = importFileInput.files[0];

    if (!file) {
        alert("Please select a file to import.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const importedQuotes = JSON.parse(e.target.result);
            if (!Array.isArray(importedQuotes) || !importedQuotes.every(quote => quote.text && quote.category)) {
                alert("Invalid file format. Ensure it contains an array of quotes with text and category.");
                return;
            }
            quotes = quotes.concat(importedQuotes);
            localStorage.setItem('quotes', JSON.stringify(quotes));
            alert("Quotes imported successfully!");
            populateCategories();
            showRandomQuote();
        } catch (error) {
            alert("Error reading file. Please upload a valid JSON file.");
        }
    };
    reader.readAsText(file);
}

// Simulate fetching data from server
async function fetchQuotesFromServer() {
    try {
        const response = await fetch(serverUrl);
        const serverQuotes = await response.json();

        // Here, we are simulating server quotes with a random selection for demonstration
        const newQuotes = serverQuotes.slice(0, 5).map(q => ({
            text: q.title,
            category: "Server"
        }));

        // Check for conflicts
        resolveConflicts(newQuotes);
    } catch (error) {
        console.error("Error fetching quotes from server:", error);
    }
}

// Resolve conflicts between local and server quotes
function resolveConflicts(newQuotes) {
    newQuotes.forEach(newQuote => {
        const existingQuoteIndex = quotes.findIndex(q => q.text === newQuote.text);
        if (existingQuoteIndex === -1) {
            quotes.push(newQuote); // Add new quote if it doesn't exist locally
        } else {
            // Conflict: Ask user how to resolve
            const userChoice = confirm(`Conflict detected for quote "${newQuote.text}". Do you want to keep the local version? Click "Cancel" to keep the server version.`);
            if (!userChoice) {
                // User chose to take the server version
                quotes[existingQuoteIndex] = newQuote;
            }
        }
    });

    localStorage.setItem('quotes', JSON.stringify(quotes));
    alert("Quotes synchronized with server!");
    populateCategories();
    showRandomQuote();
}

// Sync data with the server every 30 seconds
setInterval(fetchQuotesFromServer, 30000);

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    populateCategories();
    const lastSelectedCategory = localStorage.getItem('selectedCategory');
    if (lastSelectedCategory) {
        categoryFilter.value = lastSelectedCategory;
    }
    filterQuotes();
});

newQuoteButton.addEventListener('click', showRandomQuote);
addQuoteButton.addEventListener('click', addQuote);
exportQuotesButton.addEventListener('click', exportQuotes);
importQuotesButton.addEventListener('click', importQuotes);