import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Main } from "../three/main.ts";

const Three = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!mountRef.current) return;
    const loadingManager = new THREE.LoadingManager(
      () => setLoading(false),
      (item, loaded, total) => console.log(`Loaded ${loaded}/${total}: ${item}`),
      (url) => console.error(`Erreur de chargement : ${url}`)
    );
    
    new Main(mountRef.current, loadingManager);
  }, []);

  return (
    <div className="fixed w-full h-full z-20">
      <div ref={mountRef} className="top-0 left-0 w-full h-full pointer-events-none" />
      {loading && (
        <div className="absolute top-1/2 left-1/2 w-16 h-16 -translate-x-1/2 -translate-y-1/2 border-4 border-white border-t-transparent rounded-full animate-spin" />
      )}
    </div>
  );
};

export default Three;