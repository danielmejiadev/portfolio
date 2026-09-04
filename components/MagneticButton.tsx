"use client";

import { useRef, type ReactNode } from "react";
import { isCloseEnough, lerpTowards } from "@/utils/motion";

interface MagneticButtonProps {
  href: string;
  children: ReactNode;
  className?: string;
  strength?: number;
}

const FOLLOW_SMOOTHING = 0.2;
const STOP_TOLERANCE = 0.1;

export default function MagneticButton({ href, children, className = "", strength = 0.3 }: MagneticButtonProps) {
  const outerRef = useRef<HTMLAnchorElement | null>(null);
  const innerRef = useRef<HTMLSpanElement | null>(null);
  const motionState = useRef({ targetX: 0, targetY: 0, currentX: 0, currentY: 0, animationFrameId: 0 });

  function animateTowardsTarget() {
    const motion = motionState.current;
    motion.currentX = lerpTowards(motion.currentX, motion.targetX, FOLLOW_SMOOTHING);
    motion.currentY = lerpTowards(motion.currentY, motion.targetY, FOLLOW_SMOOTHING);
    if (innerRef.current) {
      innerRef.current.style.transform = `translate3d(${motion.currentX}px, ${motion.currentY}px, 0)`;
    }
    const settled =
      isCloseEnough(motion.currentX, motion.targetX, STOP_TOLERANCE) &&
      isCloseEnough(motion.currentY, motion.targetY, STOP_TOLERANCE);
    motion.animationFrameId = settled ? 0 : requestAnimationFrame(animateTowardsTarget);
  }

  function handleMouseMove(event: React.MouseEvent<HTMLAnchorElement>) {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const motion = motionState.current;
    motion.targetX = (event.clientX - bounds.left - bounds.width / 2) * strength;
    motion.targetY = (event.clientY - bounds.top - bounds.height / 2) * strength;
    if (!motion.animationFrameId) motion.animationFrameId = requestAnimationFrame(animateTowardsTarget);
  }

  function handleMouseLeave() {
    const motion = motionState.current;
    motion.targetX = 0;
    motion.targetY = 0;
    if (!motion.animationFrameId) motion.animationFrameId = requestAnimationFrame(animateTowardsTarget);
  }

  return (
    <a
      ref={outerRef}
      href={href}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <span ref={innerRef} className="magnetic-inner">
        {children}
      </span>
    </a>
  );
}
