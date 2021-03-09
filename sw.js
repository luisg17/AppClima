//Cachear archivos de la pagina para que funcione sin internet
const nombreCache = 'clima-v1';
const archivos = [
    //Para evitar error de ruta colocamos un . es decir la ruta relativa
    '/',
    '/index.html',
    '/error.html',
    '/css/tailwind.min.css',
    '/css/styles.css',
    '/js/app.js',
    '/js/clima.js'
];


//Cuando se  instala el service Worker(Solo se ejecuta una vez)
self.addEventListener('install', e => {
    console.log('Instalado el service Worker');

    //Guardar en cache
    e.waitUntil(
        caches.open(nombreCache)
        .then(cache => {
            console.log('Cacheando');
            //agregamos los caches
            cache.addAll(archivos);
        })
    )
});

//Este metodo se ejecuta cuando se activan el service worker

self.addEventListener('activate', e =>{
    console.log('Service Worker Activado');

    e.waitUntil(
        caches.keys()
        .then(keys => {
            // console.log(keys);

            return Promise.all(
                keys.filter(key => key !== nombreCache)
                .map(key => caches.delete(key)) //Borra los demas
            )
        })
    )
});

//eventos fetch para descargar archivos estaticos
self.addEventListener('fetch', e => {
    console.log(e);

    //Para que la pwa funcione offline
    e.respondWith(
        caches.match(e.request)
        .then(respuestaCache => {
            return respuestaCache;
        })
        //Mostramos una pagina de error en caso de no encontrar la pagina
        .then(cacheResponse => (cacheResponse ? cacheResponse : caches.match('/error.html')))
    )
});