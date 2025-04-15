// Generated by CoffeeScript 2.7.0
(function() {
  // Select the button and audio element
  var audio, imageReveal, lastScrollY, playPauseButton;

  playPauseButton = document.querySelector('.floating-btn');

  audio = document.getElementById('song');

  // Add click event to the button
  playPauseButton.addEventListener('click', function() {
    if (audio.paused) {
      audio.play(); // If audio is paused, play it
      return playPauseButton.textContent = '❙❙'; // Change button text to "Pause"
    } else {
      audio.pause(); // If audio is playing, pause it
      return playPauseButton.textContent = '⏵'; // Change button text to "Play"
    }
  });

  imageReveal = class imageReveal {
    constructor(el) {
      this.calculateSplit = this.calculateSplit.bind(this);
      this.moveSplit = this.moveSplit.bind(this);
      this.el = el;
      this.overSlide = this.el.find('.js-over-slide');
      this.overImage = this.el.find('.js-over-image');
      this.divider = this.el.find('.js-divider');
      console.log(this.el);
  
      // Always listen for mousemove on the window
      $(window).on('mousemove', this.calculateSplit);
    }
  
    calculateSplit(e) {
      // Use the mouse's x position relative to the viewport
      var offset = e.pageX;
      console.log('Mouse X:', offset);
      this.moveSplit(offset);
    }
  
    moveSplit(offset) {
      // Ensure offset is clamped within the viewport width
      if (offset < 0) {
        offset = 0;
      } else if (offset > $(window).width()) {
        offset = $(window).width();
      }
      console.log('Offset:', offset);
      // Move the overSlide, overImage, and divider based on the offset
      this.overSlide.css('transform', 'translateX(' + offset + 'px)');
      this.overImage.css('transform', 'translateX(-' + offset + 'px)');
      this.divider.css('transform', 'translateX(' + offset + 'px)');
    }
  };

  //export the goods
  window.imageReveal = imageReveal;

  $(function() {
    return new imageReveal($('.js-image-reveal'));
  });

  lastScrollY = window.scrollY;

  $(window).on('scroll', function() {
    var $imageReveal, $leftImage, $rightImage, $imageWrapper, $underSlide, $overSlide, borderRadiusValue, currentScroll, maxHeight, maxPullVW, maxScroll, minHeight, pullAmount, scaleValue, scrollProgress, spacerHeight;
    maxScroll = 500; // amount of scroll (px) it takes to complete the animation
    currentScroll = window.scrollY;
    $imageReveal = $('.center-wrapper');
    $imageWrapper = $('.image-wrapper'); // Select the image wrapper element
    $underSlide = $('.under-slide'); // Select the under slide element
    $overSlide = $('.over-slide'); // Select the over slide element
  
    // Clamp scroll value between 0 and maxScroll
    scrollProgress = Math.min(currentScroll, maxScroll);
    
    // Calculate scale: from 1 to 0.85 over maxScroll pixels
    scaleValue = 1 - (0.5 * (scrollProgress / maxScroll));
    $imageReveal.css('transform', `scale(${scaleValue})`);
    
    // Animate border-radius of center div
    borderRadiusValue = (scrollProgress / maxScroll) * 30; // From 0 to 30px
    $('.center-wrapper').css('border-radius', `${borderRadiusValue}px`);
  
    // Animate border-radius of the image wrapper
    $imageWrapper.css('border-radius', `${borderRadiusValue}px`);
  
    // Animate border-radius of under and over slides
    $underSlide.css('border-radius', `${borderRadiusValue}px`);
    $overSlide.css('border-radius', `${borderRadiusValue}px`);
  
    // Slide in side images
    $leftImage = $('.left-image');
    $rightImage = $('.right-image');
    // Amount to pull in from sides, max 20vw
    maxPullVW = 100;
    pullAmount = maxPullVW * (scrollProgress / maxScroll);
    // Move them in from left and right
    $leftImage.css({
      'transform': `translateX(${-100 + pullAmount}%)`,
      'opacity': scrollProgress / maxScroll
    });
    $rightImage.css({
      'transform': `translateX(${100 - pullAmount}%)`,
      'opacity': scrollProgress / maxScroll
    });
    
    // Animate the scroll-spacer height
    maxHeight = 600; // Starting height in vh
    minHeight = 150; // Final height in vh
    spacerHeight = maxHeight - ((maxHeight - minHeight) * (scrollProgress / maxScroll));
    return $('.scroll-spacer').css('height', `${spacerHeight}vh`);
  });

}).call(this);
