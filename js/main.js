fetch("./data/servicios.json")
    .then(res => res.json())
    .then(data => {

        /* ───── HERO ───── */
        document.getElementById("heroTitle").textContent = data.hero.title;
        document.getElementById("heroDescription").textContent = data.hero.description;

        const heroCta = document.getElementById("heroCta");
        heroCta.textContent = data.hero.ctaText;
        heroCta.href = data.hero.ctaLink;

        /* ───── NOSOTROS ───── */
        document.getElementById("nosotrosTitle").textContent = data.nosotros.title;
        document.getElementById("nosotrosText").textContent = data.nosotros.text;

        /* ───── SERVICIOS ───── */
        document.getElementById("serviciosTitle").textContent = data.servicios.title;
        const serviciosGrid = document.getElementById("serviciosGrid");
        serviciosGrid.innerHTML = "";

        data.servicios.items.forEach((servicio, index) => {
            const card = document.createElement("div");
            card.className = "servicio-card";
            card.style.setProperty("--bg", `url(${servicio.image})`);
            card.setAttribute("data-num", String(index + 1).padStart(2, "0"));

            card.innerHTML = `
                <div class="servicio-content">
                    <span class="servicio-icon">
                        <i class="bi ${servicio.icon}"></i>
                    </span>
                    <h3>${servicio.title}</h3>
                    <p class="servicio-text">${servicio.description}</p>
                    <button class="leer-mas">Leer más</button>
                </div>
            `;

            serviciosGrid.appendChild(card);

            const btn = card.querySelector(".leer-mas");

            btn.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();

                // Cerrar otras tarjetas abiertas
                document.querySelectorAll(".servicio-card.expandida").forEach(c => {
                    if (c !== card) {
                        c.classList.remove("expandida");
                        const otherBtn = c.querySelector(".leer-mas");
                        if (otherBtn) otherBtn.textContent = "Leer más";
                    }
                });

                // Alternar la expansión de la tarjeta actual
                const isExpanded = card.classList.toggle("expandida");

                // Cambiar texto del botón según estado
                btn.textContent = isExpanded ? "Leer menos" : "Leer más";
            });
        });

        /* ───── DIFERENCIALES ───── */
        document.getElementById("diferencialesTitle").textContent = data.diferenciales.title;
        const diferencialesGrid = document.getElementById("diferencialesGrid");
        diferencialesGrid.innerHTML = "";

        data.diferenciales.items.forEach((texto, index) => {
            const card = document.createElement("div");
            card.className = "servicio-card";
            card.setAttribute("data-num", String(index + 1).padStart(2, "0"));

            card.innerHTML = `
                <div class="servicio-content">
                    <p>${texto}</p>
                </div>
            `;

            diferencialesGrid.appendChild(card);
        });

        /* ───── CONTACTO ───── */
        document.getElementById("contactoTitle").textContent = data.contacto.title;
        document.getElementById("contactoText").textContent = data.contacto.text;

        const contactoCta = document.getElementById("contactoCta");
        contactoCta.textContent = data.contacto.ctaText;
        contactoCta.href = data.contacto.ctaLink;

        /* ───── FOOTER ───── */
        document.getElementById("footerText").textContent = data.footer.text;

        /* ───── WHATSAPP ───── */
        document.getElementById("whatsappFloat").href = data.whatsapp.link;

        /* ───── ANIMACIONES ───── */
        document.querySelectorAll(".servicio-card, section h2, section p").forEach(el => {
            el.classList.add("fade-up");
            observer.observe(el);
        });
    })
    .catch(err => console.error(err));


/* ───── MENU MOBILE ───── */
const toggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

toggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
});


/* ───── INTERSECTION OBSERVER ───── */
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });
