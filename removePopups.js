const treeConfig = { childList: true, subtree: true };
// Config used to observe the top-most HTML tag
const htmlConfig = { attributes: true, attributeFilter: ['style'] };

const removeOverlay = () => {
    const overlay = document.querySelector(['[role="group"]']);
    if(overlay) {
        overlay.parentNode.removeChild(overlay);
    }
};

const removeFooter = () => {
    const footer = document.querySelector(['[id="layers"]']);
    if(footer) {
        footer.parentNode.removeChild(footer);
    }
}

const removeOverflowStyle = () => {
    const overflowStyle = document.documentElement.style.overflow;
    if(overflowStyle === 'hidden') {
        document.documentElement.style.removeProperty('overflow');
    }
}

const removePositionStyle = () => {
    const documentStyle = document.documentElement.style;
    if(!!documentStyle.position) {
        documentStyle.removeProperty('position');
    }
}

const removeMobileLogin = () => {
    const loginButton = document.querySelector('[data-testid="login"]');
    if(loginButton) {
        const parentDiv = loginButton.parentNode.parentNode.parentNode;
        parentDiv.parentNode.removeChild(parentDiv);
    }
}

const treeObserverCallback = (_mutations, _observer) => {
    removeOverlay();
    removeFooter();
    removeMobileLogin();
}

const treeObserver = new MutationObserver(treeObserverCallback);
treeObserver.observe(document.body, treeConfig);

const htmlObserverCallback = (_mutations, _observer) => {
    removeOverflowStyle();
    removePositionStyle();
}

const htmlObserver = new MutationObserver(htmlObserverCallback);
htmlObserver.observe(document.documentElement, htmlConfig);
