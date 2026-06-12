const trainInput = document.querySelector("#train-number");
const dateInput = document.querySelector("#departure-date");
const trackBtn = document.querySelector("#track-btn");
const trainNameEl = document.querySelector("#train-name");
const trainRouteEl = document.querySelector("#train-route");
const statusBadge = document.querySelector("#status-badge");
const delayInfo = document.querySelector("#delay-info");
const currentStationEl = document.querySelector("#current-station");
const nextStationEl = document.querySelector("#next-station");
const nextTimeEl = document.querySelector("#next-time");
const updatedNote = document.querySelector("#updated-note");

const fromSelect = document.querySelector("#from");
const toSelect = document.querySelector("#to");
const classSelect = document.querySelector("#travel-class");
const fareBtn = document.querySelector("#fare-btn");
const fareHint = document.querySelector("#fare-hint");
const fareResult = document.querySelector("#fare-result");
const fareRoute = document.querySelector("#fare-route");
const fareClassEl = document.querySelector("#fare-class");
const fareAmount = document.querySelector("#fare-amount");
const fareDistance = document.querySelector("#fare-distance");
const fareValue = document.querySelector("#fare-value");

let trainStations = [];

const classRates = {
    sleeper: 0.5,
    ac3: 1.3,
    ac2: 1.9
};

const classNames = {
    sleeper: "Sleeper (SL)",
    ac3: "AC 3 Tier (3A)",
    ac2: "AC 2 Tier (2A)"
};

trackBtn.addEventListener("click", function() {
    const trainNumber = trainInput.value;
    const date = dateInput.value.replaceAll("-", "");

    const url = "https://indian-railway-irctc.p.rapidapi.com/api/trains/v1/train/status?departure_date=" + date + "&isH5=true&client=web&train_number=" + trainNumber;

    const options = {
        method: "GET",
        headers: {
            "x-rapidapi-key": "51fcfbb25amsh920bf108e5d441dp1f9a8ajsn7bb780a745d7",
            "x-rapidapi-host": "indian-railway-irctc.p.rapidapi.com"
        }
    };

    delayInfo.textContent = "Loading...";

    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);

            const body = data.body;
            const stations = body.stations;
            const currentCode = body.current_station;

            trainStations = stations;

            const firstStation = stations[0];
            const lastStation = stations[stations.length - 1];

            const currentIndex = stations.findIndex(function(station) {
                return station.stationCode === currentCode;
            });

            const currentStationObj = stations[currentIndex];
            const nextStationObj = stations[currentIndex + 1];

            trainNameEl.textContent = "Train " + trainNumber;
            trainRouteEl.textContent = firstStation.stationName + " → " + lastStation.stationName;

            delayInfo.innerHTML = body.train_status_message;

            if (body.terminated === true) {
                statusBadge.textContent = "Reached";
                statusBadge.className = "badge badge-ontime";
            } else {
                statusBadge.textContent = "Running";
                statusBadge.className = "badge badge-early";
            }

            if (currentStationObj) {
                currentStationEl.textContent = currentStationObj.stationName;
            } else {
                currentStationEl.textContent = currentCode;
            }

            if (nextStationObj) {
                nextStationEl.textContent = nextStationObj.stationName;
                nextTimeEl.textContent = "arr. " + nextStationObj.arrivalTime;
            } else {
                nextStationEl.textContent = "Destination reached";
                nextTimeEl.textContent = "";
            }

            updatedNote.textContent = "Updated " + body.time_of_availability;

            fillStationDropdowns(stations);
        })
        .catch(function(error) {
            console.log("Error:", error);
            delayInfo.textContent = "Could not fetch status. Check train number and date.";
        });
});

function fillStationDropdowns(stations) {
    fromSelect.innerHTML = "";
    toSelect.innerHTML = "";

    stations.forEach(function(station, index) {
        const option1 = document.createElement("option");
        option1.value = index;
        option1.textContent = station.stationName;
        fromSelect.appendChild(option1);

        const option2 = document.createElement("option");
        option2.value = index;
        option2.textContent = station.stationName;
        toSelect.appendChild(option2);
    });

    toSelect.value = stations.length - 1;
    fareHint.textContent = "Select from and to stations for this train";
}

fareBtn.addEventListener("click", function() {
    if (trainStations.length === 0) {
        fareHint.textContent = "Please check a train's status first.";
        return;
    }

    const fromIndex = Number(fromSelect.value);
    const toIndex = Number(toSelect.value);

    if (fromIndex >= toIndex) {
        fareHint.textContent = "To station must come after From station.";
        return;
    }

    const fromStation = trainStations[fromIndex];
    const toStation = trainStations[toIndex];

    const distance = Number(toStation.distance) - Number(fromStation.distance);

    const selectedClass = classSelect.value;
    const rate = classRates[selectedClass];
    const fare = Math.round(distance * rate);

    fareRoute.textContent = fromStation.stationName + " → " + toStation.stationName;
    fareClassEl.textContent = classNames[selectedClass];
    fareAmount.textContent = "₹" + fare;
    fareDistance.textContent = distance + " km";
    fareValue.textContent = "₹" + fare;

    fareResult.style.display = "block";
});