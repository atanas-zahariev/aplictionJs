function attachEvents() {
    document.getElementById("submit").addEventListener('click', () => {
        let input = document.getElementById("location").value;
        getForecast(input)
            .then(result => {
                return result;
            })
    })

    
}

attachEvents();

let forecast = document.getElementById('forecast');
let currentWheather = document.querySelector('#current');
let upcomingWheather = document.querySelector('#upcoming');
let input = document.getElementById('location');

const weather = {
    "Sunny": '☀',
    'Partly sunny': '⛅',
    'Overcast': '☁',
    'Rain': '☂',
    'Degrees': '°'
}

async function getForecast(name) {
    const code = await getLocationCode(name);
    if (code == undefined) {
        document.querySelector('#current div').textContent = 'Error'
        forecast.style.display = 'block';
        upcomingWheather.style.display = 'none';
        input.value = ''

        let currentDay = document.querySelector('.forecasts')
        if (currentDay !== null) {
            currentDay.style.display = 'none';
        }       
        return;
    } else {
        document.querySelector('#current div').textContent = 'Current conditions'
        forecast.style.display = 'block';
        upcomingWheather.style.display = 'block'
        input.value = ''

        let currentUpdate = document.querySelector('.forecasts')
        if (currentUpdate !== null) {
            currentUpdate.remove()
        }

        let upcomingUpdate = document.querySelector('.forecast-info');
        if (upcomingUpdate !== null) {
            upcomingUpdate.remove()
        }

        const [current, upcoming] = await Promise.all([
            getCurrent(code),
            getUpcoming(code)
        ])

        let divElement = createElement('div', 'forecasts');

        let spanSymbol = createElement('span', 'condition symbol')
        spanSymbol.textContent = weather[current.forecast.condition];

        let spanConditon = createElement('span', 'condition')

        let citySpan = createElement('span', 'forecats-data')
        citySpan.textContent = current.name;
        let degreeSpan = createElement('span', 'forecast-data');
        degreeSpan.textContent = `${current.forecast.low}${weather['Degrees']}/${current.forecast.high}${weather['Degrees']}`
        let wheatherSpan = createElement('span', 'forecast-data')
        wheatherSpan.textContent = current.forecast.condition;

        spanConditon.appendChild(citySpan);
        spanConditon.appendChild(degreeSpan);
        spanConditon.appendChild(wheatherSpan);


        divElement.appendChild(spanSymbol);
        divElement.appendChild(spanConditon);
        currentWheather.appendChild(divElement)
        let divForecastInfo = createElement('div', 'forecast-info')
        upcoming.forEach(el => {

            let spanUpcoming = createElement('span', 'upcoming')

            let spanNextDaySymbol = createElement('span', 'symbol')
            spanNextDaySymbol.textContent = weather[el.condition];
            let spanDegree = createElement('span', 'forecast-info');
            spanDegree.textContent = `${el.low}${weather['Degrees']}/${el.high}${weather['Degrees']}`;
            let spanWheather = createElement('span', 'forecast-info');
            spanWheather.textContent = el.condition;

            spanUpcoming.appendChild(spanNextDaySymbol);
            spanUpcoming.appendChild(spanDegree);
            spanUpcoming.appendChild(spanWheather);

            divForecastInfo.appendChild(spanUpcoming);//

        })

        upcomingWheather.appendChild(divForecastInfo);
    }


}

function createElement(type, classType) {
    const element = document.createElement(type);
    element.className = classType;
    return element;
}


async function getLocationCode(name) {
    const url = ' http://localhost:3030/jsonstore/forecaster/locations';
    try {
        const res = await fetch(url);
        if (res.status != 200) {
            throw new Error
        }
        const data = await res.json();

        const location = data.find(l => l.name == name);
        if (location == undefined) {
            throw new Error
        }

        return location.code;
    } catch (err) {
        return undefined;
    }
}

async function getCurrent(code) {
    const url = 'http://localhost:3030/jsonstore/forecaster/today/' + code;

    const res = await fetch(url);
    const data = await res.json();

    return data;
}

async function getUpcoming(code) {
    const url = 'http://localhost:3030/jsonstore/forecaster/upcoming/' + code;

    const res = await fetch(url);
    const data = await res.json();

    return data.forecast;
}
