import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise<GLTF | null>(async (resolve, reject) => {
      try {
        const encryptedBlob = await decryptFile(
          "/models/character.enc",
          "Character3D#@"
        );
        const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

        let character: THREE.Object3D;
        loader.load(
          blobUrl,
          async (gltf) => {
            character = gltf.scene;
            character.traverse((child: any) => {
              if (child.isMesh) {
                const mesh = child as THREE.Mesh;
                child.castShadow = true;
                child.receiveShadow = true;
                mesh.frustumCulled = true;

                // Color styling matching reference image (supporting both raw and sanitized Three.js names)
                const name = (child.name || "").toLowerCase().replace(/[^a-z0-9]/g, "");

                const applyStyling = (mat: THREE.MeshStandardMaterial) => {
                  if (
                    name === "plane007" ||
                    name.includes("face") ||
                    child.name === "Plane.007" ||
                    child.name === "Plane007"
                  ) {
                    // Warm cartoon caramel skin tone for head/face
                    mat.color.set("#C58B68");
                    mat.roughness = 0.52;
                    mat.metalness = 0.02;
                  } else if (
                    name.includes("ear") ||
                    name === "plane003" ||
                    name.includes("neck") ||
                    name === "plane005" ||
                    name.includes("hand") ||
                    name === "mesh002"
                  ) {
                    // Matching skin tone for ears, neck, and hands
                    mat.color.set("#C58B68");
                    mat.roughness = 0.55;
                    mat.metalness = 0.02;
                  } else if (
                    name.includes("shirt") ||
                    name === "bodyshirt" ||
                    child.name === "BODY.SHIRT" ||
                    child.name === "BODYSHIRT"
                  ) {
                    // Charcoal heather grey hoodie
                    mat.color.set("#3B3D42");
                    mat.roughness = 0.88;
                    mat.metalness = 0.0;
                  } else if (name.includes("hair")) {
                    // Dark charcoal/black hair
                    mat.color.set("#151515");
                    mat.roughness = 0.75;
                  } else if (name.includes("eyebrow")) {
                    // Dark eyebrows
                    mat.color.set("#151515");
                    mat.roughness = 0.8;
                  } else if (name.includes("pant")) {
                    // Dark pants
                    mat.color.set("#1E2024");
                    mat.roughness = 0.8;
                  } else if (name.includes("shoe")) {
                    // Off-white sneakers
                    mat.color.set("#E8E8E8");
                    mat.roughness = 0.45;
                  } else if (name.includes("sole")) {
                    // Dark sole
                    mat.color.set("#222224");
                    mat.roughness = 0.9;
                  } else if (
                    name === "plane009" ||
                    name === "plane" ||
                    child.name === "Plane" ||
                    child.name === "Plane.009"
                  ) {
                    // Modern ergonomic office chair (seat & back)
                    mat.color.set("#252830");
                    mat.roughness = 0.72;
                    mat.metalness = 0.05;
                  } else if (
                    name === "cube007" ||
                    child.name === "Cube.007"
                  ) {
                    // Chair legs, wheels & cylinder stand
                    mat.color.set("#16181C");
                    mat.roughness = 0.35;
                    mat.metalness = 0.65;
                  } else if (
                    name === "plane015" ||
                    name === "plane002" ||
                    child.name === "Plane.002"
                  ) {
                    // Sleek modern studio desk top
                    mat.color.set("#20232A");
                    mat.roughness = 0.55;
                    mat.metalness = 0.1;
                  } else if (
                    name === "plane016" ||
                    child.name === "Plane.003" && child.parent?.type === "Scene"
                  ) {
                    // Desk legs & frame
                    mat.color.set("#17191E");
                    mat.roughness = 0.4;
                    mat.metalness = 0.5;
                  } else if (name === "cube011" || name.includes("keyboard")) {
                    // Mechanical keyboard frame
                    mat.color.set("#181A1F");
                    mat.roughness = 0.6;
                    mat.metalness = 0.2;
                  } else if (name.startsWith("cube0") && !name.includes("cube002") && !name.includes("cube004") && !name.includes("cube007")) {
                    // Keyboard keycaps
                    mat.color.set("#2E323B");
                    mat.roughness = 0.5;
                  }
                };

                if (Array.isArray(mesh.material)) {
                  mesh.material = mesh.material.map((m) => {
                    const cloned = m.clone() as THREE.MeshStandardMaterial;
                    applyStyling(cloned);
                    return cloned;
                  });
                } else if (mesh.material) {
                  // Keep custom eye texture on EYEs.001 intact
                  if (!name.includes("eyes")) {
                    const cloned = mesh.material.clone() as THREE.MeshStandardMaterial;
                    applyStyling(cloned);
                    mesh.material = cloned;
                  }
                }
              }
            });
            await renderer.compileAsync(character, camera, scene);
            resolve(gltf);
            setCharTimeline(character, camera);
            setAllTimeline();
            const footR = character.getObjectByName("footR");
            const footL = character.getObjectByName("footL");
            if (footR) footR.position.y = 3.36;
            if (footL) footL.position.y = 3.36;
            dracoLoader.dispose();
          },
          undefined,
          (error) => {
            console.error("Error loading GLTF model:", error);
            reject(error);
          }
        );
      } catch (err) {
        reject(err);
        console.error(err);
      }
    });
  };

  return { loadCharacter };
};

export default setCharacter;
