(function () {
  var container = document.querySelector('.main');
  var center = document.querySelector('.center');

  var buttons = Array.prototype.slice.call(document.querySelectorAll('button'));
  var codes   = Array.prototype.slice.call(document.querySelectorAll('pre'));
  var classes = [{
      container: "main",
      center: "center know-size"
    },{
      container: "main",
      center: "center dont-know-size"
    },{
      container: "main flex-parent",
      center: "center with-flex"
    }];
  
  buttons.forEach( function ( el, index ) {
    el.addEventListener('click', function () {
      buttons.forEach(function(el) {
        el.setAttribute('class', '');
      })
      el.setAttribute('class', 'active');

      codes.forEach(function (el) {
        el.style.display = 'none';
      })
      codes[index].style.display = 'block';

      container.setAttribute('class', classes[index]['container']);
      center.setAttribute('class', classes[index]['center']);
    })
  });
})()