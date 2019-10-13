window.addEventListener('load', () => {
    let long;
    let lat;

    const temperatureDescription = document.querySelector('.temperature-description');
    const temperatureDegree = document.querySelector('.temperature-degree');
    const locationTimezone = document.querySelector('.location-timezone');
    const degreeSection = document.querySelector('.degree-section');
    const degreeSpan = document.querySelector('.degree-section span');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/935b31192ba49e90e1736c9a77030789/${lat},${long}`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    const { temperature, summary, icon } = data.currently;
                    temperatureDegree.textContent = Math.floor(temperature);
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;

                    let celsius = (temperature -32) * (5 / 9);

                    setIcons(icon, document.querySelector('.icon'));

                    degreeSection.addEventListener('click', () => {
                        if (degreeSpan.textContent === 'F') {
                            degreeSpan.textContent = 'C';
                            temperatureDegree.textContent = Math.floor(celsius);
                        } else {
                            degreeSpan.textContent = 'F';
                            temperatureDegree.textContent = Math.floor(temperature);
                        }
                    });
                });
        });
    }
    function setIcons(icon, iconID) {
        const skycons = new Skycons({color: 'white'});
        const currentIcon = icon.replace(/-/g, '_').toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});