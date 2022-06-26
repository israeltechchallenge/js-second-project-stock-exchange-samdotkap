let symbol
let price

class Marquee{
    constructor(){
    this.symbol=symbol
    this.price=price
    }
    

       async displayMarquee(){
            const data = await present10();
            console.log(data)
            for(let item of data){
                const response = await fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${item.symbol}`)
                const xData= await response.json()
                this.symbol=item.symbol;
                this.price=xData.profile.price
                symbolAndPrice= `${item.symbol}: ${xData.profile.price}`
            }
            marq.innerHTML=symbolAndPrice
        }

}

const comp1=new Marquee()
comp1.displayMarquee()
console.log(comp1)