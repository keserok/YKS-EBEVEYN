import React, { useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function BackgroundFx() {
  const springX = useSpring(-200, { stiffness: 45, damping: 20 });
  const springY = useSpring(-200, { stiffness: 45, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      springX.set(e.clientX);
      springY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [springX, springY]);

  return (
    <>
      {/* Noise Texture Overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Deep Obsidian Architectural Canvas Base */}
      <div className="fixed inset-0 pointer-events-none bg-obsidian-deep z-0" />

      {/* Subtle Atmospheric Mesh Gradients */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-[1]">
        <div className="absolute top-[-15%] left-[-10%] w-[55vw] h-[55vw] rounded-full bg-gradient-to-br from-gold/5 via-gold-bronze/3 to-transparent blur-[140px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-tl from-charcoal-muted/30 via-obsidian-surface/20 to-transparent blur-[120px]" />
      </div>

      {/* Dynamic Cursor Ambient Spotlight */}
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 w-[550px] h-[550px] rounded-full pointer-events-none z-[2] blur-[100px] mix-blend-screen opacity-45 transition-opacity duration-700"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          background:
            'radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, rgba(197, 160, 89, 0.05) 45%, transparent 70%)',
        }}
      />
    </>
  );
}
