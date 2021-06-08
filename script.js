//get quotes from api 
let quoteContainer = document.querySelector('#quote-container')
let quoteElement = document.querySelector('#quote')
let authorElement = document.querySelector('#author')
let twitterButton = document.querySelector('#twitter')
let newQuoteButton = document.querySelector('#new-quote')
let laoder = document.querySelector('#loader')
let apiQuotes = [];

// show loading 
const loading = () => {
    laoder.style.display = 'block'
    quoteContainer.hidden = true
}


// HideLoading
const complete = () => {
    laoder.style.display = 'none'
    quoteContainer.hidden = false
}

// SHow new Quote 
const newQuote = ()=>{
    loading()
    const quote = apiQuotes[Math.floor(Math.random()*apiQuotes.length)];
    quoteElement.innerHTML = quote.text
    
    if (quote.author) {
        authorElement.innerHTML = quote.author
    }else{
        authorElement.innerHTML = 'Unknown'
    }

    if(quote.text.length > 120){
        quoteElement.classList.add('long-quote')
    }else{
        quoteElement.classList.remove('long-quote')
    }

    complete()

}

const getQuotes = async () => {
    loading()
    const apiUrl = 'https://type.fit/api/quotes'
    try {
        const response = await fetch(apiUrl)
        apiQuotes = await response.json()
        newQuote()
        complete()
    } catch (error) {
        console.log(error);
    }
}



// new quote 
newQuoteButton.addEventListener('click' , getQuotes)

// Tweet
const tweetQuote = ()=> {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteElement.textContent}-${authorElement.textContent}`
    window.open(twitterUrl,"_blank")
}

twitterButton.addEventListener('click',tweetQuote)



// onload 
getQuotes()