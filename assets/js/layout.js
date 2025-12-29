(async function () {
    await load("header-placeholder", "header.html");
    await load("footer-placeholder", "footer.html");

    // Now load main.js dynamically AFTER header/footer exist
    loadScript("assets/js/main.js");
})();

function load(id, file) {
    return fetch(file)
        .then(res => {
            if (!res.ok) throw new Error(file + " not found");
            return res.text();
        })
        .then(html => {
            const el = document.getElementById(id);
            if (el) el.innerHTML = html;
        });
}

function loadScript(src) {
    const script = document.createElement("script");
    script.src = src;
    script.defer = true;
    document.body.appendChild(script);
}