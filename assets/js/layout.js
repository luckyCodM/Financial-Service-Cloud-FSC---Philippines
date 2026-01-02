(async function () {
    try {
      // Load Header
      await loadHTML("header-placeholder", "header.html");
  
      // Load Footer
      await loadHTML("footer-placeholder", "footer.html");
  
      // Load main.js ONLY after header & footer exist
      const mainScript = document.createElement("script");
      mainScript.src = "assets/js/main.js";
      mainScript.onload = () => {
        // Initialize AOS again (important for dynamically loaded layout)
        if (typeof AOS !== "undefined") {
          AOS.init({
            once: true,
            duration: 800,
            easing: "ease-in-out"
          });
        }
  
        // Initialize custom page scripts safely
        initBadgeTabs();
      };
      document.body.appendChild(mainScript);
  
    } catch (error) {
      console.error("Layout load failed:", error);
    }
  })();
  
  // Utility function to load HTML into placeholder
  async function loadHTML(id, file) {
    const el = document.getElementById(id);
    if (!el) return;
  
    const res = await fetch(file);
    if (!res.ok) throw new Error(`Failed to load ${file}`);
    el.innerHTML = await res.text();
  }
  
  // Custom JS (moved from inline HTML)
  function initBadgeTabs() {
    const tabs = document.querySelectorAll("#badgeTabs .list-group-item");
    const categories = document.querySelectorAll(".badge-category");
  
    if (!tabs.length || !categories.length) return;
  
    tabs.forEach(tab => {
      tab.addEventListener("click", function () {
        tabs.forEach(t => t.classList.remove("active-badge"));
        this.classList.add("active-badge");
  
        categories.forEach(cat => cat.classList.remove("active"));
        const target = this.getAttribute("data-target");
        document.getElementById(target)?.classList.add("active");
      });
    });
  }
  