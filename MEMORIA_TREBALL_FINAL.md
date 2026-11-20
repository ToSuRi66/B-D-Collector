# MEMÒRIA DEL TREBALL FINAL - 1R TRIMESTRE
**Mòdul**: Disseny d'Interfícies Web (IFC33B)  
**Alumne**: Antoni Sureda Riera  
**Projecte**: B&D Collector (*Bricks & Die-cast*) — Web App de Col·leccionisme LEGO & Hot Wheels  

---

## FASE 1: Arbre de continguts i Esbossos (Sketching)

### 1.1. Context i justificació del redisseny
Partim d'una aplicació web d'escriptori destinada al seguiment i catalogació de col·leccionisme (focada en LEGO i Hot Wheels). El disseny d'escriptori original estava pensat per a un ús prolongat en pantalles grans, amb interacció per ratolí (alta precisió) i capacitat per mostrar grans volums de dades, taules denses, múltiples columnes i eines comunitàries.

Per a la versió mòbil (**Smartphone**), l'enfocament canvia radicalment sota la filosofia **Mobile-First**:
- **Usabilitat amb una sola mà**: S'han situat els elements interactius clau (barra de navegació inferior, botons d'acció de col·lecció i desitjats) dins la zona d'abast natural del polze (*Thumb Zone*).
- **Poda de continguts accessoris**: S'han suprimit taules complexes, fòrums, eines d'exportació feixugues i peus de pàgina recarregats per prioritzar la navegació visual neta i l'acció immediata.
- **Microinteraccions àgils**: Cerca predictiva en temps real, gestió d'estats d'un sol toc i notificacions flotants (*Toasts*) de confirmació.

> **Accés al projecte en línia**:  
> L'aplicació publicada i desplegada es pot consultar a:  
> `https://tosuri66.github.io/B-D-Collector/index.html`  
> *(Repositori GitHub amb desplegament continuat via GitHub Pages)*

---

### 1.2. Arbre de continguts: Escriptori vs. Smartphone

#### Versió Original d'Escriptori (Desktop)
1. **Inici / Portada**
   - Capçalera: Logotip, cercador avançat amb filtres multivariable, selector d'idioma/moneda, perfil.
   - Banner principal (*Hero*) amb esdeveniments de col·leccionisme i publicitat.
   - Graelles denses de 4 o 5 columnes per a novetats.
   - Taules estadístiques detallades i peu de pàgina corporatiu extens.
2. **Explorador / Catàleg complet**
   - Panell lateral esquerre (*Sidebar*) fix amb desenes de filtres simultanis (sèrie, any, rang de preu, escala, peces).
   - Vista en llista o taula amb exportació a CSV/PDF.
3. **Fitxa de detall**
   - Galeria d'imatges amb zoom de precisió, taula d'especificacions de peces, gràfics d'historial de preus de mercat i fòrum de comentaris.
4. **Col·lecció i Perfil**
   - Tauler d'administració avançat amb valoració econòmica estimada de la col·lecció.

---

#### Versió Adaptada a Smartphone (Mobile-First)
L'estructura mòbil s'ha sintetitzat en **4 pantalles clau** connectades mitjançant una barra de navegació inferior fixa (*Bottom Navigation Bar*):

```text
[ BARRA DE NAVEGACIÓ INFERIOR FIXA ]
  ├── 🏠 1. Inici (index.html)
  ├── 📖 2. Catàleg (cataleg.html)
  ├── 📦 3. Col·lecció (colleccio.html)
  └── 👤 4. Perfil (perfil.html)
        └── 🔍 Detall dinàmic (detall.html?id=...)
```

#### Descripció detallada de les pantalles mòbils:

1. **Pantalla 1: Inici / Portada (`index.html`)**
   - **Capçalera compacta**: Logotip corporatiu *B&D Collector* i accés directe al cercador.
   - **Carrusels horitzontals (*Scroll-Snap*)**:
     - Secció temàtica per a **LEGO** (amb vora vermella d'identitat).
     - Secció temàtica per a **Hot Wheels** (amb vora blava d'identitat).
   - **Targetes de producte (*Cards*)**:
     - Imatge neta sobre fons blanc amb protecció visual i *fallback* vectorial.
     - Insígnia destacada `★ NOU` per a llançaments recents.
     - Botó ràpid de desitjats en forma de cor (`♡`/`♥`).
     - Botó ràpid d'afegir a la col·lecció (`+`/`✓`) amb canvi visual a verd d'èxit.

2. **Pantalla 2: Catàleg / Explorador (`cataleg.html`)**
   - **Cercador dinàmic en temps real**: Entrada de text accessible que filtra a l'instant per nom o per codi de referència.
   - **Selector de marques per xips**: Botons d'accés ràpid (*Tots*, *LEGO*, *Hot Wheels*) amb feedback tàctil.
   - **Panell de filtres inferior (*Bottom Sheet Modal*)**:
     - Botó flotant d'obertura a la cantonada inferior.
     - Animació suau de translació vertical (`transform: translate(-50%, 0)`) sense talls ni buits inferiors.
     - Control lliscant d'any de llançament amb visualitzador dinàmic del valor seleccionat.
     - Botons d'acció: *Aplicar filtres* i *Restablir*.

3. **Pantalla 3: Fitxa de Detall (`detall.html?id=...`)**
   - **Navegació per paràmetres**: Lectura dinàmica de l'identificador del producte mitjançant `URLSearchParams`.
   - **Imatge Hero centralitzada**: Imatge d'alta resolució amb fons neutre.
   - **Bloc d'informació tècnica**:
     - Etiqueta de referència oficial acolorida (`#76911`, `#42115`, etc.).
     - Insígnia `★ Novetat` visible només per a peces noves.
     - Metadades clau: any de llançament, nombre de peces / escala i sèrie.
     - Descripció rica del model o conjunt.
   - **Botons d'acció principal i secundària**:
     - Botó principal: *+ Afegir a la meva col·lecció* (canvia a estat verd *✓ Ja és a la teva col·lecció*).
     - Botó secundari contornejat: *♡ Afegir a la llista de Desitjats* (commutable).

4. **Pantalla 4: La meva Col·lecció (`colleccio.html`)**
   - **Caixa d'estadístiques resum**: Indicadors numèrics en temps real de peces totals, recompte de LEGO i recompte de Hot Wheels.
   - **Doble pestanya commutable**:
     - **Pestanya "Tinc"**: Llista dels models que l'usuari posseeix.
     - **Pestanya "Desitjats"**: Llista de desitjos pendents d'adquirir.
   - **Gestió directa des de la llista**:
     - Cada fila és un enllaç interactiu que permet obrir la fitxa de detall del model.
     - A la pestanya de Desitjats s'inclou el botó ràpid **`+ Ja el tinc!`** per traspassar el model a la col·lecció d'un sol toc.
     - Botó d'eliminació ràpida (`✕`) amb actualització immediata dels comptadors.

5. **Pantalla 5: Perfil d'Usuari (`perfil.html`)**
   - Dades de l'usuari col·leccionista (nom, àlies, rang de col·leccionista).
   - Recompte consolidat de peces en propietat i peces desitjades.
   - Acció de manteniment: Botó per netejar les dades emmagatzemades al dispositiu (*Reset* de `localStorage`).

---

## FASE 3: Guia d'Estil (Style Guide)

### 3.1. Paleta de Colors Corporativa
S'han definit variables CSS (`:root`) per assegurar coherència, mantenibilitat i una forta vinculació visual amb les marques oficials:

| Concepte | Codi HEX | Mostra Visual | Ús a la Interfície |
| :--- | :--- | :--- | :--- |
| **LEGO Red** | `#E3000F` | 🟥 Vermell corporatiu | Capçalera, vora de targetes LEGO, botons principals i cors actius. |
| **LEGO Yellow** | `#FFD500` | 🟨 Groc brillant | Etiquetes de referència, detalls d'accent i vora de notificacions. |
| **Hot Wheels Blue** | `#0054A6` | 🟦 Blau elèctric | Vora de targetes Hot Wheels, metadades i accents de competició. |
| **Hot Wheels Orange**| `#F36F21` | 🟧 Taronja foc | Xip actiu de Hot Wheels i degradat de novetats. |
| **Novelty Gradient** | `linear-gradient(135deg, #FFB700, #FF5500)` | 🌟 Taronja / Daurat | Insígnies de Novetat (`★ NOU` i `★ Novetat`). |
| **Success Green** | `#00C853` | 🟩 Verd d'èxit | Estat actiu de peça guardada a la col·lecció i botó `+ Ja el tinc!`. |
| **Background Neutral**| `#F8F9FA` | ⚪ Fons clar | Fons global de l'aplicació per maximitzar el contrast dels productes. |
| **Surface White** | `#FFFFFF` | ⬜ Blanc pur | Fons de les targetes de producte, caixes i menús modals. |
| **Dark Neutral Text** | `#1A1A1A` | ⬛ Negre antracita | Títols principals i etiquetes per complir ràtios d'accessibilitat WCAG. |
| **Muted Text** | `#64748B` | 🔘 Gris pissarra | Descripcions secundàries, peces no trobades i missatges buits. |

---

### 3.2. Tipografia (Google Fonts)
S'utilitza una combinació de dues tipografies modernes de Google Fonts:

1. **Montserrat (Pesos: 600 Semi-Bold i 700 Bold)**:
   - **Ús**: Logotip corporatiu, encapçalaments de secció (`h1`, `h2`, `h3`), etiquetes d'insígnia, botons d'acció i xips.
   - **Justificació**: Tipografia geomètrica, potent i esportiva que transmet l'esperit dinàmic de Hot Wheels i la construcció sòlida de LEGO.
2. **Inter (Pesos: 400 Regular i 500 Medium)**:
   - **Ús**: Textos de descripció, paràgrafs, metadades i etiquetes numèriques.
   - **Justificació**: Alta llegibilitat en pantalles petites de smartphone gràcies a la seva gran alçada de la 'x' i espaiat equilibrat.

---

### 3.3. Components Visuals i Microinteraccions
- **Elevació i Ombres**: Ús d'ombres suaus (`box-shadow: 0 4px 12px rgba(0,0,0,0.07)`) per separar les targetes del fons sense carregar la interfície.
- **Feedback tàctil**: Efecte de compressió suau (`:active { transform: scale(0.96); }`) a botons i xips per simular la resposta mecànica d'un botó físic.
- **Notificacions Toast**: Missatge flotant centrat a la part superior amb animació d'entrada suau que desapareix automàticament als 2,2 segons.
- **Control d'imatges resilient**: Ràtio d'imatge controlat amb `object-fit: contain` sobre fons blanc protegit perquè cap producte quedi deformat.

---

## FASE 4: Desenvolupament Tècnic i Decisions d'Enginyeria Web

### 4.1. Estructura Semàntica i Privadesa
- Estructuració HTML5 basada en etiquetes semàntiques (`<header>`, `<main>`, `<section>`, `<article>`, `<nav>`) per garantir accessibilitat i facilitat de manteniment.
- Incorporació de la capçalera de privadesa a tots els documents:
  ```html
  <meta name="referrer" content="no-referrer">
  ```
  Aquesta decisió evita que els servidors d'imatges externs bloquegin la descàrrega de recursos per polítiques de *Hotlinking*, garantint una càrrega transparent tant en entorns de desenvolupament local com a GitHub Pages.

### 4.2. Lògica d'Estat i Persistència (Vanilla JavaScript ES6+)
S'ha desenvolupat la lògica completa sense fer ús de llibreries o dependències feixugues:
1. **Model de dades unificat**: Catàleg de 16 productes autèntics (8 de LEGO i 8 de Hot Wheels) amb atributs d'identificació única (`id`), marca, referència, any, metadades i indicador de novetat (`isNew`).
2. **Persistència en `localStorage`**:
   - `bd_collection`: Magatzem dels models adquirits per l'usuari.
   - `bd_wishlist`: Magatzem dels models desitjats.
   - **Neteja automàtica d'integritat**: Funcions `obtenirColleccioNeta` i `obtenirDesitjatsNeta` basades en `Map` que eliminen automàticament elements duplicats o corromputs.
3. **Mecanisme de seguretat visual (Fallback SVG en Base64)**:
   En cas d'absència de xarxa o fallada d'un enllaç extern, el controlador global `window.bdFallbackImg` substitueix la font per un vector SVG corporatiu incrustat en Base64, impedint que l'usuari vegi cap icona d'imatge trencada.

### 4.3. Desplegament a Producció (GitHub Pages)
- **Rutes 100% relatives**: Garantia d'execució en qualsevol subdirectori sense problemes de camins absoluts.
- **Fitxer `.nojekyll`**: Inclusió a l'arrel per evitar que el processador Jekyll de GitHub Pages alteri l'estructura de directoris estàtics.
