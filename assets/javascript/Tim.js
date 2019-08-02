var states = [
    {name: "Alabama", abbr: "AL"},
    {name: "Alaska", abbr: "AK"},
    {name: "Arizona", abbr: "AZ"},
    {name: "Arkansas", abbr: "AR"},
    {name: "California", abbr: "CA"},
    {name: "Colorado", abbr: "CO"},
    {name: "Connecticut", abbr: "CT"},
    {name: "Delaware", abbr: "DE"},
    {name: "Florida", abbr: "FL"},
    {name: "Georgia", abbr: "GA"},
    {name: "Hawaii", abbr: "HI"},
    {name: "Idaho", abbr: "ID"},
    {name: "Illinois", abbr: "IL"},
    {name: "Indiana", abbr: "IN"},
    {name: "Iowa", abbr: "IA"},
    {name: "Kansas", abbr: "KS"},
    {name: "Kentucky", abbr: "KY"},
    {name: "Louisiana", abbr: "LA"},
    {name: "Maine", abbr: "ME"},
    {name: "Maryland", abbr: "MD"},
    {name: "Massachusetts", abbr: "MA"},
    {name: "Michigan", abbr: "MI"},
    {name: "Minnesota", abbr: "MN"},
    {name: "Mississippi", abbr: "MS"},
    {name: "Missouri", abbr: "MO"},
    {name: "Montana", abbr: "MT"},
    {name: "Nebraska", abbr: "NE"},
    {name: "Nevada", abbr: "NV"},
    {name: "New Hampshire", abbr: "NH"},
    {name: "New Jersey", abbr: "NJ"},
    {name: "New Mexico", abbr: "NM"},
    {name: "New York", abbr: "NY"},
    {name: "North Carolina", abbr: "NC"},
    {name: "North Dakota", abbr: "ND"},
    {name: "Ohio", abbr: "OH"},
    {name: "Oklahoma", abbr: "OK"},
    {name: "Oregon", abbr: "OR"},
    {name: "Pennsylvania", abbr: "PA"},
    {name: "Rhode Island", abbr: "RI"},
    {name: "South Carolina", abbr: "SC"},
    {name: "South Dakota", abbr: "SD"},
    {name: "Tennessee", abbr: "TN"},
    {name: "Texas", abbr: "TX"},
    {name: "Utah", abbr: "UT"},
    {name: "Vermont", abbr: "VT"},
    {name: "Virginia", abbr: "VA"},
    {name: "Washington", abbr: "WA"},
    {name: "West Virginia", abbr: "WV"},
    {name: "Wisconsin", abbr: "WI"},
    {name: "Wyoming", abbr: "WY"}
];

var index = 0;


states.forEach(function (state) {
    var newStateButton = $("<button>");

    newStateButton.addClass("dropdown-item");
    newStateButton.attr("value", state.abbr);
    newStateButton.text(state.name);
    index++;
    $("#state-dropdown").append(newStateButton);
});

states.forEach(function (state) {
    var stateOption = $("<option>");

    stateOption.addClass("dropdown-item");
    stateOption.attr("value", state.abbr);
    stateOption.text(state.name);
    index++;
    $("#find-state-parks").append(stateOption);
})
