let loader2=document.querySelector(`.spinner-border2`);
let container= document.querySelector(`.company-container`);
let container2= document.querySelector(`.company-container2`);
var urlParams = new URLSearchParams(window.location.search);
var extractedSymbol=urlParams.get(`symbol`)
let prices=[]
let dates=[]

 async function getSymbol(){
    try{
        const response = await fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${extractedSymbol}`)
        const data = await response.json()
        console.log(data)
        return data
    }
    catch(error){
        console.log(error)
    }
}

async function displayCo(){
    try{
        const data= await getSymbol();
        let companyImg= data.profile.image
        let companyName=data.profile.companyName
        let companyDescrip=data.profile.description
        let companyLink=data.profile.website

        container.innerHTML= `* <img src="${companyImg}" alt="company-image"><br /><br />
        <a href="${companyLink}" target="_blank"> ${companyName}</a><br /><br />
        ${companyDescrip}<br /><br />`
        let companyPrice= data.profile.price
        var stockDifferential= data.profile.changesPercentage
        
        container2.innerHTML=`<div> Stockprice: ${companyPrice} <span class="color">${stockDifferential}%</span></div>`

        if(stockDifferential>1){
            document.querySelector(".color").style.color="green"
        }else{
            document.querySelector(".color").style.color=`red`
        }

        list=`${companyPrice} ${stockDifferential}`
        console.log(list)
    }
    catch(error){
        console.log(error)
    }
}

async function history(){
    try{
        loader2.classList.add(`display`)
        const response = await fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${extractedSymbol}?serietype=line`)
        const datae = await response.json()
        const history= datae.historical
        for(let i=0; i<history.length;i++){
            prices.push(history[i].close)
            dates.push(history[i].date) 
        }

        const ctx = document.getElementById('myChart');
        const myChart = new Chart(ctx, {
            type: "line",
            data: {
                labels: dates,
                datasets: [{
                    fill: false,
                    lineTension: 0,
                    label: `Stock prices`,
                    backgroundColor: "rgba(0,0,255,1.0)",
                    borderColor: "rgba(0,0,255,0.1)",
                    data: prices
                }]
            },
            options: {}
        });
        loader2.remove(`display`)
    }
    catch(error){
        console.log(error)
    }
}

displayCo()
history()