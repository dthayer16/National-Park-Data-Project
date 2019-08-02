$(".btn").click(function () {
    $("#parks-data").empty();

    var state = $("#state-abbrev").val().trim().toUpperCase();
    var queryURL = "https://developer.nps.gov/api/v1/parks?stateCode=" + state + "&api_key=hkWGAafDSgmMNLcuSVwIUYko1ZyldLktuQdSpR1n";

    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        const parks = response.data;
        console.log(parks[0]);
        parks.forEach(function (park, i) {
            let $park = $("<div>").addClass("card park-card");

            let parkName = park.fullName;
            let url = park.url;
            let directionsUrl = park.directionsUrl;
            let description = park.description;


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
            $cardBody.append($("<button class='btn btn-primary mr-2'>").text("Official Site").attr("href", url));
            $cardBody.append($("<button class='btn btn-primary'>").text("Directions").attr("href", directionsUrl));
            $collapse.append($cardBody);

            $park.append($collapse);

            $("#parks-data").append($park)
        });
    });
});


