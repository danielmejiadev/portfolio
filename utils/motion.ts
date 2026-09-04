/** Animation-math helpers shared by the small interaction components
 * (MagneticButton, TiltCard, HeroMesh) — each follows a moving target with
 * exponential smoothing on every animation frame. */

/** Moves `current` a fraction (`smoothing`) of the way towards `target`. */
export function lerpTowards(current: number, target: number, smoothing: number): number {
  return current + (target - current) * smoothing;
}

/** True once `current` is close enough to `target` that the animation loop can stop. */
export function isCloseEnough(current: number, target: number, tolerance: number): boolean {
  return Math.abs(target - current) <= tolerance;
}

/** Cubic ease-out — starts fast, settles gently. Used by CountUp. */
export function easeOutCubic(elapsedFraction: number): number {
  return 1 - Math.pow(1 - elapsedFraction, 3);
}
