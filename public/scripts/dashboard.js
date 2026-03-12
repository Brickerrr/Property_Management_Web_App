function selectProperty(el) {
  // highlight selected item
  document.querySelectorAll('.property-item').forEach(i => i.classList.remove('active'));
  el.classList.add('active');

  // show matching property group
  const id = el.dataset.id;
  document.querySelectorAll('.property-group').forEach(g => {
    g.classList.toggle('active', g.dataset.id === id);
  });
}