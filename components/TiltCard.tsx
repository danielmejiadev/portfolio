"use client";

import { useRef, type ReactNode } from "react";
import { isCloseEnough, lerpTowards } from "@/utils/motion";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
}

const MAX_TILT_DEGREES = 6;
const FOLLOW_SMOOTHING = 0.15;
const STOP_TOLERANCE = 0.05;

export default function TiltCard({ children, className = "" }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const motionState = useRef({ targetX: 0, targetY: 0, currentX: 0, currentY: 0, animationFrameId: 0 });

  function animateTowardsTarget() {
    const motion = motionState.current;
    motion.currentX = lerpTowards(motion.currentX, motion.targetX, FOLLOW_SMOOTHING);
    motion.currentY = lerpTowards(motion.currentY, motion.targetY, FOLLOW_SMOOTHING);
    if (cardRef.current) {
      cardRef.current.style.setProperty("--rx", `${motion.currentX.toFixed(2)}deg`);
      cardRef.current.style.setProperty("--ry", `${motion.currentY.toFixed(2)}deg`);
    }
    const settled =
      isCloseEnough(motion.currentX, motion.targetX, STOP_TOLERANCE) &&
      isCloseEnough(motion.currentY, motion.targetY, STOP_TOLERANCE);
    motion.animationFrameId = settled ? 0 : requestAnimationFrame(animateTowardsTarget);
  }

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const pointerXFraction = (event.clientX - bounds.left) / bounds.width - 0.5;
    const pointerYFraction = (event.clientY - bounds.top) / bounds.height - 0.5;
    const motion = motionState.current;
    motion.targetX = -pointerYFraction * MAX_TILT_DEGREES;
    motion.targetY = pointerXFraction * MAX_TILT_DEGREES;
    if (!motion.animationFrameId) motion.animationFrameId = requestAnimationFrame(animateTowardsTarget);
  }

  function handleMouseLeave() {
    const motion = motionState.current;
    motion.targetX = 0;
    motion.targetY = 0;
    if (!motion.animationFrameId) motion.animationFrameId = requestAnimationFrame(animateTowardsTarget);
  }

  return (
    <div
      ref={cardRef}
      className={`has-tilt ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}
