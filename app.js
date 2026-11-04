'use strict';

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const menuToggle = $('.menu-toggle');
const nav = $('#main-nav');
function closeMenu() { nav.classList.remove('open'); menuToggle.setAttribute('aria-expanded', 'false'); menuToggle.setAttribute('aria-label', 'Open navigation'); }
menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') !== 'true';
  nav.classList.toggle('open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});
$$('a', nav).forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
document.addEventListener('click', event => { if (!event.target.closest('.site-header')) closeMenu(); });
window.matchMedia('(min-width: 901px)').addEventListener('change', event => { if (event.matches) closeMenu(); });

const systems = {
  ingredients: { image: 'assets/guide-detail.webp', alt: 'Sauces and dressings from the Food Hacking Guide', title: 'Big flavor. Better building blocks.', copy: 'Pick a dressing you already enjoy. Change one ingredient at a time and keep the version you like.' },
  prep: { image: 'assets/meal-prep.webp', alt: 'A meal prep container with chicken, rice, avocado, and vegetables', title: 'A little prep. A lot less friction.', copy: 'Prepare a few components together, then combine them into different meals instead of starting from scratch.' },
  containers: { image: 'assets/food-hack.webp', alt: 'Stackable food containers organized in a refrigerator', title: 'Make your setup part of the solution.', copy: 'Choose containers around your portions, storage space, and reheating needs. Keep matching lids and bases together.' },
  transport: { image: 'assets/transport.webp', alt: 'A portable electric cooler for food transport', title: 'Your kitchen isn’t the finish line.', copy: 'Plan for packing, keeping food appropriately chilled, reheating, and eating. Match your gear to the trip.' }
};
const tabs = $$('.system-tab');
function selectSystem(key, focus = false) {
  const data = systems[key];
  tabs.forEach(tab => { const active = tab.dataset.system === key; tab.classList.toggle('active', active); tab.setAttribute('aria-selected', String(active)); tab.tabIndex = active ? 0 : -1; if (active && focus) tab.focus(); });
  $('#system-panel').setAttribute('aria-labelledby', `tab-${key}`);
  $('#system-image').src = data.image; $('#system-image').alt = data.alt;
  $('#system-panel-title').textContent = data.title; $('#system-panel-copy').textContent = data.copy;
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectSystem(tab.dataset.system));
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next !== undefined) { event.preventDefault(); selectSystem(tabs[next].dataset.system, true); }
  });
});

const filters = $$('.filter');
filters.forEach(button => button.addEventListener('click', () => {
  const key = button.dataset.filter;
  filters.forEach(filter => { const active = filter === button; filter.classList.toggle('active', active); filter.setAttribute('aria-pressed', String(active)); });
  let visible = 0;
  $$('.hack-card').forEach(card => { card.hidden = key !== 'all' && card.dataset.category !== key; if (!card.hidden) visible++; });
  $('#filter-status').textContent = key === 'all' ? `Showing all ${visible} food hacks` : `Showing ${visible} ${button.textContent.toLowerCase()} food hack`;
}));

const articles = {
  ingredients: { category: 'INGREDIENTS', title: 'START WITH THE SAUCE. KEEP THE FLAVOR.', body: `<p>A condiment is a manageable place to start food hacking. You use it often, a small change is easy to try, and you can keep the rest of your meal familiar.</p><h3>Pick one thing you already love.</h3><p>Choose a dressing, dip, or sauce you reach for regularly. Write down what makes you like it: creamy texture, acidity, heat, sweetness, or a particular herb.</p><h3>Change one ingredient at a time.</h3><ul><li>Read the ingredient list and choose one part you want to rethink.</li><li>Make a small test batch. Adjust one thing, taste it, and take a note.</li><li>Try it with the food you actually eat, rather than only tasting it on its own.</li><li>Keep the version you enjoy. A swap only earns a place in your routine if you want to use it again.</li></ul><p>The free <em>Bad Condiments Made Good</em> ebook is the next place to explore dressings and condiments with Food for Hustlers.</p>` },
  prep: { category: 'MEAL PREP', title: 'PREP THE PARTS. MIX UP THE MEALS.', body: `<p>You don’t need an ambitious new menu to make prep useful. Start with a few flexible parts that can become more than one meal.</p><h3>Build a small component list.</h3><ul><li>Choose a protein you enjoy, a grain or other base, and vegetables you’ll actually use.</li><li>Pick a dressing or sauce that gives those components a different direction.</li><li>Check your calendar before shopping. Prep for the meals you expect to need, not an imaginary perfect week.</li></ul><h3>Reduce the repeat work.</h3><p>Group similar jobs together: wash the produce, cut the ingredients, and set up the containers. Label what you prepare and follow appropriate storage and reheating guidance for each food.</p><h3>Leave yourself options.</h3><p>Store components separately where practical. Build a bowl one day and a wrap the next. Start with a routine small enough to repeat, then adjust based on what you actually eat.</p>` },
  containers: { category: 'CONTAINERS', title: 'YOUR CONTAINERS ARE PART OF THE PLAN.', body: `<p>A stack of mismatched tubs can turn a simple lunch into a project. Choose a small set around your meals and your day.</p><h3>Start with the meal, not the container.</h3><ul><li>Check portion space, bag dimensions, fridge shelves, and how you reheat.</li><li>Choose lids that seal properly and are easy to match to their bases.</li><li>Use a separate small container for dressing, sauce, or ingredients you want to keep crisp.</li><li>Check the manufacturer’s instructions for food contact, freezing, microwaving, and cleaning.</li></ul><h3>Make the reset easy.</h3><p>Keep clean containers and matching lids together. Give packed meals an obvious place in the fridge. The goal is to make packing tomorrow’s food an easy step, rather than another thing to solve.</p><p>Try your current setup before buying more. Notice the exact point where it becomes inconvenient, then solve that problem.</p>` },
  transport: { category: 'ON THE GO', title: 'GOOD FOOD NEEDS A WAY TO GET THERE.', body: `<p>Your food system has to work after you leave the kitchen. Plan the whole journey, from the fridge to the moment you eat.</p><h3>Map your actual day.</h3><ul><li>Where will the food travel, and how long until you eat?</li><li>Will you have access to a fridge and a place to reheat?</li><li>Can your bag hold containers upright, with room for utensils and any cooling equipment?</li><li>If you use powered equipment, check power access and the manufacturer’s operating instructions.</li></ul><h3>Choose gear for the job.</h3><p>An insulated bag, cooling equipment, or a portable electric cooler may suit different routines. Keep perishable food appropriately chilled and follow food-specific storage guidance. An ordinary bag alone does not keep food safely cold.</p><h3>Do a packing rehearsal.</h3><p>Try the complete setup before a demanding workday. Check the fit, the weight, and whether you can easily get to what you need. Fix the awkward part before it becomes a daily frustration.</p><p>The cooler shown on this site is an image retained from the original Food for Hustlers website; it is not a product listing or a claim of brand affiliation.</p>` }
};

function openDialog(dialog) { if (!dialog.open) dialog.showModal(); }
$$('[data-open-guide]').forEach(button => button.addEventListener('click', () => openDialog($('#guide-dialog'))));
$$('[data-open-privacy]').forEach(button => button.addEventListener('click', () => openDialog($('#privacy-dialog'))));
$$('dialog').forEach(dialog => {
  $('.modal-close', dialog).addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target !== dialog) return; const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); });
});
document.addEventListener('click', event => {
  const trigger = event.target.closest('[data-article]');
  if (!trigger) return;
  const data = articles[trigger.dataset.article];
  if (!data) return;
  $('#article-category').textContent = data.category;
  $('#article-title').textContent = data.title;
  $('#article-body').innerHTML = data.body;
  openDialog($('#article-dialog'));
});
$('#article-guide').addEventListener('click', () => { $('#article-dialog').close(); openDialog($('#guide-dialog')); });
$('#year').textContent = new Date().getFullYear();

// Design preview only: validate locally, without sending or storing an address.
const newsletterForm = $('#newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', event => {
    event.preventDefault();
    $('#newsletter-status').textContent = 'This form is a preview. Newsletter signup is not connected yet; your email has not been submitted.';
  });
  $('#newsletter-submit').disabled = false;
}
