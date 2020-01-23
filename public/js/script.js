async function fetchweather(location) {
    const result = await fetch(`http://localhost:3000/weather?search=${location}`);
    const data = await result.json();
    return data;
}

const weatherForm = document.querySelector('.locationsearchfrom')
const search = document.querySelector('.locationsearchbox')
const success = document.querySelector('.success');
const error = document.querySelector('.error');
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    success.textContent ='Loading...';
    error.textContent='';
    fetchweather(location).then( (weather) => {
        if(weather.error) {
            error.textContent = weather.error;
            success.textContent ='';
        } else {
            success.textContent =JSON.stringify(weather);
            
        }
    });
})


