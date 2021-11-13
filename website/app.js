/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
//let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();
let newDate = d.getMonth()+1+'-'+ d.getDate()+'-'+ d.getFullYear();

let baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&appid=5645615453655eefb5b1fccec062eed8&units=imperial";

document.getElementById("generate").addEventListener("click", performAction);

function performAction(e) {
  const zipCode = document.getElementById("zip").value;
  const feeling = document.getElementById("feelings").value;
  getWeatherByZip(baseURL, zipCode, apiKey)
    .then(function (data) {

      if(data.cod == 200) {

        let weatherData={
          temp: data.main.temp,
          date: newDate,
          feeling: feeling,
          weatherMain: data.weather[0].main,
          weatherImg: data.weather[0].icon
        }

        postData("/add",weatherData);

      } else {
        document.getElementById('entryHolder').innerHTML = `Error :${data.message}`;
        document.getElementById('imgWeather').src = '';
      }
    })
    .then(function(){
      updateUI()
    });

}
const getWeatherByZip = async (baseURL, zip, key) => {
  const res = await fetch(baseURL + zip + ",tr" + key);
  try {

      const data = await res.json();
      return data;

  } catch (error) {
    //It will be used for network errors
    console.log("error", error);
  }
};

// multiple parameter async function usage
const postData = async (url, data) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await response.json();
    console.log("postData", newData);
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};
// async function usage

const updateUI = async () => {
  const request = await fetch("/all");
  try { 
    const allData = await request.json();
      document.getElementById('temp').innerHTML = `Temperature: ${allData.temp}`;
      document.getElementById('date').innerHTML = `Date: ${allData.date}`;
      document.getElementById('content').innerHTML = `Content /Feeling : ${allData.feeling}`;
      document.getElementById('weather').innerHTML = `weather: ${allData.weatherMain }`;
      document.getElementById('imgWeather').src = ` http://openweathermap.org/img/wn/${allData.weatherImg}@2x.png `;
  } catch (error) {
    console.log("error", error);
  }
};
