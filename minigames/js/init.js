var game = null;

$(document).ready(function() {
    game = new WIW.Games.Player({
        images: [
            'images/image1.jpg',
            'images/image2.jpg',
            'images/image3.jpg',
            'images/image4.jpg',
            'images/image5.jpg',
            'images/image6.jpg',
            'images/image7.jpg',
            'images/image8.jpg',
            'images/image9.jpg'
        ],
        correctIndex: 1,
        imageUrl: 'images/IMG_0832.jpg',
        game: 'falling'
    });
});
    