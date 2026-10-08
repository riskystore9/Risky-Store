/* =============================================
   GAMING SYKO — script.js (Animated)
   ============================================= */

var diamondPacks = [
    { id: 1,  name: "25 Pack",   price: 100,  badge: null,         icon: "fas fa-gem" },
    { id: 2,  name: "50 Pack",   price: 190,  badge: null,         icon: "fas fa-gem" },
    { id: 3,  name: "100 Pack",   price: 340,  badge: null,         icon: "fas fa-gem" },
    { id: 4,  name: "310 Pack",   price: 960,  badge: null,         icon: "fas fa-gem" },
    { id: 5,  name: "520 Pack",   price: 1660,  badge: null,         icon: "fas fa-gem" },
    { id: 6,  name: "1060 Pack",   price: 3150,  badge: null,         icon: "fas fa-gem" },
    { id: 7,  name: "2080 Pack",   price: 6150,  badge: null,         icon: "fas fa-gem" },
    { id: 8,  name: "W. Lite",    price: 150,  badge: null,         icon: "fas fa-calendar-week" },
    { id: 9,  name: "Weekly",   price: 570, badge: null, icon: "fas fa-crown" },
    { id: 10, name: "Weekly Max",   price: 1400, badge: "bestseller", icon: "fas fa-crown" },
    { id: 11, name: "Monthly",       price: 2700, badge: null,         icon: "fas fa-star" },
    { id: 12, name: "VIP",       price: 3450, badge: null,         icon: "fas fa-star" },
    { id: 13, name: "S. VIP",       price: 5050, badge: null,         icon: "fas fa-star" },
];



var WHATSAPP_NUMBER = "94766447837";

// ============================================================
// PARTICLE CANVAS
// ============================================================
function initParticles() {
    var canvas = document.getElementById("particleCanvas");
    if (!canvas) return;
    var ctx = canvas.getContext("2d");
    var particles = [];
    var count = 60;
    var mouse = { x: -1000, y: -1000 };

    function resize() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    canvas.parentElement.addEventListener("mousemove", function (e) {
        var rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });
    canvas.parentElement.addEventListener("mouseleave", function () {
        mouse.x = -1000;
        mouse.y = -1000;
    });

    for (var i = 0; i < count; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            r: Math.random() * 2 + 0.5,
            o: Math.random() * 0.3 + 0.05
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (var i = 0; i < particles.length; i++) {
            var p = particles[i];
            p.x += p.vx;
            p.y += p.vy;

            // Mouse repel
            var dx = p.x - mouse.x;
            var dy = p.y - mouse.y;
            var dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
                var force = (120 - dist) / 120 * 0.8;
                p.x += (dx / dist) * force;
                p.y += (dy / dist) * force;
            }

            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(99, 102, 241, " + p.o + ")";
            ctx.fill();

            // Connect nearby
            for (var j = i + 1; j < particles.length; j++) {
                var p2 = particles[j];
                var dx2 = p.x - p2.x;
                var dy2 = p.y - p2.y;
                var d2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
                if (d2 < 140) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = "rgba(99, 102, 241, " + (0.04 * (1 - d2 / 140)) + ")";
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(draw);
    }
    draw();
}

// ============================================================
// SCROLL PROGRESS BAR
// ============================================================
function initScrollProgress() {
    var bar = document.getElementById("scrollProgress");
    window.addEventListener("scroll", function () {
        var h = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + "%";
    });
}

// ============================================================
// 3D TILT CARDS
// ============================================================
function initTiltCards() {
    document.querySelectorAll(".tilt-card").forEach(function (card) {
        card.addEventListener("mousemove", function (e) {
            var rect = card.getBoundingClientRect();
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;
            var cx = rect.width / 2;
            var cy = rect.height / 2;
            var rotateX = ((y - cy) / cy) * -6;
            var rotateY = ((x - cx) / cx) * 6;
            card.style.transform = "perspective(600px) rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg) translateY(-4px)";
        });
        card.addEventListener("mouseleave", function () {
            card.style.transform = "perspective(600px) rotateX(0deg) rotateY(0deg) translateY(0)";
        });
    });
}

// ============================================================
// MAGNETIC BUTTONS
// ============================================================
function initMagnetic() {
    document.querySelectorAll(".magnetic").forEach(function (btn) {
        btn.addEventListener("mousemove", function (e) {
            var rect = btn.getBoundingClientRect();
            var x = e.clientX - rect.left - rect.width / 2;
            var y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = "translate(" + (x * 0.15) + "px, " + (y * 0.15) + "px)";
        });
        btn.addEventListener("mouseleave", function () {
            btn.style.transform = "translate(0, 0)";
        });
    });
}

// ============================================================
// RENDER PACKS
// ============================================================
function renderPacks() {
    var grid = document.getElementById("packsGrid");
    var select = document.getElementById("packSelect");

    diamondPacks.forEach(function (pack, index) {
        var card = document.createElement("div");
        var cls = "pack-card tilt-card reveal reveal-d" + Math.min((index % 6) + 1, 6);
        if (pack.badge === "bestseller") cls += " bestseller-card";
        card.className = cls;

        var badgeHTML = "";
        if (pack.badge === "bestseller") {
            badgeHTML = '<div class="pack-badge"><i class="fas fa-crown"></i> Best Seller</div>';
        }

        card.innerHTML =
            badgeHTML +
            '<div class="pack-icon"><i class="' + pack.icon + '"></i></div>' +
            '<div class="pack-name">' + pack.name + '</div>' +
            '<div class="pack-type">Diamonds</div>' +
            '<div class="pack-price"><span class="rs">Rs.</span> <span class="count-up" data-target="' + pack.price + '">0</span></div>' +
            '<button class="pack-btn" data-pack-id="' + pack.id + '">Buy Now</button>';

        grid.appendChild(card);

        var option = document.createElement("option");
        option.value = pack.id;
        option.textContent = pack.name + " — Rs. " + pack.price.toLocaleString();
        select.appendChild(option);
    });

    document.querySelectorAll(".pack-btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
            document.getElementById("packSelect").value = this.getAttribute("data-pack-id");
            document.getElementById("order").scrollIntoView({ behavior: "smooth" });
        });
    });
}

// ============================================================
// COUNT UP ANIMATION
// ============================================================
function initCountUp() {
    var observed = false;
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting && !observed) {
                observed = true;
                document.querySelectorAll(".count-up").forEach(function (el) {
                    var target = parseInt(el.getAttribute("data-target"));
                    var duration = 1200;
                    var start = performance.now();
                    function update(now) {
                        var elapsed = now - start;
                        var progress = Math.min(elapsed / duration, 1);
                        var eased = 1 - Math.pow(1 - progress, 3);
                        el.textContent = Math.floor(eased * target).toLocaleString();
                        if (progress < 1) requestAnimationFrame(update);
                        else el.textContent = target.toLocaleString();
                    }
                    requestAnimationFrame(update);
                });
            }
        });
    }, { threshold: 0.3 });

    var packsGrid = document.getElementById("packsGrid");
    if (packsGrid) observer.observe(packsGrid);
}

// ============================================================
// MEMBERSHIPS
// ============================================================
function renderMemberships() {
    var list = document.getElementById("membershipList");
    if (!list) return;
    membershipPacks.forEach(function (pack) {
        var item = document.createElement("div");
        var cls = "member-item";
        if (pack.tag) cls += " member-popular";
        item.className = cls;
        var tagHTML = pack.tag ? '<div class="member-tag">' + pack.tag + '</div>' : '';
        item.innerHTML =
            '<div class="member-info"><div class="member-icon"><i class="' + pack.icon + '"></i></div><div><div class="member-name">' + pack.name + '</div>' + tagHTML + '</div></div>' +
            '<div class="member-price"><span class="rs">LKR</span> ' + pack.price.toLocaleString() + '/=</div>';
        list.appendChild(item);
    });
}

// ============================================================
// COPY
// ============================================================
function initCopyButtons() {
    document.querySelectorAll(".copy-btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
            var text = this.getAttribute("data-copy");
            var self = this;
            navigator.clipboard.writeText(text).then(function () {
                showCopied(self);
            }).catch(function () {
                var ta = document.createElement("textarea");
                ta.value = text;
                ta.style.position = "fixed";
                ta.style.opacity = "0";
                document.body.appendChild(ta);
                ta.select();
                document.execCommand("copy");
                document.body.removeChild(ta);
                showCopied(self);
            });
        });
    });
    function showCopied(btn) {
        btn.classList.add("copied");
        var orig = btn.querySelector("i").className;
        btn.querySelector("i").className = "fas fa-check";
        setTimeout(function () {
            btn.classList.remove("copied");
            btn.querySelector("i").className = orig;
        }, 1800);
    }
}

// ============================================================
// FILE UPLOAD
// ============================================================
function initFileUpload() {
    var dropArea = document.getElementById("fileDropArea");
    var fileInput = document.getElementById("slipUpload");
    var uploadContent = document.getElementById("fileUploadContent");
    var selectedDiv = document.getElementById("fileSelected");
    var fileNameSpan = document.getElementById("fileName");
    var removeBtn = document.getElementById("fileRemove");

    dropArea.addEventListener("click", function () { fileInput.click(); });
    dropArea.addEventListener("dragover", function (e) { e.preventDefault(); dropArea.classList.add("dragover"); });
    dropArea.addEventListener("dragleave", function () { dropArea.classList.remove("dragover"); });
    dropArea.addEventListener("drop", function (e) {
        e.preventDefault();
        dropArea.classList.remove("dragover");
        if (e.dataTransfer.files.length) handleFile(e.dataTransfer.files[0]);
    });
    fileInput.addEventListener("change", function () { if (fileInput.files.length) handleFile(fileInput.files[0]); });
    removeBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        fileInput.value = "";
        uploadContent.classList.remove("hidden");
        selectedDiv.classList.add("hidden");
    });
    function handleFile(file) {
        if (!file.type.startsWith("image/")) { showToast("Please upload an image file (JPG, PNG)."); return; }
        fileNameSpan.textContent = file.name;
        uploadContent.classList.add("hidden");
        selectedDiv.classList.remove("hidden");
    }
}

// ============================================================
// ORDER SUBMIT
// ============================================================
function initOrderSubmit() {
    document.getElementById("submitOrder").addEventListener("click", function () {
        var uid = document.getElementById("ffUid").value.trim();
        var name = document.getElementById("playerName").value.trim();
        var packId = document.getElementById("packSelect").value;
        var payment = document.getElementById("paymentMethod").value;
        if (!uid) { showToast("Please enter your Free Fire UID."); return; }
        if (!name) { showToast("Please enter your Player Name."); return; }
        if (!packId) { showToast("Please select a Diamond Pack."); return; }
        if (!payment) { showToast("Please select a Payment Method."); return; }
        var pack = diamondPacks.find(function (p) { return p.id === parseInt(packId); });
        if (!pack) return;
        var message =
            "Hy Riskyy, I want to buy Free Fire Diamonds.\n\n" +
            "UID: " + uid + "\nPlayer Name: " + name + "\nPack: " + pack.name +
            "\nPrice: Rs. " + pack.price.toLocaleString() + "\nPayment Method: " + payment +
            "\n\nI will send my payment slip screenshot now.";
        window.open("https://wa.me/94721623267?text=" + encodeURIComponent(message), "_blank");
    });
}

// ============================================================
// TOAST
// ============================================================
var toastTimer = null;
function showToast(msg) {
    var toast = document.getElementById("toast");
    document.getElementById("toastMsg").textContent = msg;
    toast.classList.add("show");
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove("show"); }, 3500);
}

// ============================================================
// HEADER
// ============================================================
function initHeader() {
    var header = document.getElementById("header");
    var ids = ["home", "services", "packs", "payment-info", "order", "howto", "contact"];
    window.addEventListener("scroll", function () {
        header.classList.toggle("scrolled", window.scrollY > 40);
        var current = "home";
        ids.forEach(function (id) {
            var el = document.getElementById(id);
            if (el && window.scrollY >= el.offsetTop - 120) current = id;
        });
        document.querySelectorAll(".nav-link").forEach(function (link) {
            link.classList.toggle("active", link.getAttribute("href") === "#" + current);
        });
    });
}

// ============================================================
// MOBILE MENU
// ============================================================
function initMobileMenu() {
    var toggle = document.getElementById("mobileBtn");
    var menu = document.getElementById("mobileMenu");
    toggle.addEventListener("click", function () {
        toggle.classList.toggle("open");
        menu.classList.toggle("open");
        document.body.style.overflow = menu.classList.contains("open") ? "hidden" : "";
        // Stagger mobile links
        if (menu.classList.contains("open")) {
            menu.querySelectorAll(".mobile-link").forEach(function (link, i) {
                link.style.transitionDelay = (i * 0.06 + 0.1) + "s";
            });
        } else {
            menu.querySelectorAll(".mobile-link").forEach(function (link) {
                link.style.transitionDelay = "0s";
            });
        }
    });
    document.querySelectorAll(".mobile-link, .mobile-menu-actions a").forEach(function (link) {
        link.addEventListener("click", function () {
            toggle.classList.remove("open");
            menu.classList.remove("open");
            document.body.style.overflow = "";
        });
    });
}

// ============================================================
// SCROLL REVEAL
// ============================================================
function initReveal() {
    function check() {
        document.querySelectorAll(".reveal").forEach(function (el) {
            if (el.getBoundingClientRect().top < window.innerHeight - 60) {
                el.classList.add("visible");
            }
        });
    }
    window.addEventListener("scroll", check);
    window.addEventListener("load", check);
}

// ============================================================
// INIT
// ============================================================
document.addEventListener("DOMContentLoaded", function () {
    initParticles();
    initScrollProgress();
    renderPacks();
    renderMemberships();
    initCopyButtons();
    initFileUpload();
    initOrderSubmit();
    initHeader();
    initMobileMenu();
    initReveal();
    // Delayed so dynamically added cards exist
    setTimeout(function () {
        initTiltCards();
        initMagnetic();
        initCountUp();
    }, 100);
});