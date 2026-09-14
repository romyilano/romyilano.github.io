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
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
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
