document.addEventListener("DOMContentLoaded", (event) => {
    console.log('DOM fully loaded and parsed');
    getQuotes()
})

quoteUrl= "http://localhost:3001/quotes"
likeUrl= "http://localhost:3001/likes"
const quoteList= document.querySelector("#quote-list")
const quoteForm= document.querySelector("#new-quote-form")

const getQuotes= ()=> {
     fetch(quoteUrl)
    .then(resp=>resp.json())
    .then(quoteObj=>quoteObj.forEach(quoteO=>createQuoteCard(quoteO)))
}



const createQuoteCard= (quoteO)=>{ 
    const card=document.createElement("li")
    card.className="quote-card"
    const cardBlockQuote=document.createElement("blockquote")
    cardBlockQuote.className="blockquote"
    const p= document.createElement("p")
    p.className="mb-0"
    p.innerText= quoteO.quote
    const footer= document.createElement("footer")
    footer.className="blockquote-footer"
    footer.innerText= quoteO.author 
    const likeButton=document.createElement("button")
    likeButton.className="btn-success"
    const span=document.createElement("span")
    span.innerHTML= Number(0)
    likeButton.innerHTML=span 
    likeButton.innerText="Likes:"
    likeButtonFunctionality(likeButton,quoteO,span)
    let deleteButton=document.createElement("button")
    deleteButton.className="btn-danger"
    deleteButtonHandler(quoteO,deleteButton,card)
    deleteButton.innerText="Delete" 

    card.appendChild(cardBlockQuote)
    card.appendChild(p)
    card.appendChild(footer)
    card.appendChild(likeButton)
    card.appendChild(span)
    card.appendChild(deleteButton)
    
    quoteList.appendChild(card)
}



const formSubmitHandler= event=>{
    event.preventDefault()
    const quoteObj={
       quote: event.target[0].value, 
       author: event.target.author.value
    }
    
    fetch(quoteUrl,{
        method:"POST", 
        headers:{"Content-Type": "application/json",
        "Accept": "application/json",
      },
        body:JSON.stringify(quoteObj)
        }) 
        .then(resp=>resp.json())
        .then(createQuoteCard)
    }

quoteForm.addEventListener("submit",formSubmitHandler)

const deleteButtonHandler = (quoteO,deleteButton,card) => {
    deleteButton.addEventListener("click",(event)=>{
        fetch(quoteUrl+ `/${quoteO.id}`, {
            method:"DELETE"
        }).then(()=>card.remove())
    })
    }

    const likeButtonFunctionality= (likeButton,quoteO,span) => {
        likeButton.addEventListener("click",(event) =>{
            fetch(likeUrl, 
                {
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                },
                
                body: JSON.stringify({
                    quoteId: quoteO.id
                })
            }).then(resp=>resp.json()).then(updatedQuote=>span.innerHTML++)
        })
    }