let input= document.getElementById(`search-bar`);
let loader=document.querySelector(`.spinner-border`);
let list=document.querySelector(`.list`);
let btn=document.getElementById("button");

async function present10(){
    try{
        loader.classList.add(`display`)
        const response = await fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${input.value}&limit=10&amp%3Bexchange=NASDAQ`)
        const data = await response.json()
        return data
    }
    catch(error){
        console.log(error)
    }
}

async function displayList(){
    try{
        const data = await present10();
        console.log(data)
        for(let item of data){
            const response = await fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${item.symbol}`)
            const xData= await response.json()

            var link= `<img src="${xData.profile.image}"> <a href="./company.html?symbol=${item.symbol}" target="_blank">${item.name} , ${item.symbol}</a> ${xData.profile.changesPercentage}</br> `
            
            console.log(xData)
            list.innerHTML+= link
        }    
        loader.remove(`display`)
    }
    catch(error){
        console.log(error)
    }
}


btn.addEventListener("click",displayList);

// import {stockDifferential} from './company.js'
// console.log(stockDifferential)