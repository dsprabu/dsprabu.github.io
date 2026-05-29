document.addEventListener('contextmenu', function(e){
  e.preventDefault();
  alert('Content protection enabled.');
});

document.querySelectorAll('img').forEach(img => {
  img.addEventListener('dragstart', e => e.preventDefault());
});
