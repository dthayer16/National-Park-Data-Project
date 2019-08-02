console.log("linked");

$(document).ready(function() {
console.log("doc rdy");

    function weatherAPI() {

        // translating parksAPI data string
        let string = "lat:75, long:80";
        let newArray = string.split(", ");
        let lat = newArray[0].split(":").pop();
        console.log(lat);
        let lon = newArray[1].split(":").pop();
        console.log(lon);

        var APIKEY = "25e2544ac37c66d4859201da9936ccae";
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?lon=" + lon + "&lat=" + lat + "&APPID=" + APIKEY;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            // converting kelvin to fahrenheit
            var temp = Math.floor((response.main.temp - 273.15) * 9 / 5 + 32);

            var condition = response.weather[0].main.toLowerCase();

            // forecast images assigned to variables
            var sunnyIcon = "./assets/images/sunn2.png";
            var rainyIcon = "./assets/images/rainy.png";
            var cloudyIcon = "./assets/images/cloudy1.png";
           

            // dynamic div to display 3 things
            var weatherDIV = $("<div>");
            weatherDIV.addClass("weather-info-container");

            weatherDIV.append(
                $("<img>").addClass("forecast-icon").attr("src", sunnyIcon),
                $("<h3>").text(temp + "˚ F"),
                $("<h3>").text(condition));

                $(".weather").append(weatherDIV);
                
                switch (condition) {
                    case "rain":
                    case "raining":
                    case "storm":
                    case "storms":
                    case "mist":
                    case "misty":
                    $(".forecast-icon").attr("src", rainyIcon);
                    // might add a jquery css modifier to adjust text color of condition. rainy = blue,  clouds = grey etc.
                    break;
                    case "sunny":
                    case "sun":
                    case "sunshine":
                    $("forecast-icon").attr("src", sunnyIcon);
                    break;
                    case "clouds":
                    case "cloudy":
                    case "partly cloudy":
                    $(".forecast-icon").attr("src", cloudyIcon);
                    break;
                    
            };
        });
    };

    $(".test-button").on("click",function() {
        console.log("button clicked");
        weatherAPI();
    });

})