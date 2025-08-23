// src/utils/gtm.js
export function gtmPageview(path) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'pageview',
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}

// Optional helper for custom events
export function gtmEvent(event, params = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}
