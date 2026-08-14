document.querySelectorAll("[data-code]").forEach(element => {
    fetch(element.dataset.code)
        .then(response => response.text())
        .then(code => {
            element.textContent = code;
        }
    );
});

function goToTop(event, link) {
    event.preventDefault();
    const preventScroll = (event) => { event.preventDefault(); };

    window.addEventListener("wheel", preventScroll, { passive: false });
    window.addEventListener("touchmove", preventScroll, { passive: false });
    window.addEventListener("keydown", preventScroll);

    window.scrollTo({top: 0, behavior: "smooth"});

    function waitForTop() {
        if (window.scrollY <= 1) {
            setTimeout(() => {
                window.removeEventListener("wheel", preventScroll);
                window.removeEventListener("touchmove", preventScroll);
                window.removeEventListener("keydown", preventScroll);

                window.location.href = link.href;
            }, 500);
            return;
        }
        requestAnimationFrame(waitForTop);
    }

    waitForTop();
}

(function () {
    const logo = document.getElementById('logo');
    if (!logo) return;

    let ticking = false;

    function update() {
        ticking = false;
        const progress = Math.max(0, Math.min(1, 1 - window.scrollY / 250));
        logo.style.opacity = progress;
        logo.style.transform = 'scale(' + (0.95 + progress * 0.05) + ')';
    }

    window.addEventListener('scroll', function () {
        if (!ticking) {
            ticking = true;
            requestAnimationFrame(update);
        }
    }, { passive: true });

    update();
})();