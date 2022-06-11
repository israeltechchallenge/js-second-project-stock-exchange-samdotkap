let input= document.getElementById(`search-bar`);
let loader=document.querySelector(`.spinner-border`);
let list=document.querySelector(`.list`);
let btn=document.getElementById("button");

async function present10(){
    try{
        loader.classList.add(`display`)
        const response = await fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${input.value}&amp%3Blimit=10&amp%3Bexchange=NASDAQ`)
        const data = await response.json()

        for(let item of data){
            var link= `<a href="./company.html?symbol=${item.symbol}" target="_blank">${item.name} , ${item.symbol}<br /></a>`
            list.innerHTML+= link
        }    
        loader.remove(`display`)
    }
    catch(error){
        console.log(error)
    }
}

btn.addEventListener("click",present10)