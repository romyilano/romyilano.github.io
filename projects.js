'use strict';

(function () {
  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function qs(id) {
    return document.getElementById(id);
  }

  function el(tag, className, attrs) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (attrs) {
      Object.keys(attrs).forEach(function (key) {
        if (attrs[key] === undefined || attrs[key] === null) return;
        node.setAttribute(key, attrs[key]);
      });
    }
    return node;
  }

  var TILTS = [1, -1.6, -1.2, 1.5, 1.2, -1, 1.4, -0.6, 0.8, -1.4];

  function tiltFor(index) {
    return TILTS[index % TILTS.length];
  }

  function projectHref(project) {
    return 'project.html?slug=' + encodeURIComponent(project.slug);
  }

  function externalHref(project) {
    return project.href || 'https://github.com/romyilano';
  }

  function buildMedia(project, opts) {
    var wrap = el('div', 'projects-media', { style: 'transform: rotate(' + tiltFor(opts.index) + 'deg)' });
    var frame = el('div', 'projects-media__frame');
    if (project.img) {
      var img = el('img', 'projects-media__img', {
        src: project.img,
        alt: '',
        loading: opts.eager ? 'eager' : 'lazy',
        decoding: 'async'
      });
      frame.appendChild(img);
    } else {
      var placeholder = el('div', 'projects-media__placeholder');
      placeholder.textContent = project.caption || project.title;
      frame.appendChild(placeholder);
    }
    var caption = el('span', 'projects-media__caption');
    caption.textContent = project.caption || '';
    frame.appendChild(caption);
    wrap.appendChild(frame);
    wrap.appendChild(el('span', 'projects-media__sticker', { 'aria-hidden': 'true' }));
    return wrap;
  }

  /* ---------------- Listing page ---------------- */

  function initListing(data) {
    var track = qs('projects-carousel-track');
    if (!track) return;

    var featured = data.filter(function (p) { return p.featured; });

    featured.forEach(function (project, index) {
      var li = el('li', 'projects-carousel__card');
      li.appendChild(buildMedia(project, { index: index, eager: index === 0 }));

      var body = el('div', 'projects-carousel__body');
      var headRow = el('div', 'projects-carousel__title-row');
      var num = el('span', 'projects-carousel__num');
      num.textContent = project.num;
      var titleLink = el('a', 'projects-carousel__title', { href: projectHref(project) });
      titleLink.textContent = project.title;
      headRow.appendChild(num);
      headRow.appendChild(titleLink);
      body.appendChild(headRow);

      var meta = el('p', 'projects-carousel__meta');
      meta.textContent = project.meta;
      body.appendChild(meta);

      var line = el('p', 'projects-carousel__line');
      line.textContent = project.line;
      body.appendChild(line);

      li.appendChild(body);
      track.appendChild(li);
    });

    qs('projects-featured-count').textContent =
      'Featured · ' + String(featured.length).padStart(2, '0') + ' of ' + String(data.length).padStart(2, '0') + ' projects';

    initCarousel(track, featured.length);
    initFilters(data);
  }

  function initCarousel(track, count) {
    var label = qs('projects-slide-label');
    var prevBtn = qs('projects-prev');
    var nextBtn = qs('projects-next');
    if (!prevBtn || !nextBtn) return;

    function updateLabel() {
      var cards = track.children;
      if (!cards.length) return;
      var step = cards[0].getBoundingClientRect().width + 40;
      var index = Math.min(count - 1, Math.round(track.scrollLeft / step));
      label.textContent = String(index + 1).padStart(2, '0') + ' / ' + String(count).padStart(2, '0');
    }

    function scrollByCard(direction) {
      var cards = track.children;
      if (!cards.length) return;
      var step = cards[0].getBoundingClientRect().width + 40;
      track.scrollBy({ left: direction * step, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
    }

    prevBtn.addEventListener('click', function () { scrollByCard(-1); });
    nextBtn.addEventListener('click', function () { scrollByCard(1); });
    track.addEventListener('scroll', updateLabel, { passive: true });
    updateLabel();
  }

  function initFilters(data) {
    var grid = qs('projects-grid');
    var emptyMsg = qs('projects-empty');
    var shownCount = qs('projects-shown-count');
    if (!grid) return;

    var state = { kind: 'all', platform: 'all', prize: false };

    var cards = data.map(function (project, index) {
      var card = el('a', 'projects-grid__card', {
        href: projectHref(project),
        'data-reveal': '1',
        style: 'transform: rotate(' + tiltFor(index) + 'deg)'
      });
      card.appendChild(el('span', 'projects-grid__sticker', { 'aria-hidden': 'true' }));

      var top = el('div', 'projects-grid__top');
      var yearKind = el('span', '');
      yearKind.textContent = project.year + ' · ' + (project.kind === 'hackathon' ? 'Hackathon' : 'Personal');
      top.appendChild(yearKind);
      if (project.prize) {
        var prizeTag = el('span', 'projects-grid__prize');
        prizeTag.textContent = '✦ ' + project.prize;
        top.appendChild(prizeTag);
      }
      card.appendChild(top);

      var title = el('span', 'projects-grid__title');
      title.textContent = project.title;
      card.appendChild(title);

      var line = el('p', 'projects-grid__line');
      line.textContent = project.line;
      card.appendChild(line);

      var bottom = el('div', 'projects-grid__bottom');
      var platforms = el('div', 'projects-grid__platforms');
      project.platforms.forEach(function (platform) {
        var chip = el('span', 'projects-grid__platform');
        chip.textContent = platform;
        platforms.appendChild(chip);
      });
      bottom.appendChild(platforms);
      var open = el('span', 'projects-grid__open');
      open.textContent = 'View project →';
      bottom.appendChild(open);
      card.appendChild(bottom);

      grid.appendChild(card);
      return { el: card, project: project };
    });

    function applyFilters() {
      var visible = 0;
      cards.forEach(function (entry) {
        var p = entry.project;
        var matches =
          (state.kind === 'all' || p.kind === state.kind) &&
          (state.platform === 'all' || p.platforms.indexOf(state.platform) !== -1) &&
          (!state.prize || p.prize);
        entry.el.hidden = !matches;
        if (matches) visible += 1;
      });
      shownCount.textContent = visible + ' of ' + data.length;
      emptyMsg.hidden = visible !== 0;
    }

    function makeChipGroup(containerId, key, options) {
      var container = qs(containerId);
      var buttons = options.map(function (opt) {
        var btn = el('button', 'projects-filter__chip', { type: 'button', 'aria-pressed': String(opt.value === state[key]) });
        btn.textContent = opt.label;
        btn.addEventListener('click', function () {
          state[key] = opt.value;
          buttons.forEach(function (b, i) { b.setAttribute('aria-pressed', String(options[i].value === state[key])); });
          applyFilters();
        });
        container.appendChild(btn);
        return btn;
      });
      return buttons;
    }

    makeChipGroup('projects-filter-kind', 'kind', [
      { value: 'all', label: 'All' },
      { value: 'personal', label: 'Personal' },
      { value: 'hackathon', label: 'Hackathon' }
    ]);

    makeChipGroup('projects-filter-platform', 'platform', [
      { value: 'all', label: 'Any platform' },
      { value: 'iOS', label: 'iOS' },
      { value: 'visionOS', label: 'visionOS' },
      { value: 'Web', label: 'Web' }
    ]);

    var prizeBtn = qs('projects-filter-prize');
    prizeBtn.setAttribute('aria-pressed', 'false');
    prizeBtn.addEventListener('click', function () {
      state.prize = !state.prize;
      prizeBtn.setAttribute('aria-pressed', String(state.prize));
      applyFilters();
    });

    qs('projects-filter-clear').addEventListener('click', function () {
      state.kind = 'all';
      state.platform = 'all';
      state.prize = false;
      document.querySelectorAll('#projects-filter-kind button, #projects-filter-platform button').forEach(function (btn, i) {
        btn.setAttribute('aria-pressed', btn.textContent === 'All' || btn.textContent === 'Any platform' ? 'true' : 'false');
      });
      prizeBtn.setAttribute('aria-pressed', 'false');
      applyFilters();
    });

    applyFilters();
  }

  /* ---------------- Detail page ---------------- */

  function initDetail(data) {
    var contentEl = qs('project-detail-content');
    var notFoundEl = qs('project-detail-notfound');
    if (!contentEl || !notFoundEl) return;

    var params = new URLSearchParams(window.location.search);
    var slug = params.get('slug');
    var index = data.findIndex(function (p) { return p.slug === slug; });

    if (index === -1) {
      notFoundEl.hidden = false;
      return;
    }

    var project = data[index];

    document.title = project.title + ' — Romy Ilano';
    var metaDesc = qs('project-meta-description');
    if (metaDesc) metaDesc.setAttribute('content', project.line);

    qs('project-num').textContent = project.num;
    qs('project-meta').textContent = project.year + ' · ' + project.meta;
    qs('project-title').textContent = project.title;

    var badges = qs('project-badges');
    project.platforms.forEach(function (platform) {
      var badge = el('span', 'project-card__badge');
      badge.textContent = platform;
      badges.appendChild(badge);
    });
    if (project.prize) {
      var prizeBadge = el('span', 'project-card__badge project-detail__badge--prize');
      prizeBadge.textContent = '✦ ' + project.prize;
      badges.appendChild(prizeBadge);
    }

    qs('project-media').appendChild(buildMedia(project, { index: index, eager: true }));
    qs('project-description').textContent = project.description;

    var tagsEl = qs('project-tags');
    project.tags.forEach(function (tag) {
      var li = el('li', 'project-card__tag');
      li.textContent = tag;
      tagsEl.appendChild(li);
    });

    var linksEl = qs('project-links');
    var links = project.links.slice();
    if (project.href) {
      links.unshift({ label: 'Open ↗', href: externalHref(project) });
    }
    links.forEach(function (link, i) {
      var li = document.createElement('li');
      var a = el('a', 'project-card__link' + (i > 0 ? ' project-card__link--secondary' : ''), {
        href: link.href,
        target: '_blank',
        rel: 'noopener noreferrer'
      });
      a.textContent = link.label;
      li.appendChild(a);
      linksEl.appendChild(li);
    });

    var prevProject = data[(index - 1 + data.length) % data.length];
    var nextProject = data[(index + 1) % data.length];
    var prevLink = qs('project-prev-link');
    var nextLink = qs('project-next-link');
    prevLink.href = projectHref(prevProject);
    qs('project-prev-title').textContent = prevProject.title;
    nextLink.href = projectHref(nextProject);
    qs('project-next-title').textContent = nextProject.title;

    contentEl.hidden = false;
  }

  function init() {
    var data = window.PROJECTS_DATA || [];
    initListing(data);
    initDetail(data);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
