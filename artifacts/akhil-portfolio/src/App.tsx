import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import * as THREE from 'three';
import { ArrowDown, ArrowRight, ArrowUpRight, Github, Linkedin, Mail, Menu, MoveUpRight, Phone, X } from 'lucide-react';

const sections = [
  ['Work', '#work'],
  ['Experience', '#experience'],
  ['Education', '#education'],
  ['Toolkit', '#toolkit'],
  ['Contact', '#contact'],
] as const;

const projects = [
  {
    number: '01',
    title: 'Real-Time Financial\nFraud Detection System',
    type: 'STREAM PROCESSING · MACHINE LEARNING',
    stack: 'XGBoost / LightGBM / FastAPI / MLflow / AWS / Python / SQL',
    detail: [
      'Built a streaming fraud detection pipeline processing more than 500K transactions per day with Kafka and Flink, delivering model inference in under 100ms.',
      'Trained and evaluated on a highly imbalanced dataset: 0.17% fraud across 284K instances; reached an F1 score of 0.91.',
      'Established MLflow experiment tracking and Airflow / PSI drift monitoring, triggering retraining when PSI exceeds 0.20.',
      'Used 90/10 A/B testing to keep production accuracy within ±2% of training-set performance. GitHub Actions CI/CD on AWS runs Pytest, Great Expectations validation, Docker builds and zero-downtime Kubernetes deployments.',
    ],
    metric: '0.91',
    metricLabel: 'F1 SCORE',
  },
  {
    number: '02',
    title: 'Multi-Modal RAG\nDocument Intelligence',
    type: 'RETRIEVAL · DOCUMENT AI',
    stack: 'LangChain / ColBERT / Hugging Face / FastAPI / GitHub Actions / Python',
    detail: [
      'Built an intelligence platform over 500+ enterprise PDFs from SEC EDGAR, CUAD and PubMed, combining dense Weaviate retrieval with sparse BM25.',
      'Improved answer relevance by 34%, measured with RAGAs faithfulness, context precision and answer relevance; used ColBERT reranking with dense Weaviate retrieval and sparse BM25.',
      'Integrated GPT-4o Vision and Unstructured.io for tables, charts and scanned documents, expanding content coverage 3×; RAG-as-a-Judge evaluation reached 0.84 fidelity.',
      'Deployed multi-user Q&A on AWS EKS with response latency below 2 seconds.',
    ],
    metric: '3×',
    metricLabel: 'CONTENT COVERAGE',
  },
  {
    number: '03',
    title: 'Agentic Code Review &\nSecurity Scanner',
    type: 'AGENTIC SYSTEMS · APPLICATION SECURITY',
    stack: 'LangGraph / FastAPI / AWS Lambda / Python / GitHub Actions',
    detail: [
      'Designed a four-agent workflow: Orchestrator, Security, Style and Fix-Generation, initiated by GitHub pull-request webhooks.',
      'Scanned for OWASP Top 10 issues using Semgrep and the NVD CVE API; used BigVul with 25K function retrieval.',
      'Achieved 92% pattern-injection precision and 100% hardcoded-secret recall.',
      'Redis pub/sub supports reviews across 10+ files. Tested on five open-source projects, reducing vulnerability review time by 50%.',
    ],
    metric: '50%',
    metricLabel: 'LESS REVIEW TIME',
  },
];

const skills = [
  ['Programming', 'Python · SQL · R'],
  ['Machine learning', 'scikit-learn · XGBoost · LightGBM · Feature engineering · Evaluation · Hyperparameter tuning'],
  ['Statistics', 'Statistical & predictive modeling · Hypothesis testing'],
  ['Deep learning', 'Hugging Face Transformers · Transfer learning · Neural networks · Embeddings'],
  ['Data & visualization', 'Pandas · NumPy · Matplotlib · Seaborn · Power BI · Tableau · Excel · EDA'],
  ['Databases', 'MySQL · PostgreSQL · SQL Server'],
  ['Production ML', 'MLflow · Airflow · Docker · FastAPI · CI/CD · GitHub Actions · Monitoring · Data validation'],
  ['Generative AI', 'LangChain · LangGraph · RAG · Prompt engineering · Vector search'],
  ['Cloud & systems', 'AWS EKS / Lambda / RDS / MSK / ElastiCache · Databricks · Linux'],
  ['Tools', 'Git · GitHub · Jupyter · Pytest'],
];

function ArchitectureScene() {
  const host = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    const element = host.current;
    if (!element) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
    } catch {
      setWebglSupported(false);
      setReady(true);
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(element.clientWidth, element.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    element.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#e6e2d7');
    scene.fog = new THREE.Fog('#e6e2d7', 15, 33);
    const camera = new THREE.PerspectiveCamera(35, element.clientWidth / element.clientHeight, 0.1, 100);
    let theta = 0.62;
    let phi = 1.12;
    let radius = 15;
    const target = new THREE.Vector3(0, 1.1, 0);
    const updateCamera = () => {
      camera.position.set(
        target.x + radius * Math.sin(phi) * Math.sin(theta),
        target.y + radius * Math.cos(phi),
        target.z + radius * Math.sin(phi) * Math.cos(theta),
      );
      camera.lookAt(target);
    };
    updateCamera();

    scene.add(new THREE.HemisphereLight('#fff8e8', '#7a817f', 2));
    const sun = new THREE.DirectionalLight('#fff2d8', 3.2);
    sun.position.set(-6, 10, 7);
    scene.add(sun);
    const coolFill = new THREE.DirectionalLight('#b8c8cb', 1.3);
    coolFill.position.set(7, 5, -5);
    scene.add(coolFill);

    const stone = new THREE.MeshStandardMaterial({ color: '#c3bdb0', roughness: 0.86 });
    const paleStone = new THREE.MeshStandardMaterial({ color: '#d5cec0', roughness: 0.8 });
    const dark = new THREE.MeshStandardMaterial({ color: '#26394a', roughness: 0.5, metalness: 0.15 });
    const rust = new THREE.MeshStandardMaterial({ color: '#c77355', roughness: 0.58 });
    const glass = new THREE.MeshStandardMaterial({ color: '#88a6a8', roughness: 0.23, metalness: 0.14, transparent: true, opacity: 0.48, side: THREE.DoubleSide });
    const structure = new THREE.Group();
    scene.add(structure);
    const box = (w: number, h: number, d: number, x: number, y: number, z: number, material: THREE.Material) => {
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
      mesh.position.set(x, y, z);
      structure.add(mesh);
      return mesh;
    };

    // A walkable plinth, a rhythm of colonnades and offset data-like volumes.
    box(10, 0.28, 7, 0, -0.08, 0, paleStone);
    box(4.15, 0.17, 2.7, -1.72, 0.14, -0.62, dark);
    box(2.55, 0.16, 2.55, 2.04, 0.13, 1.16, rust);
    for (let x = -3.75; x <= 3.76; x += 1.25) {
      box(0.12, 3.4, 0.12, x, 1.82, -2.35, dark);
      box(0.12, 3.4, 0.12, x, 1.82, 2.38, dark);
    }
    box(8.5, 0.18, 0.18, 0, 3.55, -2.35, dark);
    box(8.5, 0.18, 0.18, 0, 3.55, 2.38, dark);
    box(0.2, 0.18, 4.9, -3.75, 3.55, 0, dark);
    box(0.2, 0.18, 4.9, 3.75, 3.55, 0, dark);
    // Floating, shifted room volumes create a small inhabitable composition.
    box(3.5, 1.72, 2.25, -1.85, 1.05, -0.85, paleStone);
    box(2.35, 1.24, 2.05, 1.68, 0.81, 1.05, stone);
    box(2.18, 0.13, 2.3, 1.63, 1.51, 1.05, rust);
    box(0.09, 1.25, 2.08, 0.48, 0.84, 1.05, dark);
    box(0.9, 1.45, 0.07, -2.5, 1.05, 0.28, glass);
    box(0.8, 1.45, 0.07, -1.12, 1.05, 0.28, glass);
    box(0.07, 1.12, 1.18, -0.06, 0.85, -0.67, glass);
    // Slender suspended beams and the finely gridded site.
    for (let i = -5; i <= 5; i++) {
      const lineX = new THREE.Mesh(new THREE.BoxGeometry(0.018, 0.012, 9.8), new THREE.MeshBasicMaterial({ color: '#697575', transparent: true, opacity: 0.22 }));
      lineX.position.set(i * 0.8, -0.19, 0);
      structure.add(lineX);
      const lineZ = new THREE.Mesh(new THREE.BoxGeometry(10, 0.012, 0.018), new THREE.MeshBasicMaterial({ color: '#697575', transparent: true, opacity: 0.22 }));
      lineZ.position.set(0, -0.185, i * 0.8);
      structure.add(lineZ);
    }
    for (let i = 0; i < 5; i++) box(0.04, 0.04, 4.4, -2 + i * 1, 3.72, 0.1, rust);
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), new THREE.MeshStandardMaterial({ color: '#e6e2d7', roughness: 1 }));
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.28;
    scene.add(ground);
    const grid = new THREE.GridHelper(60, 50, '#86908d', '#b6b8ad');
    grid.position.y = -0.265;
    (grid.material as THREE.Material).transparent = true;
    (grid.material as THREE.Material).opacity = 0.18;
    scene.add(grid);
    const onResize = () => {
      if (!host.current) return;
      const w = host.current.clientWidth;
      const h = host.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    const onPointerDown = (event: PointerEvent) => {
      dragging = true;
      lastX = event.clientX;
      lastY = event.clientY;
      element.setPointerCapture(event.pointerId);
    };
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    const onPointerMove = (event: PointerEvent) => {
      if (!dragging) return;
      theta += (event.clientX - lastX) * 0.006;
      phi = THREE.MathUtils.clamp(phi + (event.clientY - lastY) * 0.005, 0.48, 1.48);
      lastX = event.clientX;
      lastY = event.clientY;
      updateCamera();
    };
    const onPointerUp = () => { dragging = false; };
    const onWheel = (event: WheelEvent) => {
      radius = THREE.MathUtils.clamp(radius + event.deltaY * 0.008, 11, 21);
      updateCamera();
    };
    element.addEventListener('pointerdown', onPointerDown);
    element.addEventListener('pointermove', onPointerMove);
    element.addEventListener('pointerup', onPointerUp);
    element.addEventListener('pointercancel', onPointerUp);
    element.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('resize', onResize);
    setReady(true);
    let frame = 0;
    let animation = 0;
    const render = () => {
      animation = requestAnimationFrame(render);
      if (!dragging) {
        theta += 0.00055;
        updateCamera();
      }
      structure.rotation.y = Math.sin(frame * 0.002) * 0.012;
      renderer.render(scene, camera);
      frame++;
    };
    render();
    return () => {
      cancelAnimationFrame(animation);
      window.removeEventListener('resize', onResize);
      element.removeEventListener('pointerdown', onPointerDown);
      element.removeEventListener('pointermove', onPointerMove);
      element.removeEventListener('pointerup', onPointerUp);
      element.removeEventListener('pointercancel', onPointerUp);
      element.removeEventListener('wheel', onWheel);
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((material) => material.dispose());
        }
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div className="architecture-canvas relative h-full min-h-[380px] w-full overflow-hidden md:min-h-[540px]" ref={host} aria-label={webglSupported ? 'Interactive 3D architectural pavilion. Drag to orbit and scroll to zoom.' : 'Architectural pavilion illustration.'}>
      {!webglSupported && (
        <div className="architecture-fallback absolute inset-0 grid place-items-center" aria-label="Architectural pavilion illustration">
          <svg className="h-full w-full" viewBox="0 0 800 540" role="img" aria-label="Isometric architectural pavilion on a gridded site">
            <defs>
              <pattern id="site-grid" width="28" height="28" patternUnits="userSpaceOnUse" patternTransform="skewY(-29) scale(1 .72)">
                <path d="M 28 0 L 0 0 0 28" fill="none" stroke="#79837e" strokeOpacity=".27" strokeWidth="1" />
              </pattern>
              <linearGradient id="glass-gradient" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0" stopColor="#abc0bd" stopOpacity=".8" />
                <stop offset="1" stopColor="#708d91" stopOpacity=".6" />
              </linearGradient>
            </defs>
            <path d="M80 340 400 156 720 340 400 524Z" fill="url(#site-grid)" opacity=".9" />
            <path d="M110 350 400 182 690 350 400 518Z" fill="#d6d0c3" stroke="#9c9b8d" strokeWidth="1.5" />
            <path d="M110 350 400 518 400 535 110 367Z" fill="#b6afa1" />
            <path d="M400 518 690 350 690 367 400 535Z" fill="#918f86" />
            <g className="fallback-model">
              <path d="M216 327 400 220 584 327 400 434Z" fill="#bcb5a8" stroke="#777d78" strokeWidth="2" />
              <path d="M216 327 400 434 400 449 216 342Z" fill="#99978f" />
              <path d="M400 434 584 327 584 342 400 449Z" fill="#858982" />
              <path d="M235 314 235 230 251 221 251 323Z" fill="#26394a" />
              <path d="M235 230 400 135 416 144 251 239Z" fill="#415668" />
              <path d="M251 323 251 239 416 144 416 348Z" fill="#2c4052" opacity=".2" />
              <path d="M384 412 384 326 400 317 400 421Z" fill="#26394a" />
              <path d="M400 421 400 317 416 326 416 430Z" fill="#405365" />
              <path d="M549 332 549 248 565 239 565 341Z" fill="#26394a" />
              <path d="M384 326 549 231 565 240 400 335Z" fill="#526577" />
              <path d="M214 229 400 121 586 229 400 337Z" fill="#d4cdbf" stroke="#26394a" strokeWidth="4" />
              <path d="M214 229 400 337 400 351 214 243Z" fill="#aaa597" />
              <path d="M400 337 586 229 586 243 400 351Z" fill="#85877f" />
              <path d="M279 282 355 238 355 325 279 369Z" fill="url(#glass-gradient)" stroke="#26394a" strokeWidth="2" />
              <path d="M279 282 293 290 293 360 279 369Z" fill="#f0eadc" fillOpacity=".65" />
              <path d="M452 274 518 236 518 315 452 353Z" fill="#c77355" />
              <path d="M518 236 536 246 536 325 518 315Z" fill="#9f553f" />
              <path d="M452 274 518 236 536 246 470 285Z" fill="#d48b6d" />
              <path d="M362 216 400 194 439 216" fill="none" stroke="#c77355" strokeWidth="5" />
              <path d="M400 195V306M307 248V354M493 248V355" fill="none" stroke="#e8e0d1" strokeOpacity=".72" strokeWidth="2" />
              <path d="M190 400 400 522M610 400 400 522" stroke="#26394a" strokeOpacity=".24" strokeWidth="1" />
              <path d="M400 522 400 186" stroke="#26394a" strokeOpacity=".16" strokeWidth="1" />
            </g>
          </svg>
        </div>
      )}
      {!ready && <div className="absolute inset-0 grid place-items-center bg-[#e6e2d7]"><span className="mono text-[10px] uppercase tracking-[.24em] text-[#59646a]">Constructing spatial model</span></div>}
      <div className="pointer-events-none absolute bottom-5 left-5 z-10 flex items-center gap-2 text-[10px] uppercase tracking-[.17em] text-[#38464a]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#c77355]" /> {webglSupported ? <>Drag to orbit <span className="mx-1 opacity-40">/</span> Scroll to zoom</> : 'Static architectural preview'}
      </div>
      <div className="pointer-events-none absolute right-5 top-5 z-10 mono text-[10px] tracking-[.15em] text-[#66706d]">FIG. 01 — COMPUTATIONAL PAVILION</div>
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const depthSurfaceRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reducedMotion) return;

    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;
    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        document.documentElement.style.setProperty('--pointer-x', `${pointerX}px`);
        document.documentElement.style.setProperty('--pointer-y', `${pointerY}px`);
        cursorRef.current?.classList.add('is-visible');
        const overInteractive = document.elementFromPoint(pointerX, pointerY)?.closest('a, button, [data-depth]');
        cursorRef.current?.classList.toggle('is-interactive', Boolean(overInteractive));
        frame = 0;
      });
    };
    const hideCursor = () => cursorRef.current?.classList.remove('is-visible', 'is-interactive');
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('blur', hideCursor);
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('blur', hideCursor);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const resetDepthSurface = () => {
    const surface = depthSurfaceRef.current;
    if (!surface) return;
    surface.classList.remove('depth-active');
    surface.style.removeProperty('--tilt-x');
    surface.style.removeProperty('--tilt-y');
    depthSurfaceRef.current = null;
  };

  const handleDepthPointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    if (
      event.pointerType === 'touch' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      resetDepthSurface();
      return;
    }
    const surface = (event.target as Element).closest<HTMLElement>('[data-depth]');
    if (surface !== depthSurfaceRef.current) resetDepthSurface();
    if (!surface) return;
    depthSurfaceRef.current = surface;
    const bounds = surface.getBoundingClientRect();
    const horizontal = (event.clientX - bounds.left) / bounds.width - 0.5;
    const vertical = (event.clientY - bounds.top) / bounds.height - 0.5;
    surface.style.setProperty('--tilt-x', `${-vertical * 3}deg`);
    surface.style.setProperty('--tilt-y', `${horizontal * 4}deg`);
    surface.classList.add('depth-active');
  };

  return (
    <main
      className="page-grain min-h-[100dvh] overflow-hidden"
      onPointerMove={handleDepthPointerMove}
      onPointerLeave={resetDepthSurface}
    >
      <div className="cursor-orbit" ref={cursorRef} aria-hidden="true" />
      <header className="sticky top-0 z-30 border-b border-[#202b3a]/15 bg-[#efede5]/90 backdrop-blur-md">
        <div className="mx-auto flex h-[68px] max-w-[1440px] items-center justify-between px-5 md:px-10">
          <a href="#top" aria-label="Sompalli Akhil Kumar — home" className="flex items-center gap-3">
            <span className="grid h-8 w-8 place-items-center border border-[#202b3a]/35 mono text-[11px]">SA</span>
            <span className="mono text-[10px] uppercase tracking-[.16em]">Sompalli Akhil Kumar</span>
          </a>
          <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
            {sections.map(([label, href]) => <a key={href} className="nav-link mono text-[10px] uppercase tracking-[.13em] text-[#59636a]" href={href}>{label}</a>)}
          </nav>
          <a className="hidden items-center gap-2 mono text-[10px] uppercase tracking-[.14em] md:flex" href="mailto:akhilsompalli007@gmail.com">Let&apos;s talk <ArrowUpRight size={14} /></a>
          <button className="grid h-10 w-10 place-items-center md:hidden" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={19} /> : <Menu size={19} />}</button>
        </div>
        {menuOpen && <nav className="grid gap-4 border-t border-[#202b3a]/15 bg-[#efede5] px-6 py-5 md:hidden" aria-label="Mobile navigation">{sections.map(([label, href]) => <a key={href} className="mono text-xs uppercase tracking-[.14em]" href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}</nav>}
      </header>

      <section id="top" className="mx-auto max-w-[1440px] px-5 pb-8 pt-10 md:px-10 md:pt-14">
        <div className="mb-8 flex items-center justify-between reveal">
          <span className="mono text-[10px] uppercase tracking-[.19em] text-[#69716e]">Portfolio / 2025—26</span>
          <span className="mono text-[10px] uppercase tracking-[.19em] text-[#69716e]">Tirupati, India <span className="ml-2 text-[#bd674e]">●</span></span>
        </div>
        <div className="grid items-end gap-8 lg:grid-cols-[.9fr_1.1fr]">
          <div className="relative z-10 pb-6 reveal-delay">
            <p className="mb-5 mono text-[10px] uppercase tracking-[.2em] text-[#bd674e]">Computer science × data science</p>
            <h1 className="serif max-w-[750px] text-[clamp(3.25rem,7.2vw,7.4rem)] leading-[.91] tracking-[-.055em] text-[#202b3a]">
              Building<br /><em className="font-medium text-[#bd674e]">intelligence</em><br />with structure.
            </h1>
            <div className="mt-8 flex max-w-[540px] items-start gap-4">
              <span className="mt-2 h-px w-10 shrink-0 bg-[#bd674e]" />
              <p className="max-w-[390px] text-[14px] leading-6 text-[#59636a]">
                I&apos;m Sompalli Akhil Kumar, a computer science and data science student exploring the architecture behind useful machine intelligence.
              </p>
            </div>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <a href="#work" className="inline-flex items-center gap-3 bg-[#26394a] px-5 py-3 text-[11px] uppercase tracking-[.13em] text-[#f3f0e8] transition-colors hover:bg-[#bd674e]">Explore selected work <ArrowDown size={14} /></a>
              <span className="mono text-[10px] text-[#727873]">SVUCE · B.Tech CSE · 2026</span>
            </div>
          </div>
          <div className="relative min-w-0 border border-[#202b3a]/15 bg-[#e6e2d7]">
            <div className="absolute -left-3 top-8 z-10 hidden h-16 w-px bg-[#bd674e] lg:block" />
            <ArchitectureScene />
          </div>
        </div>
        <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-[#202b3a]/15 pt-4 mono text-[9px] uppercase tracking-[.15em] text-[#69716e]">
          <span>Spatial systems / Applied ML / Generative AI</span>
          <span>01 — 05 / A study in connected systems</span>
        </div>
      </section>

      <section id="work" className="mx-auto max-w-[1440px] px-5 pb-24 pt-16 md:px-10 md:pb-32 md:pt-28">
        <div className="section-rule grid gap-7 pb-9 pt-5 md:grid-cols-[.6fr_1.4fr]">
          <span className="mono text-[10px] uppercase tracking-[.17em] text-[#bd674e]">01 / Selected work</span>
          <div className="flex items-end justify-between gap-4">
            <h2 className="serif text-4xl leading-none tracking-[-.04em] md:text-6xl">Systems in practice.</h2>
            <span className="hidden mono text-[10px] uppercase tracking-[.15em] text-[#717770] md:block">Three applied research builds</span>
          </div>
        </div>
        <div className="divide-y divide-[#202b3a]/20 border-y border-[#202b3a]/20">
          {projects.map((project) => (
            <article key={project.number} data-depth className="project-card grid gap-6 px-3 py-8 md:grid-cols-[.24fr_1fr_.34fr] md:gap-10 md:px-5 md:py-12">
              <div className="flex items-start justify-between md:block">
                <span className="serif text-4xl text-[#bd674e]">{project.number}</span>
                <span className="md:hidden mono text-[9px] uppercase tracking-[.12em] text-[#707871]">{project.type}</span>
              </div>
              <div>
                <span className="hidden mono text-[9px] uppercase tracking-[.15em] text-[#bd674e] md:block">{project.type}</span>
                <h3 className="serif mt-2 whitespace-pre-line text-[clamp(1.8rem,3.7vw,3.35rem)] leading-[1.04] tracking-[-.035em]">{project.title}</h3>
                <p className="mt-4 max-w-3xl mono text-[10px] leading-5 text-[#6a716d]">{project.stack}</p>
                <ul className="mt-6 grid gap-3 md:grid-cols-2">
                  {project.detail.map((point) => <li key={point} className="flex gap-3 pr-2 text-[13px] leading-[1.7] text-[#4e5a60]"><span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-[#bd674e]" />{point}</li>)}
                </ul>
              </div>
              <div className="flex items-end justify-between border-t border-[#202b3a]/15 pt-4 md:flex-col md:items-end md:justify-between md:border-l md:border-t-0 md:pt-0 md:pl-6">
                <span className="serif text-5xl tracking-[-.05em] md:text-6xl">{project.metric}</span>
                <span className="mono text-[9px] uppercase tracking-[.16em] text-[#6e7771]">{project.metricLabel}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="experience" className="bg-[#26394a] text-[#f0eee6]">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-16 md:grid-cols-[.6fr_1.4fr] md:px-10 md:py-24">
          <div>
            <span className="mono text-[10px] uppercase tracking-[.17em] text-[#e39b7b]">02 / Experience</span>
            <h2 className="serif mt-8 text-5xl leading-[.98] tracking-[-.04em] md:text-6xl">Learning<br />in the field.</h2>
          </div>
          <article data-depth className="border-t border-[#f0eee6]/25 pt-5 md:mt-16">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
              <div>
                <h3 className="serif text-3xl md:text-4xl">Machine Learning Intern</h3>
                <p className="mt-2 text-sm text-[#d8dcd5]">Ceeras IT Solutions <span className="text-[#e39b7b]">/</span> Tirupati</p>
              </div>
              <span className="mono text-[10px] uppercase tracking-[.15em] text-[#c0c9c8]">Sep 2025 — Jan 2026 · Hybrid</span>
            </div>
            <ul className="mt-8 grid gap-4 md:grid-cols-2">
              <li className="flex gap-3 text-[13px] leading-6 text-[#d4dad5]"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#e39b7b]" />Built a hybrid content-based and collaborative course recommender, repeatedly testing and tuning models to improve recommendations.</li>
              <li className="flex gap-3 text-[13px] leading-6 text-[#d4dad5]"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#e39b7b]" />Created a preprocessing pipeline for 10K+ records, handling nulls, encoding features and normalizing user interactions; served recommendations through a real-time FastAPI / Flask REST API.</li>
            </ul>
          </article>
        </div>
      </section>

      <section id="education" className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-28">
        <div className="grid gap-10 md:grid-cols-[.6fr_1.4fr]">
          <div>
            <span className="mono text-[10px] uppercase tracking-[.17em] text-[#bd674e]">03 / Education</span>
            <h2 className="serif mt-8 text-5xl leading-[.98] tracking-[-.04em] md:text-6xl">Two ways<br />of seeing.</h2>
          </div>
          <div className="divide-y divide-[#202b3a]/20 border-y border-[#202b3a]/20">
            <article data-depth className="grid gap-5 py-7 sm:grid-cols-[1fr_auto] sm:items-end">
              <div>
                <p className="mono text-[9px] uppercase tracking-[.15em] text-[#bd674e]">Bachelor of Technology · Computer Science & Engineering</p>
                <h3 className="serif mt-3 text-2xl leading-tight md:text-3xl">Sri Venkateswara University<br className="hidden md:block" /> College of Engineering</h3>
                <p className="mt-2 text-[13px] text-[#667078]">Tirupati</p>
              </div>
              <div className="flex items-end justify-between gap-8 sm:flex-col sm:items-end">
                <span className="serif text-3xl">8.38<span className="ml-1 text-base text-[#758078]">/ 10.00</span></span>
                <span className="mono text-[9px] uppercase tracking-[.13em] text-[#717873]">Nov 2022 — May 2026</span>
              </div>
            </article>
            <article data-depth className="grid gap-5 py-7 sm:grid-cols-[1fr_auto] sm:items-end">
              <div>
                <p className="mono text-[9px] uppercase tracking-[.15em] text-[#bd674e]">Bachelor of Science · Data Science & Applications</p>
                <h3 className="serif mt-3 text-2xl leading-tight md:text-3xl">Indian Institute of Technology<br className="hidden md:block" /> Madras</h3>
              </div>
              <div className="flex items-end justify-between gap-8 sm:flex-col sm:items-end">
                <span className="serif text-3xl">7.52<span className="ml-1 text-base text-[#758078]">/ 10.00</span></span>
                <span className="mono text-[9px] uppercase tracking-[.13em] text-[#717873]">Sep 2023 — Present</span>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="toolkit" className="border-y border-[#202b3a]/15 bg-[#e6e2d7]">
        <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10 md:py-24">
          <div className="grid gap-7 md:grid-cols-[.6fr_1.4fr]">
            <div>
              <span className="mono text-[10px] uppercase tracking-[.17em] text-[#bd674e]">04 / Toolkit</span>
              <h2 className="serif mt-8 text-5xl leading-[.98] tracking-[-.04em] md:text-6xl">A working<br />vocabulary.</h2>
              <p className="mt-5 max-w-[280px] text-[13px] leading-6 text-[#657078]">From raw data to deployed intelligence, tools selected to make systems useful.</p>
            </div>
            <div className="grid sm:grid-cols-2">
              {skills.map(([name, values], i) => (
                <div key={name} data-depth className={`border-t border-[#202b3a]/20 py-4 ${i % 2 === 0 ? 'sm:mr-6' : 'sm:ml-6'}`}>
                  <h3 className="mono text-[9px] uppercase tracking-[.15em] text-[#bd674e]">{name}</h3>
                  <p className="mt-2 text-[12px] leading-[1.75] text-[#36444d]">{values}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-16 md:px-10 md:py-24">
        <div className="grid gap-9 md:grid-cols-[.6fr_1.4fr]">
          <div>
            <span className="mono text-[10px] uppercase tracking-[.17em] text-[#bd674e]">05 / Credentials</span>
            <h2 className="serif mt-8 text-5xl leading-[.98] tracking-[-.04em] md:text-6xl">Earned<br />curiosity.</h2>
          </div>
          <div className="grid content-start gap-0 sm:grid-cols-2">
            <div data-depth className="border-t border-[#202b3a]/20 py-5 sm:mr-6">
              <span className="mono text-[9px] uppercase tracking-[.14em] text-[#bd674e]">Oracle Cloud Infrastructure</span>
              <p className="mt-2 serif text-xl">Data Science Professional</p>
              <p className="mt-1 serif text-xl">Generative AI Professional</p>
            </div>
            <div data-depth className="border-t border-[#202b3a]/20 py-5 sm:ml-6">
              <span className="mono text-[9px] uppercase tracking-[.14em] text-[#bd674e]">NPTEL / SWAYAM</span>
              <p className="mt-2 text-[13px] leading-6">Data Analytics<br />Internet of Things<br />Cloud Computing</p>
            </div>
            <div data-depth className="border-t border-[#202b3a]/20 py-5 sm:mr-6">
              <span className="mono text-[9px] uppercase tracking-[.14em] text-[#bd674e]">Coursera · Google</span>
              <p className="mt-2 serif text-xl">Google Advanced Data Analytics</p>
            </div>
            <div data-depth className="border-t border-[#202b3a]/20 py-5 sm:ml-6">
              <span className="mono text-[9px] uppercase tracking-[.14em] text-[#bd674e]">Coursera · IBM</span>
              <p className="mt-2 serif text-xl">IBM Data Science</p>
            </div>
          </div>
        </div>
      </section>

      <footer id="contact" className="bg-[#26394a] text-[#f0eee6]">
        <div className="mx-auto max-w-[1440px] px-5 pb-7 pt-14 md:px-10 md:pb-9 md:pt-20">
          <div className="grid gap-10 md:grid-cols-[.6fr_1.4fr]">
            <div>
              <span className="mono text-[10px] uppercase tracking-[.17em] text-[#e39b7b]">06 / Open channel</span>
              <p className="mt-8 mono text-[10px] uppercase tracking-[.15em] text-[#c0c9c8]">Have a good problem?</p>
            </div>
            <div>
              <h2 data-depth className="serif max-w-3xl text-[clamp(3rem,8vw,7rem)] leading-[.9] tracking-[-.06em]">Let&apos;s make<br /><em className="font-medium text-[#e39b7b]">something matter.</em></h2>
              <a href="mailto:akhilsompalli007@gmail.com" className="mt-8 inline-flex items-center gap-3 border-b border-[#e39b7b]/70 pb-2 text-sm hover:text-[#e39b7b]">akhilsompalli007@gmail.com <MoveUpRight size={15} /></a>
              <div className="mt-9 flex flex-wrap gap-x-7 gap-y-4 text-[12px] text-[#d4dad5]">
                <a className="inline-flex items-center gap-2 hover:text-[#e39b7b]" href="tel:+917671838967"><Phone size={14} /> +91 76718 38967</a>
                <a className="inline-flex items-center gap-2 hover:text-[#e39b7b]" href="https://github.com/SompalliAkhilKumar" target="_blank" rel="noreferrer"><Github size={15} /> GitHub <ArrowRight size={12} /></a>
                <a className="inline-flex items-center gap-2 hover:text-[#e39b7b]" href="https://www.linkedin.com/in/sompalli-akhil-kumar-60139b294/?isSelfProfile=true" target="_blank" rel="noreferrer"><Linkedin size={15} /> LinkedIn <ArrowRight size={12} /></a>
                <a className="inline-flex items-center gap-2 hover:text-[#e39b7b]" href="mailto:akhilsompalli007@gmail.com"><Mail size={14} /> Email</a>
              </div>
            </div>
          </div>
          <div className="mt-16 flex flex-col justify-between gap-3 border-t border-[#f0eee6]/20 pt-4 mono text-[9px] uppercase tracking-[.14em] text-[#bdc6c4] sm:flex-row">
            <span>Sompalli Akhil Kumar · Tirupati, India</span>
            <a href="#top" className="inline-flex items-center gap-2 hover:text-[#e39b7b]">Back to beginning <ArrowUpRight size={12} /></a>
            <span>Designed as a system in space · 2025—26</span>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default App;
