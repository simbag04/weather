// form event handler
let form = document.querySelector("form");
form.addEventListener('submit', (e) => {
    e.preventDefault();

    // get user's input
    let input = document.querySelector("#city").value;

    renderWeatherData(input);
});

async function renderWeatherData(location)
{
    let data = await extractWeatherData(location);
    if (data === null) 
    {
        document.querySelector(".validity").textContent = "Please enter a valid city!";
        return;
    }
    document.querySelector(".validity").textContent = "";
    document.querySelector(".city-name").textContent = data.locationName + ", " + data.countryName;
    document.querySelector(".condition").textContent = data.conditionText;
    document.querySelector(".image").src = data.conditionImg;
    document.querySelector(".actual-f").textContent = data.actual + "\260 F";
    document.querySelector(".feelslike-f").textContent = "Feels like: " + data.feelslike + "\260 F";
}

// api functions
async function getData(location)
{
    try
    {
        const weather = await fetch("https://api.weatherapi.com/v1/current.json?key=66b695666b884fafb2b181116231204&q=" + location);
        let json = await weather.json();

        // check weather
        if (!weather.ok) return null;

        console.log(json);
        // return json data
        return json;
    }
    catch (error)
    {
        console.log("Error!");
        return null;
    }

}

async function extractWeatherData(location)
{
    let json = await getData(location);

    // check json
    if (json == null) return null;

    let weatherObject = {
        locationName: json.location.name,
        countryName: json.location.country,
        conditionText: json.current.condition.text,
        conditionImg: json.current.condition.icon,
        actual: json.current.temp_f,
        feelslike: json.current.feelslike_f
    }
    return weatherObject;
}

renderWeatherData("seattle");
