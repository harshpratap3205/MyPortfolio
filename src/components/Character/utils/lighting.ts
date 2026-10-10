import * as THREE from "three";
import { RGBELoader } from "three-stdlib";
import { gsap } from "gsap";

const setLighting = (scene: THREE.Scene) => {
  const directionalLight = new THREE.DirectionalLight(0xc7a9ff, 0);
  directionalLight.intensity = 0;
  directionalLight.position.set(-0.47, -0.32, -1);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 1024;
  directionalLight.shadow.mapSize.height = 1024;
  directionalLight.shadow.camera.near = 0.5;
  directionalLight.shadow.camera.far = 50;
  scene.add(directionalLight);

  const pointLight = new THREE.PointLight(0xc2a4ff, 0, 100, 3);
  pointLight.position.set(3, 12, 4);
  pointLight.castShadow = true;
  scene.add(pointLight);

  // Cyan / Teal rim light on character right (matching reference image)
  const cyanRimLight = new THREE.DirectionalLight(0x00e5ff, 0);
  cyanRimLight.position.set(5, 14, 6);
  scene.add(cyanRimLight);

  // Soft Violet / Lavender rim light on character left (matching reference image)
  const violetRimLight = new THREE.DirectionalLight(0x9b5de5, 0);
  violetRimLight.position.set(-5, 14, 4);
  scene.add(violetRimLight);

  // Warm key light directly illuminating face & skin tones
  const warmKeyLight = new THREE.DirectionalLight(0xfff0e2, 0);
  warmKeyLight.position.set(0, 14, 18);
  scene.add(warmKeyLight);

  new RGBELoader()
    .setPath("/models/")
    .load("char_enviorment.hdr", function (texture) {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      scene.environment = texture;
      scene.environmentIntensity = 0;
      scene.environmentRotation.set(5.76, 85.85, 1);
    });

  function setPointLight(screenLight: any) {
    if (screenLight.material.opacity > 0.9) {
      pointLight.intensity = screenLight.material.emissiveIntensity * 20;
    } else {
      pointLight.intensity = 0;
    }
  }
  const duration = 2;
  const ease = "power2.inOut";
  function turnOnLights() {
    gsap.to(scene, {
      environmentIntensity: 0.64,
      duration: duration,
      ease: ease,
    });
    gsap.to(directionalLight, {
      intensity: 0.8,
      duration: duration,
      ease: ease,
    });
    gsap.to(cyanRimLight, {
      intensity: 2.2,
      duration: duration,
      ease: ease,
    });
    gsap.to(violetRimLight, {
      intensity: 1.6,
      duration: duration,
      ease: ease,
    });
    gsap.to(warmKeyLight, {
      intensity: 1.2,
      duration: duration,
      ease: ease,
    });
    gsap.to(".character-rim", {
      y: "55%",
      opacity: 1,
      delay: 0.2,
      duration: 2,
    });
  }

  return { setPointLight, turnOnLights };
};

export default setLighting;
