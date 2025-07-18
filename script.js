// ==UserScript==
// @name        Window, Fullscreen, and Copy Spoofer
// @namespace   spoofers
// @version     1.0
// @description Spoofs window visibility, focus, fullscreen, and console detection. Allows copying. Always active.
// @author      Zigao Wang
// @match       *
// @grant       none
// ==/UserScript==

(function() {
    'use strict';

    const fakeFullscreenElement = document.documentElement;

    // Spoof Visibility API
    Object.defineProperty(document, 'hidden', { get: () => false, configurable: true });
    Object.defineProperty(document, 'visibilityState', { get: () => 'visible', configurable: true });

    // Block visibilitychange
    document.addEventListener('visibilitychange', (e) => {
        e.stopImmediatePropagation();
        e.preventDefault();
    }, true);

    // Spoof Focus API
    document.hasFocus = () => true;

    // Block blur/focus
    window.addEventListener('blur', (e) => {
        e.stopImmediatePropagation();
        e.preventDefault();
    }, true);

    window.addEventListener('focus', (e) => {
        e.stopImmediatePropagation();
        e.preventDefault();
    }, true);

    window.onblur = () => false;
    window.onfocus = () => true;

    // Spoof console/dev tools detection
    Object.defineProperty(window, 'outerWidth', { get: () => window.innerWidth });
    Object.defineProperty(window, 'outerHeight', { get: () => window.innerHeight });
    console.log = () => {};  // Silence console (comment out if needed)

    // Spoof Fullscreen API
    Object.defineProperty(document, 'fullscreen', { get: () => true, configurable: true });
    Object.defineProperty(document, 'fullscreenElement', { get: () => fakeFullscreenElement, configurable: true });

    Object.defineProperty(document, 'mozFullScreen', { get: () => true, configurable: true });
    Object.defineProperty(document, 'mozFullScreenElement', { get: () => fakeFullscreenElement, configurable: true });

    Object.defineProperty(document, 'webkitFullscreen', { get: () => true, configurable: true });
    Object.defineProperty(document, 'webkitFullscreenElement', { get: () => fakeFullscreenElement, configurable: true });

    Object.defineProperty(document, 'msFullscreen', { get: () => true, configurable: true });
    Object.defineProperty(document, 'msFullscreenElement', { get: () => fakeFullscreenElement, configurable: true });

    // Block fullscreenchange events
    const fullscreenEvents = ['fullscreenchange', 'mozfullscreenchange', 'webkitfullscreenchange', 'MSFullscreenChange'];
    fullscreenEvents.forEach(eventName => {
        document.addEventListener(eventName, (e) => {
            e.stopImmediatePropagation();
            e.preventDefault();
        }, true);
    });

    // Override exit methods
    document.exitFullscreen = () => Promise.resolve();
    document.mozCancelFullScreen = () => Promise.resolve();
    document.webkitExitFullscreen = () => Promise.resolve();
    document.msExitFullscreen = () => Promise.resolve();

    // Allow copying: Re-enable selection, contextmenu, copy/cut
    // Re-enable context menu (right-click)
    document.oncontextmenu = null;
    window.oncontextmenu = null;

    // Re-enable copy/cut/paste events
    ['copy', 'cut', 'paste'].forEach(event => {
        document.addEventListener(event, (e) => {
            e.stopImmediatePropagation();
        }, true);
    });

    // Force-enable text selection via CSS (overrides site's user-select: none)
    const style = document.createElement('style');
    style.innerHTML = `
        * {
            -webkit-user-select: auto !important;
            -moz-user-select: auto !important;
            -ms-user-select: auto !important;
            user-select: auto !important;
        }
    `;
    document.head.appendChild(style);

    // Remove any onselectstart blockers
    document.onselectstart = null;
    document.body.onselectstart = null;

    // Log success
    console.log('Spoofing ACTIVE! Window/fullscreen spoofed, copying allowed.');
})();
