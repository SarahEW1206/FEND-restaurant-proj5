//Coded along with Doug Brown: https://www.youtube.com/watch?v=92dtrNU1GQc

const cacheName = 'restaurant-cache-v1';

const cacheAssets = [
'index.html',
'restaurant.html',
'/css/styles.css',
'/js',
'/js/main.js',
'/js/dbhelper.js',
'/js/restaurant_info.js',
'/js/register.js',
'/data/restaurants.json',
'/img/1.jpg',
'/img/2.jpg',
'/img/3.jpg',
'/img/4.jpg',
'/img/5.jpg',
'/img/6.jpg',
'/img/7.jpg',
'/img/8.jpg',
'/img/9.jpg',
];


self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName).then( cache =>  {
      return cache.addAll(cacheAssets)
      .catch(error => {
        console.log("Cache opening error: " + error);
      });
    })
    )
});


self.addEventListener('fetch', event => {
  let cacheReq = event.request;
  let cacheUrlObj = new URL(event.request.url);
  
  //Checking to see if the item is in our cache; i.e the position is greater than -1. 
  if(event.request.url.indexOf("restaurant.html") > -1) {
    const cacheURL = "restaurant.html";
    cacheReq = new Request(cacheURL);
  }
  
  //Use this to get around CORS issues when running locally. 
  if(cacheUrlObj.hostname !== "localhost") {
    event.request.mode = "no-cors";
  }

  event.respondWith(
    caches.match(cacheReq).then(response => {
      return (
        response ||
        fetch(event.request)
        .then(fetchResponse => {
          return caches.open(cacheName).then(cache => {
            cache.put(event.request, fetchResponse.clone());
            return fetchResponse
          });
        })
        .catch(error => {
         return new Response("Not connected", {
          status: 404,
          statusText: "Application is not connected to the internet."
        });
       })
        );
    })
    );
});
