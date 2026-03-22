// Force greedy-nav to work on mobile by moving all items to hidden-links
(function() {
  function initMobileNav() {
    var MOBILE_BREAKPOINT = 900;
    var nav = document.querySelector('.greedy-nav');
    if (!nav) return;

    var visibleLinks = nav.querySelector('.visible-links');
    var hiddenLinks = nav.querySelector('.hidden-links');
    var toggle = nav.querySelector('.greedy-nav__toggle');
    if (!visibleLinks || !hiddenLinks || !toggle) return;

    function redistributeNav() {
      var isMobile = window.innerWidth <= MOBILE_BREAKPOINT;
      var items = Array.from(visibleLinks.querySelectorAll('li'));
      var hiddenItems = Array.from(hiddenLinks.querySelectorAll('li'));

      if (isMobile) {
        // Move all items from visible to hidden
        items.forEach(function(item) {
          hiddenLinks.insertBefore(item, hiddenLinks.firstChild);
        });
        toggle.classList.remove('hidden');
      } else {
        // Move all items back to visible
        hiddenItems.forEach(function(item) {
          visibleLinks.appendChild(item);
        });
        toggle.classList.add('hidden');
        hiddenLinks.classList.add('hidden');
      }
    }

    // Toggle menu open/close
    toggle.addEventListener('click', function() {
      hiddenLinks.classList.toggle('hidden');
    });

    redistributeNav();
    window.addEventListener('resize', redistributeNav);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileNav);
  } else {
    initMobileNav();
  }
})();
