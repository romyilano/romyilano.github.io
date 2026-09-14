'use strict';

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function initReveal() {
  if (prefersReducedMotion()) {
    return;
  }

  var targets = document.querySelectorAll('[data-reveal]');

  if (!('IntersectionObserver' in window)) {
    targets.forEach(function (target) {
      target.classList.add('is-revealed');
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry, i) {
        if (entry.isIntersecting) {
          entry.target.style.transitionDelay = (i % 4) * 80 + 'ms';
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { root: null, threshold: 0.12 }
  );

  targets.forEach(function (target) {
    observer.observe(target);
  });
}

function initHackathonToggle() {
  var button = document.getElementById('hackathon-more-toggle');
  var panel = document.getElementById('hackathon-more-panel');

  if (!button || !panel) {
    return;
  }

  button.addEventListener('click', function () {
    var expanded = button.getAttribute('aria-expanded') !== 'true';

    button.setAttribute('aria-expanded', expanded);
    panel.classList.toggle('is-expanded', expanded);
    panel.inert = !expanded;
    button.textContent = expanded ? '(less)' : '(more)';
  });
}

initReveal();
initHackathonToggle();
