document.addEventListener("DOMContentLoaded", () => {
    
    // LOADER avec sécurité
    const removeLoader = () => {
        const loader = document.getElementById('loader-wrapper');
        if(loader) { 
            loader.style.opacity = '0'; 
            loader.style.visibility = 'hidden'; 
            initCanvas(); 
        }
    };
    window.addEventListener('load', () => setTimeout(removeLoader, 800));
    setTimeout(removeLoader, 3000); 

    if (typeof config === 'undefined') { console.error("Config missing"); return; }
    const escapeHTML = (str) => { if (!str) return ''; return String(str).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m])); };

    // THEME
    const themeBtn = document.getElementById("theme-toggle");
    const body = document.body;
    if (localStorage.getItem("theme") === "light") { body.classList.add("light-mode"); if(themeBtn) themeBtn.innerText = "🌙"; }
    if (themeBtn) { themeBtn.addEventListener("click", () => { body.classList.toggle("light-mode"); const isLight = body.classList.contains("light-mode"); themeBtn.innerText = isLight ? "🌙" : "☀️"; localStorage.setItem("theme", isLight ? "light" : "dark"); }); }

    // DATA
    document.title = `${config.profile.name} | Portfolio`;
    const safeSet = (id, val) => { const el = document.getElementById(id); if(el) el.innerText = val; };
    const avatar = document.getElementById("profile-avatar"); if(avatar) avatar.src = config.profile.avatar;
    safeSet("profile-name", config.profile.name);
    safeSet("profile-status", config.profile.status);
    safeSet("profile-bio", config.profile.bio);
    const footerCopy = document.getElementById("footer-copy");
    if(footerCopy) footerCopy.innerHTML = `&copy; ${new Date().getFullYear()} ${escapeHTML(config.profile.name)}`;

    // SOCIAL SIDEBAR
    const sidebarSocial = document.getElementById("sidebar-social-container");
    if(sidebarSocial && config.social) {
        if(config.social.github) sidebarSocial.innerHTML += `<a href="${config.social.github}" target="_blank" class="social-mini-btn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg></a>`;
        if(config.social.linkedin) sidebarSocial.innerHTML += `<a href="${config.social.linkedin}" target="_blank" class="social-mini-btn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></a>`;
    }

    // NAV SIDEBAR
    const navList = document.getElementById("nav-list");
    const icons = { "Accueil": "🏠", "A Propos": "👤", "Projets": "💻", "Procédures": "📄", "Parcours": "🚀", "Compétences": "🧠", "Certifs": "🏆", "Veille": "📔", "Contact": "✉️" };

    if(navList && config.navigation) {
        config.navigation.forEach(item => {
            const li = document.createElement("li");
            const a = document.createElement("a");
            const icon = icons[item.title] || "•";
            a.innerHTML = `<span class="nav-icon">${icon}</span> ${item.title}`;
            if (item.link === "#contact") {
                a.href = "#"; a.addEventListener("click", (e) => { e.preventDefault(); openContact(); document.getElementById("app-sidebar").classList.remove("active"); });
            } else { 
                a.href = item.link; a.addEventListener("click", () => { document.getElementById("app-sidebar").classList.remove("active"); });
            }
            li.appendChild(a); navList.appendChild(li);
        });
    }

    // MOBILE TOGGLE
    const mobileBtn = document.getElementById("mobile-toggle-btn");
    const sidebar = document.getElementById("app-sidebar");
    if(mobileBtn) { mobileBtn.addEventListener("click", (e) => { e.stopPropagation(); sidebar.classList.toggle("active"); }); }
    document.addEventListener("click", (e) => { if(sidebar.classList.contains("active") && !sidebar.contains(e.target) && e.target !== mobileBtn) { sidebar.classList.remove("active"); } });

    // SKILLS HERO
    const skillsContainer = document.getElementById("skills-section");
    if(skillsContainer && config.skills) { config.skills.forEach(s => { const span = document.createElement("span"); span.className = "hero-tag"; span.style.marginRight = "10px"; span.innerText = s; skillsContainer.appendChild(span); }); }

    const path = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);
    const baseUrl = `${window.location.origin}${path}documents/`;

    // PROJETS & PROCEDURES
    const createCard = (item, index, containerId, isProcedure = false) => {
        const container = document.getElementById(containerId);
        if(!container) return;
        const vid = `viewer_${isProcedure ? 'proc' : 'proj'}_${index}`;
        const div = document.createElement("div");
        div.className = isProcedure ? "procedure-card-wrapper fade-in-up" : "project-card fade-in-up";
        div.style.animationDelay = `${index * 0.1}s`;
        
        let tags = "";
        if(item.tags) item.tags.forEach(t => tags += `<span class="project-tag">#${escapeHTML(t)}</span>`);
        const icon = item.icon ? item.icon : (isProcedure ? "📄" : "💻");

        div.innerHTML = `
            <button class="info-btn" title="Détails">i</button>
            <div class="card-header" onclick="togglePDF('${vid}', '${baseUrl + item.path}', this)">
                <div class="meta">
                    <div style="font-size:2rem;margin-bottom:10px;">${icon}</div>
                    <h4>${escapeHTML(item.title)}</h4>
                    <p>${escapeHTML(item.description)}</p>
                    <div class="tags-container">${tags}</div>
                </div>
            </div>
            <div id="${vid}" class="pdf-container"></div>
        `;
        div.querySelector(".info-btn").addEventListener("click", (e) => { e.stopPropagation(); openProjectModal(item); });
        container.appendChild(div);
    };

    if (config.projects) config.projects.forEach((p, i) => createCard(p, i, "project-grid"));
    if (config.procedures) config.procedures.forEach((p, i) => createCard(p, i, "procedures-list", true));

    // PARCOURS
    const expList = document.getElementById("exp-list");
    if(expList && config.experiences) {
        config.experiences.forEach(exp => {
            const li = document.createElement("li"); li.className = "timeline-item fade-in-up";
            li.innerHTML = `<span class="timeline-date">${escapeHTML(exp.date)}</span><div class="timeline-title">${escapeHTML(exp.role)} @ ${escapeHTML(exp.company)}</div><div class="timeline-desc">${escapeHTML(exp.description)}</div>`;
            expList.appendChild(li);
        });
    }

    // COMPETENCES
    const compList = document.getElementById("comp-list");
    if(compList && config.competences) {
        config.competences.forEach((item, i) => {
            const li = document.createElement("li"); li.className = "comp-card-container fade-in-up";
            const details = item.details.map(d => `<li>→ ${escapeHTML(d)}</li>`).join('');
            li.innerHTML = `
                <div class="comp-header" onclick="toggleComp(this)"><span>${escapeHTML(item.icon)}</span><span>${escapeHTML(item.name)}</span><span class="comp-arrow">▼</span></div>
                <ul class="comp-dropdown-menu">${details}</ul>
            `;
            compList.appendChild(li);
        });
    }
    const certList = document.getElementById("cert-list");
    if(certList && config.certifications) {
        config.certifications.forEach(item => {
            const li = document.createElement("li"); li.className = "cert-card-container fade-in-up";
            li.innerHTML = `<div class="comp-header"><span>🏆</span><div><span style="display:block;font-weight:700;">${escapeHTML(item.name)}</span><span style="font-size:0.8rem;opacity:0.7;">${escapeHTML(item.issuer)}</span></div></div>`;
            certList.appendChild(li);
        });
    }

    // UTILS
    document.querySelectorAll(".close-btn-abs").forEach(btn => btn.addEventListener("click", () => document.querySelectorAll(".modal-overlay").forEach(m => m.style.display="none")));
    document.querySelectorAll(".close-btn").forEach(btn => btn.addEventListener("click", () => document.querySelectorAll(".modal-overlay").forEach(m => m.style.display="none")));

    // MENTIONS LEGALES
    document.getElementById("legal-trigger")?.addEventListener("click", (e) => { e.preventDefault(); document.getElementById("legal-modal").style.display="flex"; });
    document.getElementById("legal-trigger-desktop")?.addEventListener("click", (e) => { e.preventDefault(); document.getElementById("legal-modal").style.display="flex"; });

    document.getElementById("contact-trigger-hero")?.addEventListener("click", () => openContact());
    window.onclick = (e) => { if(e.target.classList.contains("modal-overlay")) e.target.style.display="none"; };
    
    const observer = new IntersectionObserver((entries) => { entries.forEach(e => { if(e.isIntersecting) e.target.style.animationPlayState = "running"; }); });
    document.querySelectorAll('.fade-in-up').forEach(el => { el.style.animationPlayState = "paused"; observer.observe(el); });

    const typeArea = document.getElementById("typewriter-area");
    if(typeArea && config.profile.typewriterText) { let i=0; const txt = config.profile.typewriterText; typeArea.innerText=""; const type = () => { if(i<txt.length) { typeArea.textContent+=txt.charAt(i); i++; setTimeout(type,50); }}; setTimeout(type,1000); }

    // SCROLL SPY
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".sidebar-nav ul li a");
    const scrollSpy = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute("id");
                if(!id) return;
                navLinks.forEach(link => {
                    link.classList.remove("active-link");
                    if (link.getAttribute("href") === `#${id}`) {
                        link.classList.add("active-link");
                    }
                });
            }
        });
    }, { rootMargin: "-30% 0px -70% 0px" });
    sections.forEach(section => scrollSpy.observe(section));

    // FORM
    const footerForm = document.getElementById("footer-form");
    if(footerForm) {
        footerForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const btn = footerForm.querySelector("button");
            const originalText = btn.innerText;
            btn.innerText = "Envoyé !";
            btn.style.background = "#10b981"; 
            setTimeout(() => { btn.innerText = originalText; btn.style.background = ""; footerForm.reset(); }, 3000);
        });
    }

    // BACK TO TOP
    const backToTopBtn = document.getElementById("back-to-top");
    if(backToTopBtn) {
        window.addEventListener("scroll", () => { if (window.scrollY > 300) { backToTopBtn.classList.add("show"); } else { backToTopBtn.classList.remove("show"); } });
        backToTopBtn.addEventListener("click", () => { window.scrollTo({ top: 0, behavior: "smooth" }); });
    }


    /* ================================================================
       🍌 MODE SINGE INDESTRUCTIBLE (TAPEZ "SINGE") 🍌
       ================================================================ */
    const secretKey = "singe";
    let pressed = "";
    let monkeyModeActive = false;
    
    // SOURCES D'IMAGES WIKIMEDIA (Fiabilité 100% - Pas de blocage)
    const reliableMonkeyImages = [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Bonnet_macaque_%28Macaca_radiata%29_Photograph_By_Shantanu_Kuveskar.jpg/640px-Bonnet_macaque_%28Macaca_radiata%29_Photograph_By_Shantanu_Kuveskar.jpg", // Macaque
        "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Papio_anubis_%28Serengeti%2C_2009%29.jpg/640px-Papio_anubis_%28Serengeti%2C_2009%29.jpg", // Babouin
        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Blue_monkey_%28Cercopithecus_mitis_stuhlmanni%29_Kakamega.jpg/640px-Blue_monkey_%28Cercopithecus_mitis_stuhlmanni%29_Kakamega.jpg", // Singe bleu
        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Chimpanzee-Head.jpg/506px-Chimpanzee-Head.jpg", // Chimpanzé
        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Orang_Utan%2C_Semenggoh_Nature_Reserve%2C_Sarawak%2C_Borneo%2C_Malaysia.JPG/640px-Orang_Utan%2C_Semenggoh_Nature_Reserve%2C_Sarawak%2C_Borneo%2C_Malaysia.JPG" // Orang Outan
    ];

    window.addEventListener("keydown", (e) => {
        pressed += e.key.toLowerCase();
        if(pressed.length > secretKey.length) pressed = pressed.slice(-secretKey.length);
        
        if(pressed === secretKey && !monkeyModeActive) {
            monkeyModeActive = true;
            alert("🍌 ACTIVATION DU PROTOCOLE BANANE ! 🍌");

            // 1. INJECTION CSS (Styles forcés)
            const style = document.createElement('style');
            style.innerHTML = `
                @import url('https://fonts.googleapis.com/css2?family=Creepster&family=Comic+Neue:wght@700&display=swap');
                
                :root { --bg-color: #0f2812 !important; --card-bg: #2d5a27 !important; --text-main: #ffee00 !important; --accent: #ff0000 !important; }
                
                body {
                    /* JUNGLE WALLPAPER (Source Wikimedia Commons fiable) */
                    background-image: url('https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Rainforest_Fatu_Hiva.jpg/1280px-Rainforest_Fatu_Hiva.jpg') !important;
                    background-size: cover !important;
                    background-attachment: fixed !important;
                    font-family: 'Comic Neue', cursive !important;
                    /* CURSEUR BANANE SVG DATA URI (Aucun téléchargement requis) */
                    cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><text y="20" font-size="20">🍌</text></svg>'), auto !important;
                }
                
                .project-card, .procedure-card-wrapper, .sidebar { border: 4px dashed #ffee00 !important; transform: rotate(-1deg); }
                h1, h2, h3 { font-family: 'Creepster', cursive !important; text-transform: uppercase; color: #ff0000 !important; text-shadow: 2px 2px 0px yellow; }
                
                /* FORCE L'AFFICHAGE DES IMAGES */
                .monkey-img-override {
                    content: normal !important; /* Reset content */
                    width: 100% !important;
                    height: 100% !important;
                    object-fit: cover !important;
                    border-radius: 20px !important;
                    border: 3px solid yellow !important;
                    background: transparent !important;
                }
                
                @keyframes shake { 0% { transform: translate(1px, 1px) rotate(0deg); } 50% { transform: translate(-1px, 2px) rotate(-1deg); } 100% { transform: translate(1px, -2px) rotate(-1deg); } }
                .shake-active { animation: shake 0.5s; }
            `;
            document.head.appendChild(style);

            // 2. DICTIONNAIRE DE CRIS (MODIFIÉ)
            const monkeyDict = {
                "Accueil": "MA BRANCHE", "A Propos": "MOI TARZAN", "Projets": "MES BANANES",
                "Contact": "HURLER ICI", "Rémi": "ROI LOUIE", "Christophe": "KONG",
                "Développeur": "MANGEUR DE POUX", "Système": "JUNGLE", "Réseau": "LIANES", "Admin": "CHEF DE MEUTE"
            };

            function walkText(node) {
                if (node.nodeType == 3) { 
                    let text = node.data;
                    Object.keys(monkeyDict).forEach(key => { text = text.replace(new RegExp(key, "gi"), monkeyDict[key]); });
                    if(Math.random() > 0.7 && text.trim().length > 5) text += " (OUUUH AH AH !)";
                    node.data = text;
                }
                if (node.nodeType == 1 && node.nodeName != "SCRIPT" && node.nodeName != "STYLE") {
                    for (let i = 0; i < node.childNodes.length; i++) walkText(node.childNodes[i]);
                }
            }
            walkText(document.body);

            // 3. REMPLACEMENT IMAGES BLINDÉ (Avec gestion d'erreur)
            document.querySelectorAll("img, svg").forEach(img => {
                // Ignore l'image si c'est déjà une banane de curseur ou de pluie
                if(img.classList.contains('banana-rain')) return;

                // Création d'une nouvelle image pour remplacer (plus fiable que de changer src sur certaines balises)
                const newImg = document.createElement('img');
                const randomSrc = reliableMonkeyImages[Math.floor(Math.random() * reliableMonkeyImages.length)];
                
                newImg.src = randomSrc;
                newImg.className = img.className + " monkey-img-override"; // Garde les classes de layout
                newImg.alt = "Singe";
                
                // Si c'est un SVG (icônes), on remplace carrément le noeud
                if(img.tagName === 'svg') {
                    newImg.style.width = "30px";
                    newImg.style.height = "30px";
                    img.parentNode.replaceChild(newImg, img);
                } else {
                    // Si c'est une image normale
                    img.src = randomSrc;
                    img.srcset = ""; // TUE le responsive qui remet les anciennes images
                    img.classList.add('monkey-img-override');
                    
                    // Gestion d'erreur ultime : si l'image plante, on met une banane
                    img.onerror = function() {
                        this.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Bananas.svg/640px-Bananas.svg.png";
                    };
                }
            });

            // 4. TRAINÉE DE SOURIS BANANE
            document.addEventListener('mousemove', (e) => {
                if(Math.random() > 0.85) {
                    const b = document.createElement("div");
                    b.innerText = "🍌";
                    b.style.position = "fixed"; b.style.left = e.clientX + "px"; b.style.top = e.clientY + "px";
                    b.style.pointerEvents = "none"; b.style.fontSize = "20px"; b.style.zIndex = "10000";
                    b.style.transition = "transform 1s, opacity 1s";
                    document.body.appendChild(b);
                    setTimeout(() => { b.style.transform = "translateY(50px) rotate(180deg)"; b.style.opacity = "0"; }, 10);
                    setTimeout(() => b.remove(), 1000);
                }
            });

            // 5. CHAOS ENGINE : PLUIE ET TREMBLEMENTS
            setInterval(() => {
                const b = document.createElement("div");
                const things = ["🍌", "🥥", "🐒", "🌴", "💩"];
                b.className = "banana-rain"; // Marqueur pour ne pas être remplacé
                b.innerText = things[Math.floor(Math.random() * things.length)];
                b.style.position = "fixed"; b.style.left = Math.random() * 100 + "vw"; b.style.top = "-50px";
                b.style.fontSize = (Math.random() * 50 + 20) + "px"; b.style.zIndex = "99999"; b.style.pointerEvents = "none";
                b.style.transition = `top ${Math.random() * 2 + 1}s linear`;
                document.body.appendChild(b);
                requestAnimationFrame(() => { b.style.top = "110vh"; });
                setTimeout(() => b.remove(), 3000);

                if(Math.random() > 0.95) { document.body.classList.add("shake-active"); setTimeout(() => document.body.classList.remove("shake-active"), 500); }
            }, 80);
        }
    });
});

// FUNCTIONS
function initCanvas() {
    const canvas = document.getElementById("bg-canvas"); if(!canvas) return; const ctx = canvas.getContext("2d");
    let width, height, particles;
    const resize = () => { width = canvas.width = window.innerWidth; height = canvas.height = window.innerHeight; };
    class Particle { constructor(){this.x=Math.random()*width;this.y=Math.random()*height;this.vx=(Math.random()-0.5)*0.5;this.vy=(Math.random()-0.5)*0.5;this.size=Math.random()*2;} update(){this.x+=this.vx;this.y+=this.vy;if(this.x<0||this.x>width)this.vx*=-1;if(this.y<0||this.y>height)this.vy*=-1;} draw(){ctx.beginPath();ctx.arc(this.x,this.y,this.size,0,Math.PI*2);ctx.fillStyle="rgba(99, 102, 241, 0.5)";ctx.fill();} }
    const initParticles = () => { particles = []; for(let i=0; i<50; i++) particles.push(new Particle()); };
    const animate = () => { ctx.clearRect(0,0,width,height); particles.forEach((p, i) => { p.update(); p.draw(); for(let j=i; j<particles.length; j++){ const dx=p.x-particles[j].x; const dy=p.y-particles[j].y; const dist=Math.sqrt(dx*dx+dy*dy); if(dist<150){ ctx.beginPath(); ctx.strokeStyle=`rgba(99, 102, 241, ${0.1-dist/1500})`; ctx.lineWidth=0.5; ctx.moveTo(p.x,p.y); ctx.lineTo(particles[j].x,particles[j].y); ctx.stroke(); } } }); requestAnimationFrame(animate); };
    window.addEventListener("resize", () => { resize(); initParticles(); }); resize(); initParticles(); animate();
}
function togglePDF(id, url, headerEl) {
    const viewer = document.getElementById(id);
    const card = headerEl.closest('div[class*="card"]');
    if(viewer.style.display === 'block') { viewer.style.display = 'none'; viewer.innerHTML = ''; card.classList.remove('expanded'); }
    else { document.querySelectorAll('.pdf-container').forEach(e => {e.style.display='none'; e.innerHTML='';}); document.querySelectorAll('.project-card, .procedure-card-wrapper').forEach(c => c.classList.remove('expanded')); viewer.innerHTML = `<iframe src="https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true" width="100%" height="100%" style="border:none;"></iframe>`; viewer.style.display = 'block'; card.classList.add('expanded'); }
}
function toggleComp(headerEl) {
    const card = headerEl.parentNode;
    document.querySelectorAll('.comp-card-container').forEach(c => { if(c !== card) c.classList.remove('active'); });
    card.classList.toggle('active');
}
function openProjectModal(item) {
    const modal = document.getElementById("project-modal"); document.getElementById("modal-project-title").innerText = item.title; document.getElementById("modal-project-desc").innerText = item.longDescription || item.description; const tags = document.getElementById("modal-project-tags"); tags.innerHTML = ""; if(item.tags) item.tags.forEach(t => tags.innerHTML += `<span class="project-tag">${t}</span>`); modal.style.display = "flex";
}
function openContact() { const modal = document.getElementById("contact-modal"); try { document.getElementById("display-email-text").innerText = atob(config.profile.emailEncoded); } catch(e) {} modal.style.display = "flex"; }