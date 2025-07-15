"use client";
import Particles from "@tsparticles/react";
import { loadStarsPreset } from "@tsparticles/preset-stars";

export function ParticleBackground() {
  (async () => {
    await loadStarsPreset(tsParticles);

    await tsParticles.load({
      id: "tsparticles",
      options: {
        preset: "stars",
      },
    });
  })();
  return (
    <Particles
      className="absolute -z-10"
      options={{
        preset: "stars",
        background: { color: "#0f172a" }, // 深空蓝背景
        particles: {
          size: { value: { min: 1, max: 3 } },
          move: { speed: 0.2 },
        },
      }}
    />
  );
}
