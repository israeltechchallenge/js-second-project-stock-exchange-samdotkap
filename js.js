let input= document.getElementById(`search-bar`)
let loader=document.querySelector(`.spinner-border`)
let list=document.querySelector(`.list`)
async function present10(){
    loader.classList.add(`display`)
    const response = await fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=AA&amp;limit=10&amp;exchange=NASDAQ`)
    const data = await response.json()
    
   console.log(data[0].name)

   for(let item of data){
        list.innerHTML+= `<a href="./company.html" target="_blank">${item.name} , ${item.symbol}<br /></a> `  
    }
   console.log(list)
   loader.remove(`display`)
}


present10()