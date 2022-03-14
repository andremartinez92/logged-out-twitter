function waitForElement(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(_mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

function waitForHtmlStyleChange(selector) {
    return new Promise(resolve => {
        if (selector(document.documentElement.style)) {
            return resolve(document.documentElement);
        }

        const observer = new MutationObserver(_mutations => {
            if (selector(document.documentElement.style)) {
                resolve(document.documentElement);
                observer.disconnect();
            }
        });

        observer.observe(document.documentElement, {
            attributes: true,
        });
    });
}

// Remove overlay
waitForElement('[role="group"]').then((element) => {
    element.parentNode.removeChild(element);
});

// Remove footer
waitForElement('[id="layers"]').then((element) => {
    element.parentNode.removeChild(element);
});

// Allow scroll
waitForHtmlStyleChange((style) => style.overflow === 'hidden').then((element) => {
    element.style.removeProperty('overflow');
})
