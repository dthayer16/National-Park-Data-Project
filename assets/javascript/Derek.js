console.log("linked");

$(document).ready(function () {
    console.log("doc rdy");



    // if (response.data[index].latlong) {
    //     weatherAPI();
    // }

    function weatherAPI() {

        // translating parksAPI data string
        let string = "lat:75, long:80";
        let newArray = string.split(", ");
        let lat = newArray[0].split(":").pop();
        console.log(lat);
        let lon = newArray[1].split(":").pop();
        console.log(lon);

        // API call variables
        var APIKEY = "25e2544ac37c66d4859201da9936ccae";
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?lon=" + lon + "&lat=" + lat + "&APPID=" + APIKEY;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            // converting kelvin to fahrenheit
            var temp = Math.floor((response.main.temp - 273.15) * 9 / 5 + 32);
            console.log();

            // response values and variables for image src=
            var condition = response.weather[0].main.toLowerCase();

            var sunnyIcon = "./assets/images/sunn2.png";
            var rainyIcon = "./assets/images/rainy.png";
            var cloudyIcon = "./assets/images/cloudy1.png";
            var mistyIcon = "./assets/images/sunn2.png";


            var weatherDIV = $("<div>");
            weatherDIV.append(

                // add class to dynamic image
                $("<img>").addClass("weather-icon").attr("src", sunnyIcon),
                $("<h3>").text(temp + " ˚F"),
                $("<h3>").text(condition))
            $(".container").append(weatherDIV);

            switch (condition) {
                case "mist":
                case "misty":
                    $(".weather-icon").attr("src", mistyIcon);
                    break;
                case "sunny":
                case "sun":
                case "sunshine":
                    $(".weather-icon").attr("src", sunnyIcon);
                    break;
                case "clouds":
                    $(".weather-icon").attr("src", cloudyIcon);
                    break;
                case "thunderstorm":
                case "rain":
                case "raining":

                case "storm":
                    $(".weather-icon").attr("src", rainyIcon);
                    break;
            }

        })
    }
    $(".call").on("click", function () {
        console.log("button clicked");
        weatherAPI();
    })

})