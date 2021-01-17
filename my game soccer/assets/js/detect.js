//when a button is preseed the event("e" stands for event)activate ,
window.addEventListener('keydown', function (e) {
  document.querySelector('p'/*we are choosing the paragraph <p> from index.html */).innerHTML = `You pressed ${e.key}`;/*we are using a ready function to show which button is choosen*/    
}, false/*Any object of which the value is not undefined or null, including a Boolean object whose value is false*/);