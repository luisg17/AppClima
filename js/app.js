//Revisar si el navegador soporta service worker

if('serviceWorker' in navigator){
    //registramos nuestro sw.js y esto nos retornara un Promise
    navigator.serviceWorker.register('./sw.js')
        .then(registrado => console.log('Se instalo correctamente', registrado))
        .catch(error => console.log('Fallo la instalacion', error))
}else{
    console.log('Service Workers no soportados');
}