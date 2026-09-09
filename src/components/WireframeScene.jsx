import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function WireframeScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // ================= SCENE =================
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      1,
      0.1,
      100
    );

    camera.position.set(0, 0, 6);
    camera.lookAt(0, 0, 0);

    // ================= RENDERER =================
    let renderer;

    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch (error) {
      console.error("WebGL initialization failed:", error);
      return;
    }

    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio || 1, 1.5)
    );

    renderer.setClearColor(0x000000, 0);

    // Important for desktop browsers
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";
    renderer.domElement.style.pointerEvents = "none";
    renderer.domElement.style.zIndex = "0";

    mount.appendChild(renderer.domElement);

    // ================= COLORS =================
    const orange = 0xf97316;
    const blue = 0x38bdf8;
    const violet = 0xa78bfa;

    // ================= MATERIALS =================

    const coreMat = new THREE.MeshBasicMaterial({
      color: orange,
      wireframe: true,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
    });

    const ringMat = new THREE.MeshBasicMaterial({
      color: blue,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
      depthWrite: false,
    });

    const haloMat = new THREE.MeshBasicMaterial({
      color: violet,
      wireframe: true,
      transparent: true,
      opacity: 0.1,
      depthWrite: false,
    });

    // ================= GEOMETRY =================

    const coreGeo = new THREE.IcosahedronGeometry(
      1.5,
      1
    );

    const ringGeo = new THREE.TorusGeometry(
      2.2,
      0.006,
      8,
      96
    );

    const haloGeo = new THREE.IcosahedronGeometry(
      2.05,
      0
    );

    // ================= OBJECTS =================

    const inner = new THREE.Mesh(
      coreGeo,
      coreMat
    );

    const ring = new THREE.Mesh(
      ringGeo,
      ringMat
    );

    const halo = new THREE.Mesh(
      haloGeo,
      haloMat
    );

    inner.position.set(0, 0, 0);
    ring.position.set(0, 0, 0);
    halo.position.set(0, 0, 0);

    ring.rotation.x = Math.PI / 2.4;

    scene.add(inner);
    scene.add(ring);
    scene.add(halo);

    // ================= PARTICLES =================

    const count = 100;

    const particleGeo = new THREE.BufferGeometry();

    const positions = new Float32Array(
      count * 3
    );

    const colors = new Float32Array(
      count * 3
    );

    const cOrange = new THREE.Color(orange);
    const cBlue = new THREE.Color(blue);

    for (let i = 0; i < count; i++) {
      positions[i * 3] =
        (Math.random() - 0.5) * 9;

      positions[i * 3 + 1] =
        (Math.random() - 0.5) * 9;

      positions[i * 3 + 2] =
        (Math.random() - 0.5) * 9;

      const color =
        Math.random() > 0.72
          ? cBlue
          : cOrange;

      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    particleGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(
        positions,
        3
      )
    );

    particleGeo.setAttribute(
      "color",
      new THREE.BufferAttribute(
        colors,
        3
      )
    );

    const particleMat =
      new THREE.PointsMaterial({
        size: 0.018,
        vertexColors: true,
        transparent: true,
        opacity: 0.42,
        depthWrite: false,
      });

    const points = new THREE.Points(
      particleGeo,
      particleMat
    );

    scene.add(points);

    // ================= RESPONSIVE SIZE =================

    const setSize = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;

      if (width <= 0 || height <= 0) {
        return;
      }

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(
        width,
        height,
        false
      );

      renderer.render(
        scene,
        camera
      );
    };

    // Initial sizing
    setSize();

    // Browser layout can settle after mount
    requestAnimationFrame(() => {
      setSize();
    });

    setTimeout(() => {
      setSize();
    }, 100);

    setTimeout(() => {
      setSize();
    }, 500);

    // ================= RESIZE OBSERVER =================

    const resizeObserver =
      new ResizeObserver(() => {
        setSize();
      });

    resizeObserver.observe(mount);

    window.addEventListener(
      "resize",
      setSize,
      { passive: true }
    );

    // ================= MOUSE =================

    let mx = 0;
    let my = 0;

    let tx = 0;
    let ty = 0;

    const onMove = (e) => {
      tx =
        (e.clientX /
          window.innerWidth) *
          2 -
        1;

      ty =
        -(e.clientY /
          window.innerHeight) *
          2 +
        1;
    };

    window.addEventListener(
      "mousemove",
      onMove,
      { passive: true }
    );

    // ================= VISIBILITY =================

    let running = true;

    const io =
      new IntersectionObserver(
        ([entry]) => {
          running =
            entry.isIntersecting;

          if (running) {
            setSize();
          }
        },
        {
          threshold: 0,
        }
      );

    io.observe(mount);

    // ================= ANIMATION =================

    let raf = 0;

    const tick = () => {
      raf =
        requestAnimationFrame(tick);

      if (!running) return;

      mx +=
        (tx - mx) * 0.05;

      my +=
        (ty - my) * 0.05;

      inner.rotation.y +=
        0.0028 + mx * 0.008;

      inner.rotation.x +=
        0.0012 + my * 0.008;

      ring.rotation.z -=
        0.0018;

      ring.rotation.y =
        mx * 0.18;

      halo.rotation.y -=
        0.0012;

      halo.rotation.x +=
        0.0006;

      points.rotation.y +=
        0.0006;

      renderer.render(
        scene,
        camera
      );
    };

    tick();

    // ================= CLEANUP =================

    return () => {
      cancelAnimationFrame(raf);

      resizeObserver.disconnect();

      window.removeEventListener(
        "mousemove",
        onMove
      );

      window.removeEventListener(
        "resize",
        setSize
      );

      io.disconnect();

      coreGeo.dispose();
      ringGeo.dispose();
      haloGeo.dispose();

      coreMat.dispose();
      ringMat.dispose();
      haloMat.dispose();

      particleGeo.dispose();
      particleMat.dispose();

      renderer.dispose();

      if (
        renderer.domElement.parentNode ===
        mount
      ) {
        mount.removeChild(
          renderer.domElement
        );
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 h-full w-full"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        minWidth: "100%",
        minHeight: "100%",
      }}
      aria-hidden="true"
    />
  );
}