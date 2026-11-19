document.addEventListener('DOMContentLoaded', () => {

    // --- 0. UTILITAT: MISSATGE TOAST I FALLBACK D'IMATGES ---
    function mostrarToast(missatge) {
        let toast = document.querySelector('.toast-notification');
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'toast-notification';
            document.body.appendChild(toast);
        }
        toast.innerHTML = `<span>✓</span> <span>${missatge}</span>`;
        toast.classList.add('show');
        clearTimeout(toast._timeout);
        toast._timeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 2200);
    }

    const SVG_FALLBACK_LEGO = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNGRkY1RjUiIHJ4PSIxNiIvPjxyZWN0IHg9IjQ1IiB5PSI3MCIgd2lkdGg9IjExMCIgaGVpZ2h0PSI3NSIgZmlsbD0iI0UzMDAwRiIgcng9IjEwIi8+PGNpcmNsZSBjeD0iNzIiIGN5PSI1NSIgcj0iMTUiIGZpbGw9IiNFMzAwMEYiLz48Y2lyY2xlIGN4PSIxMjgiIGN5PSI1NSIgcj0iMTUiIGZpbGw9IiNFMzAwMEYiLz48dGV4dCB4PSIxMDAiIHk9IjExOCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtd2VpZ2h0PSI5MDAiIGZvbnQtc2l6ZT0iMjIiIGZpbGw9IiNGRkQ1MDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGxldHRlci1zcGFjaW5nPSIyIj5MRUdPPC90ZXh0Pjwvc3ZnPg==";
    const SVG_FALLBACK_HW = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNGMEY3RkYiIHJ4PSIxNiIvPjxwYXRoIGQ9Ik0yNSAxMTAgQyA1MCAxMTAsIDY1IDgwLCAxMDUgODAgQyAxMzUgODAsIDE0NSA5NSwgMTc1IDk1IEMgMTY1IDEyNSwgMTM1IDEzNSwgMTAwIDEzNSBDIDU1IDEzNSwgNDAgMTEwLCAyNSAxMTAgWiIgZmlsbD0iIzAwNTRBNiIvPjx0ZXh0IHg9IjEwMCIgeT0iMTE0IiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC13ZWlnaHQ9IjkwMCIgZm9udC1zaXplPSIxMyIgZmlsbD0iI0ZGRkZGRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgbGV0dGVyLXNwYWNpbmc9IjEiPkhPVCBXSEVFTFM8L3RleHQ+PC9zdmc+";

    window.bdFallbackImg = function(imgElem, brand) {
        if (!imgElem) return;
        imgElem.onerror = null;
        const isLego = brand && brand.toLowerCase().includes('lego');
        imgElem.src = isLego ? SVG_FALLBACK_LEGO : SVG_FALLBACK_HW;
    };

    // --- 1. DADES GLOBALS AMB IMATGES 100% REALS I ESTABLES ---
    function obtenirProductes() {
        return new Promise((resolve) => {
            setTimeout(() => {
                const dadesAPI = [
                    {
                        id: "lego-76911",
                        brand: "LEGO",
                        ref: "LEGO #76911",
                        title: "007 Aston Martin DB5",
                        year: 2022,
                        isNew: false,
                        meta: "Llançament: 2022 • 298 Peces • Speed Champions",
                        desc: "Reprodueix l'elegància de l'icònic esportiu britànic de James Bond amb matrícules intercanviables i llandes exclusives.",
                        img: "https://images.brickset.com/sets/images/76911-1.jpg"
                    },
                    {
                        id: "hw-supra",
                        brand: "Hot Wheels",
                        ref: "HW Premium",
                        title: "Toyota Supra MK4",
                        year: 2024,
                        isNew: true,
                        meta: "Escala 1:64 • Car Culture • Real Riders",
                        desc: "Edició col·leccionista amb carrosseria i xassís metàl·lic (Metal/Metal) i pneumàtics de goma d'alta fidelitat.",
                        img: "https://images.unsplash.com/photo-1607603750909-408e193868c7?w=600&q=80"
                    },
                    {
                        id: "lego-42115",
                        brand: "LEGO",
                        ref: "LEGO #42115",
                        title: "Lamborghini Sián FKP 37",
                        year: 2020,
                        isNew: false,
                        meta: "Llançament: 2020 • 3696 Peces • Technic",
                        desc: "Model a escala 1:8 amb motor V12 amb pistons mòbils, caixa de canvis seqüencial de 8 velocitats i portes de tisora.",
                        img: "https://images.brickset.com/sets/images/42115-1.jpg"
                    },
                    {
                        id: "hw-mustang",
                        brand: "Hot Wheels",
                        ref: "HW Mainline",
                        title: "'69 Ford Mustang Boss",
                        year: 2024,
                        isNew: true,
                        meta: "Escala 1:64 • Muscle Mania • Edició 2024",
                        desc: "Clàssic muscle car americà amb pintura taronja metal·litzada i franges esportives negres al capó.",
                        img: "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?w=600&q=80"
                    },
                    {
                        id: "lego-10281",
                        brand: "LEGO",
                        ref: "LEGO #10281",
                        title: "Bonsai Tree",
                        year: 2021,
                        isNew: false,
                        meta: "Llançament: 2021 • 878 Peces • Botanical",
                        desc: "Inclou fulles verdes clàssiques i flors de cirerer roses intercanviables amb test rectangular i suport d'efecte fusta.",
                        img: "https://images.brickset.com/sets/images/10281-1.jpg"
                    },
                    {
                        id: "hw-skyline",
                        brand: "Hot Wheels",
                        ref: "HW Premium",
                        title: "Nissan Skyline GT-R R34",
                        year: 2023,
                        isNew: false,
                        meta: "Escala 1:64 • Japan Historics • JDM",
                        desc: "Un dels models més buscats pels col·leccionistes de JDM amb acabats detallats als fars i aleró posterior.",
                        img: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&q=80"
                    },
                    {
                        id: "lego-75192",
                        brand: "LEGO",
                        ref: "LEGO #75192",
                        title: "Millennium Falcon",
                        year: 2017,
                        isNew: false,
                        meta: "Ultimate Collector Series • 7541 Peces",
                        desc: "La nau més gran i detallada de Star Wars amb panells superiors extraïbles, interior complet i tripulació clàssica.",
                        img: "https://images.brickset.com/sets/images/75192-1.jpg"
                    },
                    {
                        id: "hw-batmobile",
                        brand: "Hot Wheels",
                        ref: "HW Mainline",
                        title: "Classic TV Batmobile",
                        year: 2022,
                        isNew: false,
                        meta: "Escala 1:64 • Batman Series • Negre Brillant",
                        desc: "Rèplica de la sèrie clàssica de 1966 amb parabrises de doble bombolla i línies vermelles característiques.",
                        img: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&q=80"
                    },
                    {
                        id: "lego-10300",
                        brand: "LEGO",
                        ref: "LEGO #10300",
                        title: "Màquina del Temps DeLorean",
                        year: 2022,
                        isNew: false,
                        meta: "Llançament: 2022 • 1872 Peces • Icons",
                        desc: "Construeix les 3 versions del mític cotxe de Back to the Future amb condensador de fluzo il·luminat i portes d'ala de gavina.",
                        img: "https://images.brickset.com/sets/images/10300-1.jpg"
                    },
                    {
                        id: "hw-camaro",
                        brand: "Hot Wheels",
                        ref: "HW Mainline",
                        title: "'68 Custom Camaro",
                        year: 2024,
                        isNew: true,
                        meta: "Escala 1:64 • HW Muscle • Metal/Metal",
                        desc: "Edició col·leccionista del llegendari Camaro de primera generació amb llandes esportives i carrosseria blava d'alta resistència.",
                        img: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&q=80"
                    },
                    {
                        id: "lego-76908",
                        brand: "LEGO",
                        ref: "LEGO #76908",
                        title: "Lamborghini Countach",
                        year: 2024,
                        isNew: true,
                        meta: "Llançament: 2024 • 262 Peces • Speed Champions",
                        desc: "El mític superesportiu dels anys 70 amb habitacle biplaça obert, carrosseria blanca angulosa i minifigura de pilot de Lamborghini.",
                        img: "https://images.brickset.com/sets/images/76908-1.jpg"
                    },
                    {
                        id: "hw-boneshaker",
                        brand: "Hot Wheels",
                        ref: "HW Originals",
                        title: "Bone Shaker Hot Rod",
                        year: 2023,
                        isNew: false,
                        meta: "Escala 1:64 • HW Experimotors • Calavera Cromada",
                        desc: "L'emblemàtic hot rod amb calavera frontal gegant, sostre obert i tub d'escapament lateral de competició.",
                        img: "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=600&q=80"
                    },
                    {
                        id: "lego-76912",
                        brand: "LEGO",
                        ref: "LEGO #76912",
                        title: "1970 Dodge Charger R/T",
                        year: 2022,
                        isNew: false,
                        meta: "Llançament: 2022 • 345 Peces • Speed Champions",
                        desc: "El mític muscle car de Dominic Toretto amb sobrealimentador visible al capó i minifigura exclusiva.",
                        img: "https://images.brickset.com/sets/images/76912-1.jpg"
                    },
                    {
                        id: "hw-twinmill",
                        brand: "Hot Wheels",
                        ref: "HW Originals",
                        title: "Twin Mill Classic",
                        year: 2021,
                        isNew: false,
                        meta: "Escala 1:64 • HW 50th Anniversary • Doble Motor",
                        desc: "El disseny propi més mític de la història de Hot Wheels amb doble motor V8 visible i carrosseria aerodinàmica.",
                        img: "https://images.unsplash.com/photo-1658121040008-bd144bd4e648?w=600&q=80"
                    },
                    {
                        id: "lego-42151",
                        brand: "LEGO",
                        ref: "LEGO #42151",
                        title: "Bugatti Bolide",
                        year: 2024,
                        isNew: true,
                        meta: "Llançament: 2024 • 905 Peces • Technic",
                        desc: "Superesportiu de circuit d'alta precisió amb motor W16 funcional, direcció operativa i portes de tisora en groc i negre.",
                        img: "https://images.brickset.com/sets/images/42151-1.jpg"
                    },
                    {
                        id: "hw-porsche911",
                        brand: "Hot Wheels",
                        ref: "HW Premium",
                        title: "Porsche 911 GT3 RS",
                        year: 2024,
                        isNew: true,
                        meta: "Escala 1:64 • Speed Graphics • Real Riders",
                        desc: "Espectacular rèplica de precisió amb aleró aerodinàmic gegant, carrosseria d'aliatge de zinc i pintura d'alta durabilitat.",
                        img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80"
                    }
                ];
                resolve(dadesAPI);
            }, 150);
        });
    }

    // --- 2. GESTIÓ LOCALSTORAGE: COL·LECCIÓ (TINC) I DESITJATS ---
    function obtenirColleccioNeta(productes) {
        const raw = JSON.parse(localStorage.getItem('bd_collection')) || [];
        const mapUnic = new Map();

        raw.forEach(item => {
            const prodReal = productes.find(p => p.id === item.id || p.title === item.title);
            if (prodReal && !mapUnic.has(prodReal.id)) {
                mapUnic.set(prodReal.id, {
                    id: prodReal.id,
                    title: prodReal.title,
                    ref: prodReal.ref,
                    brand: prodReal.brand
                });
            }
        });

        const llistaNeta = Array.from(mapUnic.values());
        localStorage.setItem('bd_collection', JSON.stringify(llistaNeta));
        return llistaNeta;
    }

    function obtenirDesitjatsNeta(productes) {
        const raw = JSON.parse(localStorage.getItem('bd_wishlist')) || [];
        const mapUnic = new Map();

        raw.forEach(item => {
            const prodReal = productes.find(p => p.id === item.id || p.title === item.title);
            if (prodReal && !mapUnic.has(prodReal.id)) {
                mapUnic.set(prodReal.id, {
                    id: prodReal.id,
                    title: prodReal.title,
                    ref: prodReal.ref,
                    brand: prodReal.brand
                });
            }
        });

        const llistaNeta = Array.from(mapUnic.values());
        localStorage.setItem('bd_wishlist', JSON.stringify(llistaNeta));
        return llistaNeta;
    }

    // --- 3. PLANTILLA DE TARGETA (AMB BOTÓ DESITJATS, BADGE NOU I FALLBACK D'IMATGE) ---
    function crearHTMLTargeta(prod, savedItems, wishItems) {
        const isSaved = savedItems ? savedItems.some(i => i.id === prod.id) : false;
        const isWish = wishItems ? wishItems.some(i => i.id === prod.id) : false;
        const badgeNou = prod.isNew ? '<span class="badge-new">★ NOU</span>' : '';

        return `
            <article class="card" data-id="${prod.id}" data-name="${prod.title.toLowerCase()}" data-ref="${prod.ref.toLowerCase()}" data-brand="${prod.brand.toLowerCase()}" data-year="${prod.year || 2024}">
                ${badgeNou}
                <button class="wish-card-btn ${isWish ? 'active' : ''}" data-id="${prod.id}" data-title="${prod.title}" data-ref="${prod.ref}" data-brand="${prod.brand}" title="${isWish ? 'Treure de Desitjats' : 'Afegir a Desitjats'}" aria-label="Desitjats">
                    ${isWish ? '♥' : '♡'}
                </button>
                <a href="detall.html?id=${prod.id}" class="card-link" style="text-decoration: none; color: inherit; display: block;">
                    <img src="${prod.img}" alt="${prod.title}" class="card-img" loading="lazy" onerror="window.bdFallbackImg(this, '${prod.brand}');">
                    <div class="card-info">
                        <span class="ref">${prod.ref}</span>
                        <h3 class="card-title">${prod.title}</h3>
                    </div>
                </a>
                <button class="add-btn ${isSaved ? 'saved' : ''}" aria-label="Afegir a la col·lecció" data-id="${prod.id}" data-title="${prod.title}" data-ref="${prod.ref}" data-brand="${prod.brand}">
                    ${isSaved ? '✓' : '+'}
                </button>
            </article>
        `;
    }

    // --- 4. PÀGINA: INICI ---
    function renderitzarInici(productes) {
        const legoCarousel = document.getElementById('carousel-lego');
        const hwCarousel = document.getElementById('carousel-hw');

        if (legoCarousel && hwCarousel) {
            const savedItems = obtenirColleccioNeta(productes);
            const wishItems = obtenirDesitjatsNeta(productes);

            const legos = productes.filter(p => p.brand === 'LEGO');
            const hws = productes.filter(p => p.brand === 'Hot Wheels');

            legoCarousel.innerHTML = legos.map(prod => crearHTMLTargeta(prod, savedItems, wishItems)).join('');
            hwCarousel.innerHTML = hws.map(prod => crearHTMLTargeta(prod, savedItems, wishItems)).join('');

            const chips = document.querySelectorAll('.quick-filters .chip');
            const seccioLego = legoCarousel.closest('.highlight-section');
            const seccioHw = hwCarousel.closest('.highlight-section');

            chips.forEach(chip => {
                chip.addEventListener('click', () => {
                    chips.forEach(c => c.classList.remove('active'));
                    chip.classList.add('active');

                    const filtre = chip.textContent.trim().toLowerCase();
                    if (filtre === 'tots') {
                        seccioLego.style.display = 'block';
                        seccioHw.style.display = 'block';
                    } else if (filtre === 'lego') {
                        seccioLego.style.display = 'block';
                        seccioHw.style.display = 'none';
                    } else if (filtre.includes('hot')) {
                        seccioLego.style.display = 'none';
                        seccioHw.style.display = 'block';
                    }
                });
            });
        }
    }

    // --- 5. PÀGINA: CATÀLEG AMB FILTRES (ANY, MARCA, TEXT) ---
    function renderitzarCataleg(productes) {
        const grid = document.getElementById('catalog-grid');
        if (grid) {
            const savedItems = obtenirColleccioNeta(productes);
            const wishItems = obtenirDesitjatsNeta(productes);

            grid.innerHTML = productes.map(prod => crearHTMLTargeta(prod, savedItems, wishItems)).join('');

            const searchInput = document.querySelector('.search-input');
            const filterSelect = document.querySelector('.filter-select');
            const filterYear = document.getElementById('filter-year');
            const yearVal = document.getElementById('year-val');
            const applyFilterBtn = document.getElementById('apply-filters-btn');

            function filtrar() {
                const term = searchInput ? searchInput.value.toLowerCase().trim() : '';
                const brandFilter = filterSelect ? filterSelect.value.toLowerCase().trim() : 'totes les marques';
                const maxYear = filterYear ? parseInt(filterYear.value, 10) : 2024;
                const cards = document.querySelectorAll('.catalog-grid .card');
                let visibles = 0;

                cards.forEach(card => {
                    const name = card.getAttribute('data-name') || '';
                    const ref = card.getAttribute('data-ref') || '';
                    const brand = card.getAttribute('data-brand') || '';
                    const year = parseInt(card.getAttribute('data-year') || '2024', 10);

                    const matchesTerm = name.includes(term) || ref.includes(term) || brand.includes(term);
                    let matchesBrand = true;
                    if (brandFilter.includes('lego')) {
                        matchesBrand = brand.toLowerCase() === 'lego';
                    } else if (brandFilter.includes('hot')) {
                        matchesBrand = brand.toLowerCase().includes('hot wheels');
                    }

                    const matchesYear = year <= maxYear;

                    if (matchesTerm && matchesBrand && matchesYear) {
                        card.style.display = 'block';
                        visibles++;
                    } else {
                        card.style.display = 'none';
                    }
                });

                let emptyMsg = document.getElementById('catalog-empty-msg');
                if (visibles === 0) {
                    if (!emptyMsg) {
                        emptyMsg = document.createElement('p');
                        emptyMsg.id = 'catalog-empty-msg';
                        emptyMsg.style.cssText = 'grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; color: #64748B; font-size: 0.95rem;';
                        emptyMsg.innerText = "No s'ha trobat cap model amb aquests filtres.";
                        grid.appendChild(emptyMsg);
                    }
                } else if (emptyMsg) {
                    emptyMsg.remove();
                }
            }

            if (searchInput) searchInput.addEventListener('input', filtrar);
            if (filterSelect) filterSelect.addEventListener('change', filtrar);
            if (filterYear) {
                filterYear.addEventListener('input', (e) => {
                    if (yearVal) yearVal.innerText = e.target.value;
                    filtrar();
                });
            }
            if (applyFilterBtn) {
                applyFilterBtn.addEventListener('click', () => {
                    filtrar();
                    mostrarToast("Filtres aplicats correctament");
                });
            }
        }
    }

    // --- 6. PÀGINA: DETALL DINÀMIC (TINC I DESITJATS) ---
    function renderitzarDetall(productes) {
        const detailBlock = document.querySelector('.product-info-block');
        if (!detailBlock) return;

        const params = new URLSearchParams(window.location.search);
        const prodId = params.get('id');
        const prod = productes.find(p => p.id === prodId) || productes[0];

        const heroContainer = document.querySelector('.hero-image');
        if (heroContainer) {
            heroContainer.classList.remove('placeholder');
            heroContainer.innerHTML = `<img src="${prod.img}" alt="${prod.title}" style="width:100%; height:100%; object-fit:contain; padding:1.5rem; background:#fff;" onerror="window.bdFallbackImg(this, '${prod.brand}');">`;
        }

        const refBadge = detailBlock.querySelector('.ref-badge');
        if (refBadge) {
            refBadge.innerText = prod.ref;
            const existingBadge = detailBlock.querySelector('.badge-new-detail');
            if (existingBadge) existingBadge.remove();
            if (prod.isNew) {
                refBadge.insertAdjacentHTML('afterend', '<span class="badge-new-detail">★ Novetat</span>');
            }
        }
        detailBlock.querySelector('.product-title').innerText = prod.title;
        detailBlock.querySelector('.product-meta').innerText = prod.meta;
        detailBlock.querySelector('.product-description p').innerText = prod.desc;

        const colBtn = document.getElementById('collection-add-btn') || detailBlock.querySelector('.big-action-btn');
        const wishBtn = document.getElementById('wishlist-add-btn');

        const saved = obtenirColleccioNeta(productes);
        const wishes = obtenirDesitjatsNeta(productes);

        if (colBtn) {
            if (saved.some(i => i.id === prod.id)) {
                colBtn.innerText = '✓ Ja és a la teva col·lecció';
                colBtn.classList.add('saved');
                colBtn.style.background = '#00C853';
            }

            colBtn.addEventListener('click', () => {
                const currentCollection = obtenirColleccioNeta(productes);
                if (!currentCollection.some(item => item.id === prod.id)) {
                    currentCollection.push({
                        id: prod.id,
                        title: prod.title,
                        ref: prod.ref,
                        brand: prod.brand
                    });
                    localStorage.setItem('bd_collection', JSON.stringify(currentCollection));
                    colBtn.innerText = '✓ Afegit a la col·lecció';
                    colBtn.classList.add('saved');
                    colBtn.style.background = '#00C853';
                    mostrarToast(`${prod.title} afegit a la col·lecció!`);
                }
            });
        }

        if (wishBtn) {
            const esDesitjat = wishes.some(i => i.id === prod.id);
            if (esDesitjat) {
                wishBtn.innerText = '♥ A la teva llista de Desitjats';
                wishBtn.classList.add('active');
            }

            wishBtn.addEventListener('click', () => {
                let currentWish = obtenirDesitjatsNeta(productes);
                const jaHiEs = currentWish.some(item => item.id === prod.id);

                if (jaHiEs) {
                    currentWish = currentWish.filter(item => item.id !== prod.id);
                    localStorage.setItem('bd_wishlist', JSON.stringify(currentWish));
                    wishBtn.innerText = '♡ Afegir a la llista de Desitjats';
                    wishBtn.classList.remove('active');
                    mostrarToast(`Treït de la llista de desitjats`);
                } else {
                    currentWish.push({
                        id: prod.id,
                        title: prod.title,
                        ref: prod.ref,
                        brand: prod.brand
                    });
                    localStorage.setItem('bd_wishlist', JSON.stringify(currentWish));
                    wishBtn.innerText = '♥ A la teva llista de Desitjats';
                    wishBtn.classList.add('active');
                    mostrarToast(`${prod.title} afegit a Desitjats!`);
                }
            });
        }
    }

    // --- 7. PÀGINA: COL·LECCIÓ (GESTIÓ COMPLETA TINC / DESITJATS) ---
    function renderitzarColleccio(productes) {
        const list = document.getElementById('collection-list');
        if (!list) return;

        let pestanyaActual = 'tinc';

        function actualitzarVista() {
            const saved = obtenirColleccioNeta(productes);
            const wishes = obtenirDesitjatsNeta(productes);
            const actius = pestanyaActual === 'tinc' ? saved : wishes;

            const statsNumbers = document.querySelectorAll('.stats-box .stat-number');
            if (statsNumbers.length >= 3) {
                statsNumbers[0].innerText = actius.length;
                statsNumbers[1].innerText = actius.filter(i => i.brand === 'LEGO').length;
                statsNumbers[2].innerText = actius.filter(i => i.brand === 'Hot Wheels').length;
            }

            const statLabels = document.querySelectorAll('.stats-box .stat-label');
            if (statLabels.length >= 1) {
                statLabels[0].innerText = pestanyaActual === 'tinc' ? 'Peces que tinc' : 'Peces desitjades';
            }

            if (actius.length === 0) {
                const missatgeBuit = pestanyaActual === 'tinc'
                    ? "La teva col·lecció està buida. Afegeix peces des del Catàleg!"
                    : "No tens cap model a la llista de desitjats encara.";
                list.innerHTML = `
                    <div style="text-align:center; padding: 2.5rem 1rem;">
                        <p style="color: #64748B; font-size: 0.95rem; margin-bottom: 1rem;">${missatgeBuit}</p>
                        <a href="cataleg.html" class="chip active" style="text-decoration:none; display:inline-block;">Explorar Catàleg</a>
                    </div>
                `;
                return;
            }

            list.innerHTML = actius.map(item => {
                const fullProd = productes.find(p => p.id === item.id || p.title === item.title) || item;
                const accioExtra = pestanyaActual === 'desitjats' ? `
                    <button class="move-to-col-btn" data-id="${fullProd.id}" title="Moure a Tinc" style="background: rgba(0, 200, 83, 0.12); border: none; color: #00A344; cursor: pointer; font-weight: 700; font-size: 0.75rem; padding: 0.4rem 0.7rem; border-radius: 8px; margin-right: 0.4rem; white-space: nowrap;">
                        + Ja el tinc!
                    </button>
                ` : '';

                return `
                    <li class="list-item" data-brand="${fullProd.brand.toLowerCase()}">
                        <a href="detall.html?id=${fullProd.id}" class="collection-item-link" title="Veure fitxa de ${fullProd.title}">
                            <img src="${fullProd.img}" class="list-img" alt="${fullProd.title}" style="width:55px; height:55px; object-fit:contain; border-radius:8px; margin-right:1rem; background:#fff; padding:4px; border:1px solid var(--border-color); flex-shrink: 0;" onerror="window.bdFallbackImg(this, '${fullProd.brand}');">
                            <div class="list-info" style="min-width: 0;">
                                <h4 style="font-size:0.95rem; margin-bottom:0.2rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${fullProd.title}</h4>
                                <span class="ref">${fullProd.ref}</span>
                            </div>
                        </a>
                        <div style="display: flex; align-items: center; margin-left: auto;">
                            ${accioExtra}
                            <button class="remove-btn" data-id="${fullProd.id}" title="Eliminar" aria-label="Eliminar" style="background:rgba(227,0,15,0.1); border:none; color:#E3000F; cursor:pointer; font-weight:bold; width:34px; height:34px; border-radius:50%; flex-shrink: 0; display:flex; align-items:center; justify-content:center;">✕</button>
                        </div>
                    </li>
                `;
            }).join('');

            // Eliminar de col·lecció o desitjats
            list.querySelectorAll('.remove-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const idToRemove = btn.getAttribute('data-id');
                    if (pestanyaActual === 'tinc') {
                        const actualitzada = saved.filter(i => i.id !== idToRemove);
                        localStorage.setItem('bd_collection', JSON.stringify(actualitzada));
                        mostrarToast("Model eliminat de la col·lecció");
                    } else {
                        const actualitzada = wishes.filter(i => i.id !== idToRemove);
                        localStorage.setItem('bd_wishlist', JSON.stringify(actualitzada));
                        mostrarToast("Model eliminat de desitjats");
                    }
                    actualitzarVista();
                });
            });

            // Moure de desitjats a col·lecció
            list.querySelectorAll('.move-to-col-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const idToMove = btn.getAttribute('data-id');
                    const itemToMove = wishes.find(i => i.id === idToMove);

                    if (itemToMove) {
                        // Afegir a col·lecció
                        if (!saved.some(i => i.id === idToMove)) {
                            saved.push(itemToMove);
                            localStorage.setItem('bd_collection', JSON.stringify(saved));
                        }
                        // Treure de desitjats
                        const desitjatsActualitzats = wishes.filter(i => i.id !== idToMove);
                        localStorage.setItem('bd_wishlist', JSON.stringify(desitjatsActualitzats));

                        mostrarToast(`Mogut a la col·lecció: ${itemToMove.title}!`);
                        actualitzarVista();
                    }
                });
            });
        }

        actualitzarVista();

        const tabs = document.querySelectorAll('.tabs .tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                pestanyaActual = tab.textContent.toLowerCase().includes('desitjat') ? 'desitjats' : 'tinc';
                actualitzarVista();
            });
        });
    }

    // --- 8. PÀGINA: PERFIL (AMB RECOMPTE DE TINC I DESITJATS) ---
    function renderitzarPerfil(productes) {
        const profileTotal = document.getElementById('profile-total-count');
        const profileWish = document.getElementById('profile-wish-count');
        const clearBtn = document.getElementById('clear-collection-btn');

        if (profileTotal) {
            const saved = obtenirColleccioNeta(productes);
            profileTotal.innerText = saved.length;
        }

        if (profileWish) {
            const wishes = obtenirDesitjatsNeta(productes);
            profileWish.innerText = wishes.length;
        }

        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                localStorage.removeItem('bd_collection');
                localStorage.removeItem('bd_wishlist');
                if (profileTotal) profileTotal.innerText = '0';
                if (profileWish) profileWish.innerText = '0';
                clearBtn.innerText = 'Dades reiniciades ✓';
                clearBtn.style.background = '#00C853';
                mostrarToast("Col·lecció i Desitjats buidats");
            });
        }
    }

    // --- 9. BOTONS "+" (COL·LECCIÓ) I "♡" (DESITJATS) A LES TARGETES ---
    function activarBotonsTargetes(productes) {
        // Botons "+"
        document.querySelectorAll('.add-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const id = btn.getAttribute('data-id');
                const title = btn.getAttribute('data-title');
                const ref = btn.getAttribute('data-ref');
                const brand = btn.getAttribute('data-brand');
                const currentCollection = obtenirColleccioNeta(productes);

                if (!currentCollection.some(item => item.id === id)) {
                    currentCollection.push({ id, title, ref, brand });
                    localStorage.setItem('bd_collection', JSON.stringify(currentCollection));
                    btn.innerHTML = '✓';
                    btn.classList.add('saved');
                    mostrarToast(`${title} afegit a la col·lecció!`);
                } else {
                    mostrarToast(`Ja és a la teva col·lecció`);
                }
            });
        });

        // Botons "♡" / "♥" (Desitjats)
        document.querySelectorAll('.wish-card-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const id = btn.getAttribute('data-id');
                const title = btn.getAttribute('data-title');
                const ref = btn.getAttribute('data-ref');
                const brand = btn.getAttribute('data-brand');
                let currentWishlist = obtenirDesitjatsNeta(productes);

                const jaHiEs = currentWishlist.some(item => item.id === id);

                if (jaHiEs) {
                    currentWishlist = currentWishlist.filter(item => item.id !== id);
                    localStorage.setItem('bd_wishlist', JSON.stringify(currentWishlist));
                    btn.innerHTML = '♡';
                    btn.classList.remove('active');
                    btn.title = "Afegir a Desitjats";
                    mostrarToast(`${title} treït de Desitjats`);
                } else {
                    currentWishlist.push({ id, title, ref, brand });
                    localStorage.setItem('bd_wishlist', JSON.stringify(currentWishlist));
                    btn.innerHTML = '♥';
                    btn.classList.add('active');
                    btn.title = "Treure de Desitjats";
                    mostrarToast(`${title} guardat a Desitjats!`);
                }
            });
        });
    }

    // --- 10. EXECUCIÓ PRINCIPAL ---
    obtenirProductes().then(productes => {
        renderitzarInici(productes);
        renderitzarCataleg(productes);
        renderitzarDetall(productes);
        renderitzarColleccio(productes);
        renderitzarPerfil(productes);
        activarBotonsTargetes(productes);
    });
});
