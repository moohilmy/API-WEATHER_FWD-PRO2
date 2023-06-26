

/* Global Variables */
const apiKey = '&appid=84a28eb49b47154d28036c2c05a91e86&units=metric';
const zipElement = document.getElementById('zip');
const feelingsElement = document.getElementById('feelings');
const dateElement = document.getElementById('date');
const tempElement = document.getElementById('temp');
const contentElement = document.getElementById('content');
const generateElement = document.getElementById('generate')
const cityElement = document.getElementById('city')


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


generateElement.addEventListener('click', () =>{
    document.getElementById('none').classList.remove('none')
} )

generateElement.addEventListener('click', async () =>{
try{
    const zipValue = zipElement.value;
    const feelingsValue = feelingsElement.value
    const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip='
    getWeather(baseURL,zipValue,apiKey)
    .then(function(data){
        console.log(data);
        postData('/add',{temp:data.main.temp, data:newDate,content:feelingsValue,city:data.name})
        .then(
            updateUI()
        ).then(
            fetch('/all')
  .then(response => response.text())
  .then(projectData => {
    const file = new Blob([projectData], {type: 'text/plain'});
    const fileURL = URL.createObjectURL(file);
    const a = document.createElement('a');
    a.href = fileURL;
    a.download = 'data.txt';
    console.log(a)
    a.setAttributeNode()
}).catch(error => console.error(error))

        )
    })

}
catch(error) {
    console.log("error is", error);
}

})


// fetch('/all')
//   .then(response => response.text())
//   .then(data => {
//     const file = new Blob([data], {type: 'text/plain'});
//     const fileURL = URL.createObjectURL(file);
//     const a = document.createElement('a');
//     a.href = fileURL;
//     a.download = 'data.txt';
//     console.log(a)
// }).catch(error => console.error(error));



const postData = async ( url = '', data = {})=>{
    console.log(data);
    const response = await fetch(url,{
    method: 'POST', 
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), 
    
    });

    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    }catch(error) {
    console.error("error", error);
    }
}
const getWeather = async (baseURL, zip, key)=>{

    const res = await fetch(baseURL+zip+key)
    try {
    const data = await res.json();
    console.log(data)
    return data;
    }  catch(error) {
    console.log("error", error);
    }
}

const updateUI = async () => {
    const request = await fetch('/all');
    try{
    const allData = await request.json();

    tempElement.innerHTML = `Temp is ${allData.temp} c°`;
    dateElement.innerHTML = `Time is ${allData.data}`;
    contentElement.innerHTML = `Your feel is ${allData.content}`;
    cityElement.innerHTML = `Your city is ${allData.city}`

    }catch(error){
    console.log("error", error);
    }
}

