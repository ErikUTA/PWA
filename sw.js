self.addEventListener('install', e => {
  caches.open('cache-v1')
      .then( cache => cache.addAll ([
          'index.html',
          'https://duracionde.com/storage/images/5f8bb9f954780.jpg',
          'https://es.digitaltrends.com/wp-content/uploads/2021/08/best-horror-games-little-nightmares.jpg?p=1',
          'https://pressover.news/wp-content/uploads/2021/10/4K-Pyramid-Head-Wallpaper-scaled.jpg"',
          'https://www.youtube.com/embed/mrvIaAYZYVw',
          'https://www.youtube.com/embed/dW6tGA3OUXA',
          'https://www.youtube.com/embed/EhLs-x8xqBk',
          'css/index.css',
          'js/app.js',
          'js/main.js,',
          'sw.js'
      ]));
      e.waitUntil(cacheProm);
});

self.addEventListener('fetch', e =>{
  //cache with network fallback
  const respuesta = caches.match( e.request )
      .then ( res => {
          if ( res ) return res;
          //no existe el archivo
          //tengo que ir a la web
          console.log('No existe', e.request.url);
          return fetch( e.request ).then ( newResp => {
              caches.open('cache-v1')
                  .then( cache => {
                      cache.put( e.request, newResp);
                  }

                  )
              return newResp.clone;
          });
      });
      e.respondWith(respuesta);
  //only cache
  //e.respondWith( caches.match(e.request));
});