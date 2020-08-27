if ('geolocation' in navigator) {
    console.log('geolocation avalable');
    window.navigator.geolocation.getCurrentPosition(async position => {
        let lat = position.coords.latitude; //26.724737
        let lng = position.coords.longitude;  //88.435052 

        let location_name = await fetch_location_name(lat, lng);

        let city = location_name['results'][0]['components']['state_district'];
        let state = location_name['results'][0]['components']['state'];
        let country = location_name['results'][0]['components']['country'];
        let continent = location_name['results'][0]['components']['continent'];
        console.log(city, state, country, continent);

        document.getElementById('address').innerHTML = `<p><b><span><h1 style="font-family: 'Tangerine', serif;font-size:50px;">You are located at ...</h1></span><h2 style="color:#38ef7d">${city}</h2><h4>${state}</h4><h5>${country},${continent}</h5><br>Latitude : ${lat}<br> Longitude : ${lng}</b></p>`
        listName = [city, state, country, continent];
        let count=11;
        let fsize=40;
        listName.forEach(async element => {
            let id;
            let eleLis = [];
            let data;
            let strCreation;
            let joinData;

            for (let i = 1; i < 4; i++) {
                if (element == city) {
                    id = "city"
                    data = await fetch_image_by_location_name(element);

                    strCreation = `<div class="col-md-4 mt-3">
                    <div class="card p-0 m-0">
                    
                    <a  href="${data['imageUrllg']}"  target="_blank">
                    <img class="img-thumbnail" src="${data['imageUrltm']}" alt="${id}" style="height:250px; width:100%" >
                    </a>
                    
                     </div>
                    </div>
                       `
                }
                if (element == state) {
                    id = "state"
                    data = await fetch_image_by_location_name(element);
                    strCreation = `<div class="col-md-4 mt-3">
                    <div class="card p-0 m-0">
                    <a  href="${data['imageUrllg']}"  target="_blank">
                    <img class="img-thumbnail" src="${data['imageUrltm']}" alt="${id}" style="height:250px; width:100%" >
                    </a>
                     </div>
                    </div>
                       `

                }
                if (element == country) {
                    id = "country"
                    data = await fetch_image_by_location_name(element);

                    strCreation = `<div class="col-md-4 mt-3">
                    <div class="card p-0 m-0">
                    
                    <a  href="${data['imageUrllg']}"  target="_blank">
                    <img class="img-thumbnail" src="${data['imageUrltm']}" alt="${id}" style="height:250px; width:100%" >
                    </a>

                     </div>
                    </div>
                       `
                }

                if (element == continent) {
                    id = "continent"
                    data = await fetch_image_by_location_name(element);

                    strCreation = `<div class="col-md-4 mt-3">
                    <div class="card p-0 m-0">
                    
                    <a  href="${data['imageUrllg']}"  target="_blank">
                    <img class="img-thumbnail" src="${data['imageUrltm']}" alt="${id}" style="height:250px; width:100%" >
                    </a>
                    
                     </div>
                    </div>
                       `
                }
                if (count!=0){
                    
                    document.getElementById('count').innerHTML=`<h4 style="color: rgb(128, 255, 0);">loading.. in..<span style="font-size:${fsize=fsize+4}px;margin:auto;">${count=count-1}</span><\h4>`
                }
                else{
                    document.getElementById('count').innerHTML=``

                }
                
                eleLis.push(strCreation);
                sleep(1000);
            }


            joinData = eleLis.join("");
            console.log(joinData, id)
            document.getElementById(id).innerHTML = joinData;



            fetch_image_by_location_name(city);

        });
    });
}
else {
    console.log('geolocation is not avalable');
}



async function fetch_location_name(lat, lng) {
    let opencageUrl = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=095e8b0cb77f479abd98280818cf9343`
    let location_nameRaw = await fetch(opencageUrl);
    let location_name = await location_nameRaw.json();
    return location_name;
}
async function fetch_image_by_location_name(name) {

    let unsplash_Url = `https://api.unsplash.com/photos/random?query=${name}&client_id=n37KJzXURbCsCnLN6A2ad1VgkABYjyE6jn-8HMyJg98`
    let imageRaw = await fetch(unsplash_Url);
    let image = await imageRaw.json();

    let imageUrltm = image['urls']['thumb'];
    let imageUrllg = image['urls']['regular'];
    
    let imageUrl='blog.jpg'
    let imageobj={imageUrltm,imageUrllg}
    // let imageobj={imageUrltm:"blog.jpg",imageUrllg:"susmita"} 
    return imageobj

}

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}
