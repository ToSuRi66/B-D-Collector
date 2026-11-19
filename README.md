# 🏎️🧱 B&D Collector - LEGO & Hot Wheels Collector Web App

**Pràctica Final Trimestre 1** — Curs *IFC33B Disseny d'Interfícies Web*.  
Una aplicació web progressiva (*Mobile-First*) dissenyada específicament per a col·leccionistes i aficionats dels universos **LEGO** i **Hot Wheels**.

---

## 🌟 Característiques Destacades

1. **Catàleg Autèntic i Equilibrat (16 Productes Reals)**:
   - **8 Sets Oficials LEGO**: Des de clàssics *Speed Champions* (007 Aston Martin DB5, Dodge Charger 1970, Lamborghini Countach) fins a joies *Technic* (Lamborghini Sián FKP 37, Bugatti Bolide), *Botanical* (Bonsai) i *Icons* (Millennium Falcon UCS, DeLorean Back to the Future).
   - **8 Models Col·leccionista Hot Wheels**: Edicions *Car Culture*, *Japan Historics*, *Muscle Mania* i clàssics mítics (Toyota Supra MK4, Nissan Skyline GT-R R34, '69 Ford Mustang Boss, Classic TV Batmobile, '68 Custom Camaro, Bone Shaker, Twin Mill i Porsche 911 GT3 RS).

2. **Insígnies de Novetat (`★ NOU`)**:
   - Etiquetes visuals ressaltades a les cantonades de les targetes del catàleg i carrusels per a les darreres novetats.
   - Distintiu dinàmic `★ Novetat` a la fitxa de detall del producte.

3. **Doble Sistema de Gestió: Col·lecció ("Tinc") i Llista de Desitjats ("Desitjats")**:
   - Botó ràpid de cor (`♡` / `♥`) a totes les targetes per desar directament a Desitjats.
   - Botó d'acció ràpida `+` / `✓` per afegir o treure de la teva col·lecció personal.
   - Pàgina de Col·lecció interactiva amb pestanyes commutables (**"Tinc"** i **"Desitjats"**).
   - Accés directe des de qualsevol targeta de la col·lecció a la seva **fitxa de detall**.
   - Botó ràpid `+ Ja el tinc!` a la pestanya de Desitjats per moure un producte a la col·lecció d'un sol clic.
   - Persistència íntegra a `localStorage` sota les claus `bd_collection` i `bd_wishlist`.

4. **Filtres Intel·ligents i Cerca en Viu**:
   - Cerca instantània en temps real per nom de model o número de referència.
   - Selector per xips de marca (**Tots**, **LEGO**, **Hot Wheels**).
   - Panell inferior de filtres (*bottom sheet*) millorat amb animació suau sense talls inferiors, selector d'anys lliscant i visualitzador dinàmic del valor.

5. **Notificacions Flotants (*Toast*)**:
   - Feedback visual instantani en afegir o treure elements tant de la col·lecció com dels desitjats.

6. **Perfil d'Usuari i Estadístiques**:
   - Recompte automàtic del total de peces a la col·lecció, llista de desitjats, marques preferides i rang de col·leccionista.

---

## 📁 Estructura del Projecte

```text
PracticaFinalTrimestre1/
│
├── index.html         # Pantalla principal (Inici) amb carrusels temàtics
├── cataleg.html       # Catàleg complet amb filtres interactius i graella
├── detall.html        # Fitxa detallada del producte seleccionat (?id=...)
├── colleccio.html     # Gestor de peces en propietat i llista de desitjats
├── perfil.html        # Perfil de l'usuari amb mètriques i estadístiques
│
├── CSS/
│   └── styles.css     # Full d'estils global amb variables CSS i disseny responsiu
│
├── JS/
│   └── main.js        # Lògica JS modular, gestió d'estat i esdeveniments
│
├── .nojekyll          # Desactiva el processament Jekyll a GitHub Pages
└── README.md          # Documentació del projecte
```

---

## 🚀 Desplegament a GitHub Pages

El projecte està estructurat com una aplicació web estàtica pura (HTML5, CSS3 i Vanilla JavaScript), sense dependències ni passos de compilació necessaris. Totes les rutes de fitxers i navegació són **relatives**, garantint un funcionament immediat en qualsevol subdirectori d'allotjament estàtic.

### Passos per publicar a GitHub Pages:

1. **Pujar el codi al repositori de GitHub**:
   ```bash
   git add .
   git commit -m "Publicació de la versió final de B&D Collector"
   git push origin main
   ```

2. **Configurar GitHub Pages**:
   - Ves al teu repositori a GitHub.
   - Fes clic a la pestanya **Settings** (Configuració).
   - Al menú lateral esquerre, selecciona **Pages** (dins la secció *Code and automation*).
   - A l'apartat **Build and deployment**:
     - **Source**: Selecciona `Deploy from a branch`.
     - **Branch**: Tria `main` (o `master`) i la carpeta `/ (root)`.
     - Fes clic a **Save**.

3. **Accedir a la web**:
   - Passats uns segons/minuts, GitHub generarà el teu enllaç públic:
     `https://<el-teu-usuari>.github.io/<nom-del-repositori>/`
   - El fitxer `.nojekyll` inclòs a l'arrel assegura que totes les carpetes i recursos es carreguin sense restriccions.

---

## 🛠️ Tecnologies Emprades

- **HTML5 Semàntic**: Estructura accessible (`header`, `main`, `section`, `article`, `nav`).
- **CSS3 Modern**: CSS Grid, Flexbox, Variables CSS (Custom Properties), animacions clau (`@keyframes`), Mobile-First.
- **JavaScript (ES6+)**: `Promises`, `localStorage`, `URLSearchParams`, manipulació dinàmica del DOM, delegació d'esdeveniments.
- **Tipografies Google Fonts**: *Montserrat* (títols i rètols) i *Inter* (lectura neta i llegible).
