var states = [
    { name: "Alabama", abbr: "AL" },
    { name: "Alaska", abbr: "AK" },
    { name: "Arizona", abbr: "AZ" },
    { name: "Arkansas", abbr: "AR" },
    { name: "California", abbr: "CA" },
    { name: "Colorado", abbr: "CO" },
    { name: "Connecticut", abbr: "CT" },
    { name: "Delaware", abbr: "DE" },
    { name: "Florida", abbr: "FL" },
    { name: "Georgia", abbr: "GA" },
    { name: "Hawaii", abbr: "HI" },
    { name: "Idaho", abbr: "ID" },
    { name: "Illinois", abbr: "IL" },
    { name: "Indiana", abbr: "IN" },
    { name: "Iowa", abbr: "IA" },
    { name: "Kansas", abbr: "KS" },
    { name: "Kentucky", abbr: "KY" },
    { name: "Louisiana", abbr: "LA" },
    { name: "Maine", abbr: "ME" },
    { name: "Maryland", abbr: "MD" },
    { name: "Massachusetts", abbr: "MA" },
    { name: "Michigan", abbr: "MI" },
    { name: "Minnesota", abbr: "MN" },
    { name: "Mississippi", abbr: "MS" },
    { name: "Missouri", abbr: "MO" },
    { name: "Montana", abbr: "MT" },
    { name: "Nebraska", abbr: "NE" },
    { name: "Nevada", abbr: "NV" },
    { name: "New Hampshire", abbr: "NH" },
    { name: "New Jersey", abbr: "NJ" },
    { name: "New Mexico", abbr: "NM" },
    { name: "New York", abbr: "NY" },
    { name: "North Carolina", abbr: "NC" },
    { name: "North Dakota", abbr: "ND" },
    { name: "Ohio", abbr: "OH" },
    { name: "Oklahoma", abbr: "OK" },
    { name: "Oregon", abbr: "OR" },
    { name: "Pennsylvania", abbr: "PA" },
    { name: "Rhode Island", abbr: "RI" },
    { name: "South Carolina", abbr: "SC" },
    { name: "South Dakota", abbr: "SD" },
    { name: "Tennessee", abbr: "TN" },
    { name: "Texas", abbr: "TX" },
    { name: "Utah", abbr: "UT" },
    { name: "Vermont", abbr: "VT" },
    { name: "Virginia", abbr: "VA" },
    { name: "Washington", abbr: "WA" },
    { name: "West Virginia", abbr: "WV" },
    { name: "Wisconsin", abbr: "WI" },
    { name: "Wyoming", abbr: "WY" }
];

var index = 0;

let latLong = "";

// Results Page Dropdown
states.forEach(function (state) {
    var newStateButton = $("<button>");

    newStateButton.addClass("dropdown-item");
    newStateButton.attr("value", state.abbr);
    newStateButton.text(state.name);
    index++;
    $("#state-dropdown").append(newStateButton);
});

// Index Page Dropdown
states.forEach(function (state) {
    var stateOption = $("<option>");

    stateOption.addClass("dropdown-item");
    stateOption.attr("value", state.abbr);
    stateOption.text(state.name);
    index++;
    $("#find-state-parks").append(stateOption);
});

function newDoc(state) {
    window.location.assign("results.html?state=" + state);
};


$("#submit-button-style").on("click", function (e) {
    e.preventDefault();
    newDoc($("#find-state-parks").val());
});

var urlParams = new URLSearchParams(window.location.search);

if (urlParams.has("state")) {
    const state = urlParams.get("state");
    nationalParkData(state);
}

function nationalParkData(state) {

    var queryURL = "https://developer.nps.gov/api/v1/parks?stateCode=" + state + "&api_key=hkWGAafDSgmMNLcuSVwIUYko1ZyldLktuQdSpR1n";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        const parks = response.data;

        parks.forEach(function (park, i) {
            let $park = $("<div>")
                .addClass("card park-card")
                .attr("id", park.id)

            let parkName = park.fullName;
            let url = park.url;
            let directionsUrl = park.directionsUrl;
            let description = park.description;
            latLong = park.latLong;


            let $cardHeader = $("<div>").addClass("card-header");
            $cardHeader.append($("<button>")
                .addClass("btn btn-link ")
                .text(parkName)
                .attr("data-toggle", "collapse")
                .attr("data-target", "#park-data-" + i)
            );
            $park.append($cardHeader);

            let $collapse = $("<div>").addClass("collapse");
            $collapse.attr("id", "park-data-" + i);
            let $cardBody = $("<div>").addClass("card-body");
            $cardBody.append($("<p>").text(description));
            $cardBody.append($("<a class='btn btn-primary mr-2'>").text("Official Site").attr("href", url).attr("target", "_blank"));
            $cardBody.append($("<a class='btn btn-primary'>").text("Directions").attr("href", directionsUrl).attr("target", "_blank"));
            $collapse.append($cardBody);

            $park.append($collapse);

            $("#park-results").append($park)
            if (latLong) {
                weatherAPI({
                    id: park.id,
                    lat: latLong.split(", ")[0].split(":").pop(),
                    long: latLong.split(", ")[1].split(":").pop(),
                });
            } else {
                $cardBody.append("No weather data available");
            }
        });
    });
};

$(".dropdown-item").click(function () {
    $("#park-results").empty();

    var state = $(this).val().trim().toUpperCase();

    nationalParkData(state);
});

function weatherAPI(params) {

    // translating parksAPI data string
    // let string = latLong;
    // let newArray = string.split(", ");
    // let lat = newArray[0].split(":").pop();
    // let lon = newArray[1].split(":").pop();  

    var APIKEY = "25e2544ac37c66d4859201da9936ccae";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?lon=" + params.long + "&lat=" + params.lat + "&APPID=" + APIKEY;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

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

        $("#" + params.id).find(".card-body").append(weatherDIV);

        switch (condition) {
            case "rain":
            case "raining":
            case "storm":
            case "storms":
            case "mist":
            case "misty":
                $("#" + params.id).find(".forecast-icon").attr("src", rainyIcon);
                // might add a jquery css modifier to adjust text color of condition. rainy = blue,  clouds = grey etc.
                break;
            case "sunny":
            case "sun":
            case "sunshine":
                $("#" + params.id).find(".forecast-icon").attr("src", sunnyIcon);
                break;
            case "clouds":
            case "cloudy":
            case "partly cloudy":
                $("#" + params.id).find(".forecast-icon").attr("src", cloudyIcon);
                break;

        };
    });
};