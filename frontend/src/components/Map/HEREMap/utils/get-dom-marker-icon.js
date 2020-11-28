/**
 * Map for HTML strings against H.map.DomIcon instances
 */
export const DomIcons = new Map();

/**
 * Returns the DOM Icon for the input HTML string, ensuring that no more
 * than one DOM Icon is created for each HTML string
 * @param html {string} - A string containing the markup to be used as a Dom Icon.
 */
export default function getDomMarkerIcon(html) {
  const H = window.H;
  if (!DomIcons.has(html)) {
    const icon = new H.map.DomIcon(html);
    DomIcons.set(html, icon);
  }

  return DomIcons.get(html);
}
