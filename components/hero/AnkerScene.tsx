"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, Lightformer } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * Tokens aus dem Hausdesign — 3D darf keine eigene Palette erfinden.
 * Müssen zu :root in app/globals.css passen.
 */
const ACCENT = "#45a182";
const ACCENT_DEEP = "#1b4d3e";
const ACCENT_HOVER = "#5cbe9b";
const INK = "#eceae3";
/**
 * Der Körperton des Ankers. Bewusst heller als --accent-deep: bei einem
 * metallischen Material bestimmt die Umgebung die Helligkeit, und die ist
 * hier fast schwarz. Mit #1b4d3e blieb der Anker eine schwarze Silhouette.
 * Gleiche Akzentfamilie, nur eine Stufe heller — kein zweiter Akzent.
 */
const ANKER_METALL = "#2f7a61";

/**
 * Der Ankerkörper, extrudiert aus einer 2D-Kontur. Bewusst als Shape
 * statt als geladenes Modell: kein Netzwerk-Asset, kein Blocking-Download,
 * und der Umriss bleibt exakt der Marke aus components/Anker.tsx treu.
 */
function ankerGeometrie() {
  const s = new THREE.Shape();
  const b = 0.09; // halbe Strichstärke des Schafts

  // Schaft von oben nach unten
  s.moveTo(-b, 1.55);
  s.lineTo(b, 1.55);
  s.lineTo(b, -1.15);

  // Rechter Fluke: Bogen nach außen, Widerhaken, zurück
  s.quadraticCurveTo(0.95, -1.15, 1.02, -0.34);
  s.lineTo(1.36, -0.42);
  s.quadraticCurveTo(1.3, -1.72, 0, -1.78);
  s.quadraticCurveTo(-1.3, -1.72, -1.36, -0.42);
  s.lineTo(-1.02, -0.34);
  s.quadraticCurveTo(-0.95, -1.15, -b, -1.15);

  s.lineTo(-b, 1.55);

  return new THREE.ExtrudeGeometry(s, {
    depth: 0.16,
    bevelEnabled: true,
    bevelThickness: 0.035,
    bevelSize: 0.035,
    bevelSegments: 3,
    curveSegments: 24,
  }).center();
}

function AnkerKoerper() {
  const gruppe = useRef<THREE.Group>(null);
  const zeiger = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  const geo = useMemo(() => ankerGeometrie(), []);
  const querbalken = useMemo(
    () => new THREE.CapsuleGeometry(0.085, 1.1, 4, 12),
    [],
  );
  const ring = useMemo(() => new THREE.TorusGeometry(0.24, 0.075, 12, 40), []);

  useFrame((state, delta) => {
    if (!gruppe.current) return;

    // Zeigerposition in Weltkoordinaten — pointer ist bereits auf [-1,1] normiert.
    zeiger.current.x = state.pointer.x * 0.32;
    zeiger.current.y = state.pointer.y * 0.22;

    // Langsame Grundrotation plus sanftes Nachführen zum Zeiger.
    gruppe.current.rotation.y += delta * 0.28;
    gruppe.current.rotation.x = THREE.MathUtils.lerp(
      gruppe.current.rotation.x,
      -zeiger.current.y,
      0.05,
    );
    gruppe.current.rotation.z = THREE.MathUtils.lerp(
      gruppe.current.rotation.z,
      zeiger.current.x * 0.5,
      0.05,
    );
  });

  // Auf schmalen Viewports das Objekt verkleinern, damit es nicht anschneidet.
  const skalierung = Math.min(1, viewport.width / 6.2);

  return (
    <Float speed={1.1} rotationIntensity={0} floatIntensity={0.35} floatingRange={[-0.08, 0.08]}>
      <group ref={gruppe} scale={skalierung}>
        <mesh geometry={geo} castShadow>
          {/* Hoher Metallanteil, niedrige Rauheit: auf dunklem Grund entsteht
              der Eindruck von poliertem Metall statt von farbigem Plastik. */}
          <meshStandardMaterial
            color={ANKER_METALL}
            metalness={0.72}
            roughness={0.28}
            envMapIntensity={2.2}
          />
        </mesh>

        {/* Querbalken (Stock) des Ankers */}
        <mesh geometry={querbalken} position={[0, 0.62, 0]} rotation={[0, 0, Math.PI / 2]}>
          <meshStandardMaterial
            color={ANKER_METALL}
            metalness={0.72}
            roughness={0.28}
            envMapIntensity={2.2}
          />
        </mesh>

        {/* Ring am Kopf — die Öse. Etwas heller, damit der Kopf liest. */}
        <mesh geometry={ring} position={[0, 1.42, 0]}>
          <meshStandardMaterial
            color={ACCENT}
            metalness={0.85}
            roughness={0.18}
            envMapIntensity={2.4}
          />
        </mesh>
      </group>
    </Float>
  );
}

/**
 * Die Kompassrose hinter dem Anker: ein statischer Ring aus feinen Strichen,
 * der langsam gegenläufig dreht. Gibt dem Objekt Tiefe ohne zweites Signal.
 */
function Kompassrose() {
  const gruppe = useRef<THREE.Group>(null);

  const striche = useMemo(() => {
    const items: { winkel: number; lang: boolean }[] = [];
    for (let i = 0; i < 48; i++) {
      items.push({ winkel: (i / 48) * Math.PI * 2, lang: i % 4 === 0 });
    }
    return items;
  }, []);

  useFrame((_, delta) => {
    if (gruppe.current) gruppe.current.rotation.z -= delta * 0.06;
  });

  return (
    <group ref={gruppe} position={[0, 0, -1.4]}>
      {striche.map((s, i) => {
        const r = 2.5;
        const laenge = s.lang ? 0.28 : 0.13;
        return (
          <mesh
            key={i}
            position={[Math.cos(s.winkel) * r, Math.sin(s.winkel) * r, 0]}
            rotation={[0, 0, s.winkel]}
          >
            <planeGeometry args={[laenge, 0.012]} />
            <meshBasicMaterial
              color={INK}
              transparent
              opacity={s.lang ? 0.22 : 0.1}
            />
          </mesh>
        );
      })}
    </group>
  );
}

export default function AnkerScene({ aktiv = true }: { aktiv?: boolean }) {
  return (
    <Canvas
      // dpr gedeckelt: auf Retina kostet 3x Pixel Performance ohne sichtbaren Gewinn.
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 6], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      // Weggescrollt = kein einziger Frame mehr. Sonst rechnet die GPU
      // dauerhaft an einem Bild, das niemand sieht.
      frameloop={aktiv ? "always" : "never"}
      style={{ background: "transparent" }}
    >
      {/* Bewusst KEIN <color attach="background">: der Canvas bleibt
          transparent, damit der Lichtschein der Sektion durchscheint. */}

      {/*
        Die Environment Map ist bei Metall nicht Kosmetik, sondern Pflicht:
        ein metallisches Material hat keine eigene Farbe, es zeigt nur seine
        Umgebung. Ohne Umgebung rendert es schwarz — genau das passierte hier.

        Gebaut aus Lightformern statt aus einer HDR-Datei: wird lokal einmal
        (frames={1}) in eine 128er-Cubemap gerendert. Kein Download, kein
        Blocking-Asset, kein Lighthouse-Verlust.
      */}
      <Environment resolution={128} frames={1}>
        {/* Grundreflexion: eine große, schwache Fläche auf Kamera-Seite.
            Ohne sie spiegelt das Metall nur Schwarz zwischen den Glanzkanten
            und der Anker fällt zu einer Silhouette zusammen. */}
        <Lightformer
          form="rect"
          intensity={0.5}
          position={[0, 0, 7]}
          scale={[14, 14, 1]}
          color={ACCENT_DEEP}
          target={[0, 0, 0]}
        />

        {/* Weiches Key-Light oben — die lange Glanzkante auf dem Schaft. */}
        <Lightformer
          form="rect"
          intensity={2.4}
          position={[0, 4, 3]}
          scale={[9, 4, 1]}
          color={INK}
          target={[0, 0, 0]}
        />
        {/* Akzent-Rim von links unten: hebt die Silhouette vom Grund ab. */}
        <Lightformer
          form="rect"
          intensity={2}
          position={[-5, -2, 2]}
          scale={[5, 4, 1]}
          color={ACCENT_HOVER}
          target={[0, 0, 0]}
        />
        {/* Gegenkante rechts hinten — gibt dem Körper Tiefe. */}
        <Lightformer
          form="rect"
          intensity={1.6}
          position={[5, 1, -3]}
          scale={[4, 5, 1]}
          color={ACCENT}
          target={[0, 0, 0]}
        />
      </Environment>

      <ambientLight intensity={0.15} />
      {/* Ein einzelnes gerichtetes Licht für die harte Kante; den Rest
          macht jetzt die Environment Map. */}
      <directionalLight position={[4, 5, 6]} intensity={1.2} color={INK} />

      <Kompassrose />
      <AnkerKoerper />
    </Canvas>
  );
}
