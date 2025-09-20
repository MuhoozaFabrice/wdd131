/* place.js
 - sets footer year & last modified
 - computes wind chill using calculateWindChill(temp, wind)
 - shows "N/A" when not applicable per spec
*/

/**
 * calculateWindChill: returns wind chill for metric (°C, km/h) in one line.
 * Formula: 13.12 + 0.6215 T - 11.37 v^0.16 + 0.3965 T v^0.16
 * Must be a single return expression.
 *
 * @param {number} temp - temperature in °C
 * @param {number} wind - wind speed in km/h
 * @returns {number} - wind chill in °C (as a Number, not formatted); caller may format
 */
function calculateWindChill(temp, wind) {
  return 13.12 + 0.6215 * temp - 11.37 * Math.pow(wind, 0.16) + 0.3965 * temp * Math.pow(wind, 0.16);
}

/* DOM content load */
document.addEventListener('DOMContentLoaded', () => {
  // Footer year and last modified time
  const yearEl = document.getElementById('year');
  const lastModEl = document.getElementById('lastModified');

  if (yearEl) yearEl.textContent = new Date().getFullYear();
  if (lastModEl) {
    const raw = document.lastModified || '';
    lastModEl.textContent = raw;
    // also set datetime attribute (best-effort — document.lastModified may be locale string)
    try {
      const dt = new Date(document.lastModified);
      if (!isNaN(dt)) lastModEl.setAttribute('datetime', dt.toISOString());
    } catch (e) {
      // ignore
    }
  }

  // Weather static values (as required by assignment)
  // These should match the visible numbers in the HTML
  const tempEl = document.getElementById('temp');
  const windEl = document.getElementById('wind');
  const windChillEl = document.getElementById('windchill');

  // Read the static values from the DOM (or fallback to defaults)
  const T = tempEl ? parseFloat(tempEl.textContent) : 9;  // °C
  const V = windEl ? parseFloat(windEl.textContent) : 15; // km/h

  // Conditions for viable wind chill calculation (metric):
  // Temperature <= 10 °C && Wind speed > 4.8 km/h
  const viableMetric = (T <= 10 && V > 4.8);

  if (windChillEl) {
    if (viableMetric) {
      // calculate & format to 1 decimal place
      const wc = calculateWindChill(T, V);
      // If result is NaN for any reason fallback to N/A
      windChillEl.textContent = Number.isFinite(wc) ? `${wc.toFixed(1)} °C` : 'N/A';
    } else {
      windChillEl.textContent = 'N/A';
    }
  }
});
