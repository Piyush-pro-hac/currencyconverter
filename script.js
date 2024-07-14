let url = "https://latest.currency-api.pages.dev/v1/currencies/npc.json"
let src = "https://flagsapi.com/IN/flat/64.png"


let enteramount = document.querySelector("#dolcur")
let button = document.querySelector(".convertbtn")
let errortext = document.querySelector(".errortext")
const curselect = document.querySelectorAll(".form select")
const currencyrate = document.querySelector(".currencyrate")
const formcur = document.querySelector(".curmenu1 select")
const tocur = document.querySelector(".curmenu2 select")


for (let i = 0; i <= 1; i++) {
    for (let key in countryList) {  
        let option = document.createElement("option")
        option.innerText = key
        option.value = key
        curselect[i].append(option)
        if (key === "USD" && i === 0) {
            option.selected = 'selected'
        } else if (key === "INR" && i === 1) {
            option.selected = 'selected'
        }
    }
}
let curname1 = formcur.value.toLowerCase(), curname2 = tocur.value.toLowerCase()
for (let i = 0; i <= 1; i++) {
    curselect[i].addEventListener("change", () => {
        let countrycode = countryList[curselect[i].value] //country code like EU , US , IN
        let action = curselect[i].name
        if (action === "form") {
            document.querySelector(".curmenu1 img").src = `https://flagsapi.com/${countrycode}/flat/64.png`
        }
        else if (action === "to") {
            document.querySelector(".curmenu2 img").src = `https://flagsapi.com/${countrycode}/flat/64.png`
        }
        curname1 = formcur.value.toLowerCase()
        curname2 = tocur.value.toLowerCase()
    })
}

let amount
button.addEventListener("click", ((evt)=>{
    evt.preventDefault()
    amount = document.querySelector(".amount input").value
    if(amount<1){
        errortext.setAttribute("class","errorinput")
    }
    else if(amount>0){
        console.log("hello")
        errortext.setAttribute("class" ,"errortext")   
        updatecurrency()
    }
    
})) 

async function updatecurrency(){
        amount = document.querySelector(".amount input").value
        let response = await fetch(`https://latest.currency-api.pages.dev/v1/currencies/${curname1}.json`)
        let data = await response.json()
        let convertvalue = (data[curname1][curname2])
        currencyrate.innerHTML = `${amount} ${curname1} = ${convertvalue * amount} ${curname2}`
    }

window.addEventListener("load",(()=>{
    updatecurrency()
}))
