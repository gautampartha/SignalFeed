import morphdom from 'morphdom';
import {Capacitor} from '@capacitor/core';

// Patch the existing screen. Native scroll layers and focused controls stay mounted.
export function patch(target, html) {
  const next = document.createElement(target.tagName);
  next.innerHTML = html;
  morphdom(target, next, {
    childrenOnly: true,
    getNodeKey: node => node.id || node.dataset?.renderKey,
    onBeforeElUpdated(from, to) {
      if (from.isEqualNode(to)) return false;
      if (from === document.activeElement && from.matches('input,textarea')) {
        to.value = from.value;
      }
      return true;
    },
  });
}

const native = Capacitor.isNativePlatform();
document.documentElement.classList.toggle('native-app', native);
if (native) {
  let frame;
  const resize = () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      const height = Math.round(window.visualViewport?.height || window.innerHeight);
      document.documentElement.style.setProperty('--viewport-height', `${height}px`);
    });
  };
  window.visualViewport?.addEventListener('resize', resize);
  window.addEventListener('resize', resize);
  resize();
}

let appliedTheme;
export function syncTheme(theme) {
  if (appliedTheme === theme) return;
  appliedTheme = theme;
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#15221d' : '#ffffff';
  if (native) {
    import('@capacitor/status-bar').then(({StatusBar, Style}) =>
      StatusBar.setStyle({style: theme === 'dark' ? Style.Dark : Style.Light})
    ).catch(() => {});
  }
}
