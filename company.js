let loader2=document.querySelector(`.spinner-border2`);
let container= document.querySelector(`.company-container`);
let container2= document.querySelector(`.company-container2`);
var urlParams = new URLSearchParams(window.location.search);
var extractedSymbol=urlParams.get(`symbol`)

async function getSymbol(){
    try{
        const response = await fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${extractedSymbol}`)
        const data = await response.json()
        
        let companyImg= data.profile.image
        let companyName=data.profile.companyName
        let companyDescrip=data.profile.description
        let companyLink=data.profile.website

        container.innerHTML= `* <img src="${companyImg}" alt="company-image"><br /><br />
        <a href="${companyLink}" target="_blank"> ${companyName}</a><br /><br />
        ${companyDescrip}<br /><br />`

        let companyPrice= data.profile.price
        let stockDifferential= data.profile.changesPercentage

        container2.innerHTML=`Stockprice: ${companyPrice} ${stockDifferential}%`
        
        // This isnt working. problem with color. IDK WHY

        // if(stockDifferential>1){
        //     stockDifferential.style.color="green"
        // }else{
        //     stockDifferential.style.color=`red`
        // }
    }
    catch(error){
        console.log(error)
    }
}
var yValues = [500,1000,1500,2000,2500,3000];
var xValues = [`Jan`,`Feb`,`Mar`,`Apr`,`May`,`Jun`,`Jul`,`Aug`,`Sep`,`Oct`,`Nov`,`Dec`];
let prices=[]
let dates=[]

async function history(){
    try{
        loader2.classList.add(`display`)
        const response = await fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${extractedSymbol}?serietype=line`)
        const datae = await response.json()
        prices.push(datae.historical.close)
        dates.push(datae.historical.date)
        const ctx = document.getElementById('myChart');
        const myChart = new Chart(ctx, {
            type: "line",
            data: {
                labels: dates,
                datasets: [{
                    fill: false,
                    lineTension: 0,
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

getSymbol()
history()