function solve() {
    let departBtn =  document.getElementById("depart");
    let arriveBtn = document.getElementById("arrive");
    let info = document.getElementById('info');

    let stop = {
        next:'depot'
    }

    async function depart() {
        let url = `http://localhost:3030/jsonstore/bus/schedule/${stop.next}`

        let res = await fetch(url)
        let data = await res.json()
        
        stop = data;
        info.textContent = `Next stop ${data.name}`

        departBtn.disabled = true;
        arriveBtn.disabled = false;
    }

    function arrive() {
        info.textContent = `Arriving at ${stop.name}`
        departBtn.disabled = false;
        arriveBtn.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();