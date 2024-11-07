/*-- Jeff Chernenko | A00745858 | COMP 2132 */

//must use requestAnimationFrame() to swap the images
//stop button must cease the animation at whichever image was currently being shown
//add setTimeOut() to slow spinning - use 100 milliseconds
//ensure animation doesn't speed up if user clicks start multiple times


$(document).ready(function() {

  let imageNumber = 1;
  let animationId;
  let start = false;
  let showPopup = false;
  let userInteraction = false;
  let animationDelay = 100;

  //Pop-Up Functions - Show
  function showPop() {
    if (!userInteraction && !showPopup) {
      $('#pop-up').css('opacity', 1);
      showPopup = true;
    }
  }

  //Pop-Up Functions - Hide
  function hidePopup() {
    $('#pop-up').css('opacity', 0);
    showPopup = false;
  }

  //Sets 3 second delay for pop-up to show
  setTimeout(showPop, 3000);

  //Start button - Activates animation function and disables pop-up from showing
  $('#btnStart').click(function() {
    start = true;
    userInteraction = true;

    hidePopup();
    animate();

    //prevent animation from speeding up on multiple clicks
    $(this).prop('disabled', true);

  });

  //Stop button - Stops animation function and disables pop-up from showing
  $('#btnStop').click(function() {
    start = false;

    hidePopup();
    cancelAnimationFrame(animationId);

    $('#btnStart').prop('disabled', false);

  });

  //Close button - Hides pop-up if active
  $('#btnClose').click(function() {
    hidePopup();
  });

  // Disable pop-up from showing if user presses start or stop buttons
  $('#btnStart, #btnStop').click(function() {
    userInteraction = true;
  });

  //Animate function - starts/stops image rotation
  function animate() {
    
    if (!start) return;

    $('#productImage').attr('src', 'product-images/bike-' + imageNumber + '.jpg');

    if (imageNumber < 34) {
      imageNumber = imageNumber + 1;
    } else {
      imageNumber = 1;
    }

    //Slows animation effect using setTimeout()
    setTimeout(function() {
      animationId = requestAnimationFrame(animate);
    }, animationDelay);

  }
});