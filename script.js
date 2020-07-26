const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}
// Get Quote From API
async function getQuote() {
    showLoadingSpinner();
    const proxyUrl = 'https://protected-atoll-22521.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        // reduce font size for long quotes
        if (data.quoteText.length > 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        // set word Unknown for empty quoteAuthor
        if (data.quoteAuthor === '') {
            quoteText.innerText = 'Unknown';
        } else {
            quoteAuthor.innerText = data.quoteAuthor;
        }
        quoteText.innerText = data.quoteText;
        removeLoadingSpinner();

    } catch (error) {
        getQuote();
        console.log('oppps!!,No Quote', error);
    }
}
// tweet quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = quoteAuthor.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blankk');
}
// add eventListner
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);
//on load
getQuote();