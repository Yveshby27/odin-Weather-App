const submitButton = document.getElementById("submit");
let body = document.querySelector("body");
let weather = document.getElementById("weather");
let region = document.getElementById("region");
let country = document.getElementById("country");
let time = document.getElementById("time");
let tempinF = document.getElementById("tempinF");
let tempinC = document.getElementById("tempinC");
let condition = document.getElementById("condition");
weather.style.display = "none";
let errorSection = document.getElementById("error");
let weatherGif = document.getElementById("weather-gif");
weatherGif.style.display = "none";
let loading = document.getElementById("loading");
loading.style.display = "none";
submitButton.addEventListener("click", () => {
  let location = document.getElementById("location");
  loading.style.display = "block";
  weather.style.display = "none";
  getInfo(location.value);
});
function getInfo(loc) {
  fetch(
    `https://api.weatherapi.com/v1/current.json?key=a737f24aca1345c59e7192105231704&q=${loc}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      let weatherObj = manageJSON(response);
      return weatherObj;
    })
    .then(function (response) {
      loading.style.display = "none";
      weather.style.display = "block";
      errorSection.textContent = "";
      region.textContent = "Region:" + response.region;
      country.textContent = "Country:" + response.country;
      time.textContent = "Date and Time:" + response.time;
      tempinF.textContent =
        "Temperature in Fahrenheit:" + response.temperatureInF + "F";
      tempinC.textContent =
        "Temperature in Celsius:" + response.temperatureinC + "C";
      condition.textContent = "Condition:" + response.condition;
      setBackgroundImage(response.condition);
    })
    .catch(function (error) {
      console.log(error);
      loading.style.display = "none";
      weather.style.display = "none";
      errorSection.textContent = "Enter a valid location";
    });
}
function manageJSON(JSONObject) {
  let weatherObject = {
    region: JSONObject.location.region,
    country: JSONObject.location.country,
    time: JSONObject.location.localtime,
    temperatureInF: JSONObject.current.temp_f,
    temperatureinC: JSONObject.current.temp_c,
    condition: JSONObject.current.condition.text,
  };
  return weatherObject;
}

async function setBackgroundImage(weatherDescription) {
  try {
    switch (weatherDescription) {
      case "Overcast": {
        weatherGif.style.display = "block";
        let overcastGifFile = await fetch(
          "https://api.giphy.com/v1/gifs/translate?api_key=k8NH3SRXfqhR2oH8u8wgXTCUPb3CfS2M&s=overcast",
          { mode: "cors" }
        );
        let overcastGif = await overcastGifFile.json();
        weatherGif.src = overcastGif.data.images.original.url;
        break;
      }
      case "Partly cloudy": {
        weatherGif.style.display = "block";
        let partlyCLoudyGifFile = await fetch(
          "https://api.giphy.com/v1/gifs/translate?api_key=k8NH3SRXfqhR2oH8u8wgXTCUPb3CfS2M&s=Partly-Cloudy-sky",
          { mode: "cors" }
        );
        let partlyCLoudyGif = await partlyCLoudyGifFile.json();
        weatherGif.src = partlyCLoudyGif.data.images.original.url;
        break;
      }
      case "Sunny": {
        weatherGif.style.display = "block";
        let sunnyGifFile = await fetch(
          "https://api.giphy.com/v1/gifs/translate?api_key=k8NH3SRXfqhR2oH8u8wgXTCUPb3CfS2M&s=sunny-weather",
          { mode: "cors" }
        );
        let sunnyGif = await sunnyGifFile.json();
        weatherGif.src = sunnyGif.data.images.original.url;
        break;
      }
      case "Clear": {
        weatherGif.style.display = "block";
        let clearGifFile = await fetch(
          "https://api.giphy.com/v1/gifs/translate?api_key=k8NH3SRXfqhR2oH8u8wgXTCUPb3CfS2M&s=sunny-weather",
          { mode: "cors" }
        );
        let clearGif = await clearGifFile.json();
        weatherGif.src = clearGif.data.images.original.url;
        break;
      }
      case "Rain": {
        weatherGif.style.display = "block";
        let rainyGifFile = await fetch(
          "https://api.giphy.com/v1/gifs/translate?api_key=k8NH3SRXfqhR2oH8u8wgXTCUPb3CfS2M&s=Happy-Rain",
          { mode: "cors" }
        );
        let rainyGif = await rainyGifFile.json();
        weatherGif.src = rainyGif.data.images.original.url;
        break;
      }
      case "Mist": {
        weatherGif.style.display = "block";
        let mistGifFile = await fetch(
          "https://api.giphy.com/v1/gifs/translate?api_key=k8NH3SRXfqhR2oH8u8wgXTCUPb3CfS2M&s=black-and-white-mist",
          { mode: "cors" }
        );
        let mistGif = await mistGifFile.json();
        weatherGif.src = mistGif.data.images.original.url;
        break;
      }
      case "Fog": {
        weatherGif.style.display = "block";
        let fogGifFile = await fetch(
          "https://api.giphy.com/v1/gifs/translate?api_key=k8NH3SRXfqhR2oH8u8wgXTCUPb3CfS2M&s=Foggy",
          { mode: "cors" }
        );
        let fogGif = await fogGifFile.json();
        weatherGif.src = fogGif.data.images.original.url;
        break;
      } //I picked random gifs to describe the weather so some of them might be odd...
    }
  } catch (error) {
    console.log(error);
  }
}
