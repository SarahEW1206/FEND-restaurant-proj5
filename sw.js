//Coded along with Doug Brown: https://www.youtube.com/watch?v=92dtrNU1GQc

const cacheName = 'restaurant-cache-v1';

const cacheAssets = [
'https://sarahew1206.github.io/FEND-restaurant-proj5/index.html',
'https://sarahew1206.github.io/FEND-restaurant-proj5/restaurant.html',
'https://sarahew1206.github.io/FEND-restaurant-proj5//css/styles.css',
'https://sarahew1206.github.io/FEND-restaurant-proj5/js',
'https://sarahew1206.github.io/FEND-restaurant-proj5/js/main.js',
'https://sarahew1206.github.io/FEND-restaurant-proj5/js/dbhelper.js',
'https://sarahew1206.github.io/FEND-restaurant-proj5/js/restaurant_info.js',
'https://sarahew1206.github.io/FEND-restaurant-proj5/js/register.js',
'https://sarahew1206.github.io/FEND-restaurant-proj5/data/restaurants.json',
'https://sarahew1206.github.io/FEND-restaurant-proj5/img/1.jpg',
'https://sarahew1206.github.io/FEND-restaurant-proj5/img/2.jpg',
'https://sarahew1206.github.io/FEND-restaurant-proj5/img/3.jpg',
'https://sarahew1206.github.io/FEND-restaurant-proj5/img/4.jpg',
'https://sarahew1206.github.io/FEND-restaurant-proj5/img/5.jpg',
'https://sarahew1206.github.io/FEND-restaurant-proj5/img/6.jpg',
'https://sarahew1206.github.io/FEND-restaurant-proj5/img/7.jpg',
'https://sarahew1206.github.io/FEND-restaurant-proj5/img/8.jpg',
'https://sarahew1206.github.io/FEND-restaurant-proj5/img/9.jpg',
'https://sarahew1206.github.io/FEND-restaurant-proj5/restaurant.html?id=1',
'https://sarahew1206.github.io/FEND-restaurant-proj5/restaurant.html?id=2',
'https://sarahew1206.github.io/FEND-restaurant-proj5/restaurant.html?id=3',
'https://sarahew1206.github.io/FEND-restaurant-proj5/restaurant.html?id=4',
'https://sarahew1206.github.io/FEND-restaurant-proj5/restaurant.html?id=5',
'https://sarahew1206.github.io/FEND-restaurant-proj5/restaurant.html?id=6',
'https://sarahew1206.github.io/FEND-restaurant-proj5/restaurant.html?id=7',
'https://sarahew1206.github.io/FEND-restaurant-proj5/restaurant.html?id=8',
'https://sarahew1206.github.io/FEND-restaurant-proj5/restaurant.html?id=9',
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
