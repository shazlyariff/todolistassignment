// DOM elements
const addWeatherBtn = document.getElementById('get-weather-btn');
const announcement = document.getElementById('announcement');

// Button to start fetching weather information
addWeatherBtn.addEventListener('click', getWeatherInfo);

// Function to fetch weather info and manipulate DOM
// element ,announcement, for user to see
function getWeatherInfo() {
  announcement.innerHTML = '';

  let promise = getWeatherForecast(); // Calling async API GET function 
  promise.then(resolve, reject); // Begin processing only after data are ready
  function resolve(json) {
    const records = json.data.records[0];
    const general = json.data.records[0].general;
    const date = records.date.split('-');
    const lowTemp = general.temperature.low;
    const highTemp = general.temperature.high;
    const forecast = general.forecast.text;
    const timestamp = records.updatedTimestamp.substring(11, 19);

    announcement.innerHTML = `<td>${forecast}<br/><br/></td>`;
    announcement.innerHTML += `<td>Date </td><td>${date[2]}-${date[1]}-${date[0]} <br/></td>`
    announcement.innerHTML += `<td>Low </td><td>${lowTemp} C<br/></td>`;
    announcement.innerHTML += `<td>High </td><td>${highTemp} C<br/><br/></td>`;
    announcement.innerHTML += `<td>Updated at </td><td>${timestamp}<br/></td>`;

  }
  // Reject get called if the is an issue in the API call
  function reject(reason) {
    console.log("Couldn't get the records! Reason: " + reason);
  }
}

// async API GET function specific URL
async function getWeatherForecast() {
  const url = 'https://api-open.data.gov.sg/v2/real-time/api/twenty-four-hr-forecast';

  // When an error encountered, system will log it under error.
  try {
    const response = await fetch(url);
    const data = await response.json();
    return await data;
  } catch (error) {
    console.error(error);
  }
}
