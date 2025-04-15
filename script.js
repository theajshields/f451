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
      return playPauseButton.textContent = '⯈'; // Change button text to "Play"
    }
  });

  imageReveal = class imageReveal {
    constructor(el) {
      this._bindEvents = this._bindEvents.bind(this);
      this.startReveal = this.startReveal.bind(this);
      this.resetReveal = this.resetReveal.bind(this);
      this.calculateSplit = this.calculateSplit.bind(this);
      this.moveSplit = this.moveSplit.bind(this);
      this.el = el;
      this.overSlide = this.el.find('.js-over-slide');
      this.overImage = this.el.find('.js-over-image');
      this.divider = this.el.find('.js-divider');
      // bind those thangs
      console.log(this.el);
      this._bindEvents();
      this.resetReveal();
    }

    _bindEvents() {
      this.el.on('mouseenter', this.startReveal);
      return this.el.on('mouseleave', this.resetReveal);
    }

    startReveal() {
      console.log('start reveal');
      return this.el.on('mousemove', this.calculateSplit);
    }

    resetReveal() {
      var elMiddle;
      console.log('reset');
      this.el.off('mousemove', this.calculateSplit);
      elMiddle = this.el.width() / 2;
      return this.moveSplit(elMiddle);
    }

    calculateSplit(e) {
      var elOffset;
      elOffset = this.el.offset().left;
      //console.log elOffset
      //console.log e
      return this.moveSplit(e.pageX - elOffset);
    }

    moveSplit(offset) {
      if (offset < 0) {
        offset = 0;
      }
      console.log(offset);
      this.overSlide.css('transform', 'translateX(' + offset + 'px)');
      this.overImage.css('transform', 'translateX(-' + offset + 'px)');
      return this.divider.css('transform', 'translateX(' + offset + 'px)');
    }

  };

  //export the goods
  window.imageReveal = imageReveal;

  $(function() {
    return new imageReveal($('.js-image-reveal'));
  });

  lastScrollY = window.scrollY;

  $(window).on('scroll', function() {
    var $imageReveal, $leftImage, $rightImage, borderRadiusValue, currentScroll, maxHeight, maxPullVW, maxScroll, minHeight, pullAmount, scaleValue, scrollProgress, spacerHeight;
    maxScroll = 500; // amount of scroll (px) it takes to complete the animation
    currentScroll = window.scrollY;
    $imageReveal = $('.center-wrapper');
    // Clamp scroll value between 0 and maxScroll
    scrollProgress = Math.min(currentScroll, maxScroll);
    
    // Calculate scale: from 1 to 0.85 over maxScroll pixels
    scaleValue = 1 - (0.5 * (scrollProgress / maxScroll));
    $imageReveal.css('transform', `scale(${scaleValue})`);
    
    // Animate border-radius of .under-slide
    borderRadiusValue = (scrollProgress / maxScroll) * 30; // From 0 to 25px
    $('.under-slide').css('border-radius', `${borderRadiusValue}px`);
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
    // As the user scrolls, the scroll spacer height will reduce or increase
    maxHeight = 600; // Starting height in vh
    minHeight = 150; // Final height in vh
    spacerHeight = maxHeight - ((maxHeight - minHeight) * (scrollProgress / maxScroll));
    return $('.scroll-spacer').css('height', `${spacerHeight}vh`);
  });

}).call(this);
