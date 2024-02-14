function getInfo() {
    let busId = document.getElementById('stopId').value;

    let url = ' http://localhost:3030/jsonstore/bus/businfo/' + busId;

    let stopName = document.getElementById('stopName');
    
    let list = document.getElementById("buses");
    
    request(url)
    .then(result => {
        if(typeof(result) != 'object'){
            list.replaceChildren();
            stopName.textContent = 'Error';
        }else{
            stopName.textContent = '';
            list.replaceChildren();

            stopName.textContent = result.name;

            for(let el in result.buses){
                let li = document.createElement('li');
                li.textContent = `Bus ${el} arrives in ${result.buses[el]} minutes`

                list.appendChild(li)
            }
                
            }
        })

    //let result = request(url).then(result => console.log(result))

    // fetch(url)
    // .then(res => res.json())
    // .then(data =>{
    //     console.log(data);
    // })

}

async function request(input) {
    try{
        let res = await fetch(input);
        if(res.status != 200){
            let error = await res.json()
            throw error.message;
        }    
        let data = await res.json()    
        return data;
    }catch(err){
       return err.message
    }
}