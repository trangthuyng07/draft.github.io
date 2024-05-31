document.addEventListener("DOMContentLoaded", () => {
    const accessToken = 'IGQWRNNldPQ2swaWVtNGUyTlRYeGpXQnZALYUpoOW5MSHAybENROFNrTU40aDR5RkNzWGYwelBJSDNNbnJiOXpYd0EtUHlnR1BVODJ2MDJoSEZAZAczlSSGtLR0oxakZAwUFNLMVdNU3ltc2E4aG1fcW42X1JoQ0phWUUZD'; // Replace with your actual access token
    const userId = '7360952250696755'; // Replace with your actual user ID

    fetch(`https://graph.instagram.com/${userId}/media?fields=id,caption,media_type,media_url&access_token=${accessToken}`)
        .then(response => response.json())
        .then(data => {
            const gallery = document.getElementById('gallery');
            data.data.forEach(item => {
                if (item.media_type === 'IMAGE' || item.media_type === 'CAROUSEL_ALBUM') {
                    const imageContainer = document.createElement('div');
                    imageContainer.classList.add('image-container');
                    const img = document.createElement('img');
                    img.src = item.media_url;
                    imageContainer.appendChild(img);
                    gallery.appendChild(imageContainer);
                }
            });

            // Zoom Functionality
            gallery.addEventListener('wheel', function(event) {
                event.preventDefault();
                let scale = Number(gallery.style.transform.replace(/[^0-9.]/g, '')) || 1;
                if (event.deltaY > 0) {
                    scale -= 0.1;
                } else {
                    scale += 0.1;
                }
                gallery.style.transform = `scale(${scale})`;
            });
        })
        .catch(error => console.error('Error fetching Instagram data:', error));
});
