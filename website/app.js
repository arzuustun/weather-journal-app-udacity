/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

let baseURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&zip=";
const apiKey = "&appid=5645615453655eefb5b1fccec062eed8";

document.getElementById("generate").addEventListener("click", performAction);

function performAction(e) {
  const zipCode = document.getElementById("zip").value;
  const feeling = document.getElementById("feelings").value;
  getWeatherByZip(baseURL, zipCode, apiKey)
    .then(function (data) {
      console.log(data);
      let weatherData={
        temp: data.main.temp,
        date: newDate,
        feeling: feeling
      }
      postData("/add",weatherData);
    })
    .then(function(){
      updateUI()});
}
const getWeatherByZip = async (baseURL, zip, key) => {
  const res = await fetch(baseURL + zip + ",tr" + key);
  try {
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
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
const updateUI = async () => {
  const request = await fetch("/all");
  try {
    const allData = await request.json();
    document.getElementById('temp').innerHTML = `Temperature: ${allData.temp}`;
    document.getElementById('date').innerHTML = `Date: ${allData.date}`;
    document.getElementById('content').innerHTML = `Content /Feeling : ${allData.feeling}`;
  } catch (error) {
    console.log("error", error);
  }
};
