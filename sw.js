const CACHE_NAME = 'STORIES_CACHE-v2';

self.addEventListener('install',function(){//self es el objeto que usamos para los ServiceWorksrs
  // Guardar archivos iniciales

  caches.open(CACHE_NAME).then(function(cache){
    cache.addAll(['/index.html']);
  })
});

//mantiene actualizado el cache y elimina el viejo
self.addEventListener('activate',function(ev){
  ev.waitUntil(
    caches.keys().then(function(cacheNames){
      let promises = cacheNames.map(cacheName => {
        if(CACHE_NAME !== cacheName) return caches.delete(cacheName);
      });

      return Promise.all(promises);

    })
  );
});

//hace la magia del cargado sin conexion a internet
self.addEventListener('fetch',function(ev){
  ev.respondWith(
    caches.match(ev.request)
      .then(function(response){
        return searchInCacheOrMakeRequest(ev.request);

      }).catch(function(err){
        if(ev.request.mode == "navigate")
          return caches.match(ev.request);
      })
  );
});

function searchInCacheOrMakeRequest(request){
  const cachePromise = caches.open(CACHE_NAME);
  const matchPromise = cachePromise.then(function(cache){
    return cache.match(request);
  });


  return Promise.all([cachePromise,matchPromise]).then(function([cache,cacheResponse]){


    const fetchPromise = fetch(request).then(function(fetchResponse){

      cache.put(request,fetchResponse.clone());

      return fetchResponse;
    });

    return cacheResponse || fetchPromise;

  });

}
