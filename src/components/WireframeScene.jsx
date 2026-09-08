import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function WireframeScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (reduced) return;

    let raf = 0;
    let running = true;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 40);
    camera.position.z = 5.4;

    const renderer = new THREE.WebGLRenderer({ antialias: !isMobile, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.2 : 1.6));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const orange = 0xf97316;
    const blue = 0x38bdf8;
    const violet = 0xa78bfa;

    const coreMat = new THREE.MeshBasicMaterial({
      color: orange,
      wireframe: true,
      transparent: true,
      opacity: 0.78,
    });
    const ringMat = new THREE.MeshBasicMaterial({
      color: blue,
      wireframe: true,
      transparent: true,
      opacity: 0.16,
    });
    const haloMat = new THREE.MeshBasicMaterial({
      color: violet,
      wireframe: true,
      transparent: true,
      opacity: 0.08,
    });

    const coreGeo = new THREE.IcosahedronGeometry(1.5, 1);
    const ringGeo = new THREE.TorusGeometry(2.2, 0.004, 6, 80);
    const haloGeo = new THREE.IcosahedronGeometry(2.05, 0);
    const inner = new THREE.Mesh(coreGeo, coreMat);
    const ring = new THREE.Mesh(ringGeo, ringMat);
    const halo = new THREE.Mesh(haloGeo, haloMat);
    ring.rotation.x = Math.PI / 2.4;
    scene.add(inner, ring, halo);

    let points = null;
    if (!isMobile) {
      const count = 80;
      const geo = new THREE.BufferGeometry();
      const pos = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
      const cOrange = new THREE.Color(orange);
      const cBlue = new THREE.Color(blue);
      for (let i = 0; i < count; i += 1) {
        pos[i * 3] = (Math.random() - 0.5) * 9;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 9;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 9;
        const c = Math.random() > 0.72 ? cBlue : cOrange;
        colors[i * 3] = c.r;
        colors[i * 3 + 1] = c.g;
        colors[i * 3 + 2] = c.b;
      }
      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
      points = new THREE.Points(
        geo,
        new THREE.PointsMaterial({
          size: 0.016,
          vertexColors: true,
          transparent: true,
          opacity: 0.38,
          depthWrite: false,
        })
      );
      scene.add(points);
    }

    const setSize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      if (!w || !h) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };
    setSize();

    let mx = 0;
    let my = 0;
    let tx = 0;
    let ty = 0;
    const onMove = (e) => {
      if (isMobile) return;
      tx = (e.clientX / window.innerWidth) * 2 - 1;
      ty = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("resize", setSize);

    const io = new IntersectionObserver(
      ([entry]) => {
        running = entry.isIntersecting;
      },
      { threshold: 0.08 }
    );
    io.observe(mount);

    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!running) return;
      mx += (tx - mx) * 0.05;
      my += (ty - my) * 0.05;
      inner.rotation.y += 0.0028 + mx * 0.008;
      inner.rotation.x += 0.0012 + my * 0.008;
      ring.rotation.z -= 0.0018;
      ring.rotation.y = mx * 0.18;
      halo.rotation.y -= 0.0012;
      halo.rotation.x += 0.0006;
      if (points) points.rotation.y += 0.0006;
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", setSize);
      io.disconnect();
      coreGeo.dispose();
      ringGeo.dispose();
      haloGeo.dispose();
      coreMat.dispose();
      ringMat.dispose();
      haloMat.dispose();
      if (points) {
        points.geometry.dispose();
        points.material.dispose();
      }
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0" aria-hidden="true" />;
}
