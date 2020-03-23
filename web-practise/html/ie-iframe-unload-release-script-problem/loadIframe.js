var loader = document.getElementById('loader')

document.addEventListener( "DOMContentLoaded", function () {
  load('./c1.html')
}, false )

function load(url) {
  loader.src = url
}

setTimeout(function(){load('./c2.html')}, 2000)