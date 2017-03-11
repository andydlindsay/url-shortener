## URL Shortener Microservice

#### User Stories
- I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.
- If I pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain an error instead.
- When I visit that shortened URL, it will redirect me to my original link.

#### App running on [heroku](http://andydlindsay-url-shortener.herokuapp.com)

#### Example creation usage:
#### `http://andydlindsay-url-shortener.herokuapp.com/new/http://www.example.com`
#### `http://andydlindsay-url-shortener.herokuapp.com/new/https://www.example.com`
#### Example creation output:
#### `{ original_url: http://www.example.com, short_url: http://andydlindsay-url-shortener.herokuapp.com/58c32285734d1d465886cbb9 }`
#### Example usage:
#### `http://andydlindsay-url-shortener.herokuapp.com/58c32285734d1d465886cbb9`
#### Will redirect to:
#### `http://www.example.com`

##### Check out my other projects:
[Free Code Camp](https://www.freecodecamp.com/andydlindsay)  
[Github](https://github.com/andydlindsay)  
[CodePen](https://codepen.io/andydlindsay/)  

##### Or find me on social media:
[LinkedIn](https://www.linkedin.com/in/andy-lindsay-17a9762b/)  
[Facebook](https://www.facebook.com/andydlindsay)  