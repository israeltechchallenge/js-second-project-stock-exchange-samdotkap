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

async function history(){
    try{
        const response = await fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${extractedSymbol}?serietype=line`)
        const data = await response.json()
        console.log(data)
        const ctx = document.getElementById('myChart');
    }
    catch(error){
        console.log(error)
    }
}

getSymbol()
history()