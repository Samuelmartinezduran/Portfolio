/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {motion, useSpring, useMotionValue, useReducedMotion} from 'motion/react';
import {useEffect, useState} from 'react';

export function LiquidCursor() {
  const reduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Tighter spring for primary cursor replacement
  const springConfig = {stiffness: 800, damping: 50, mass: 0.2};
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  useEffect(() => {
    if (reduceMotion) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      const target = e.target as HTMLElement;
      const isHoverable = target.closest('a, button, [data-cursor="hover"]');
      setIsHovered(!!isHoverable);
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [cursorX, cursorY, reduceMotion]);

  if (reduceMotion) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:flex items-center justify-center"
      style={{
        x,
        y,
        translateX: '-50%',
        translateY: '-50%',
      }}
    >
      {/* Outer Circle */}
      <motion.div
        className="absolute w-8 h-8 rounded-full border border-primary/50 mix-blend-difference"
        animate={{
          scale: isHovered ? 1.5 : 1,
          backgroundColor: isHovered ? 'rgba(255, 95, 31, 0.2)' : 'rgba(255, 95, 31, 0)',
        }}
        transition={{type: 'spring', stiffness: 250, damping: 25}}
      />
      {/* Precision Dot */}
      <div className="w-1 h-1 bg-primary rounded-full" />
    </motion.div>
  );
}
