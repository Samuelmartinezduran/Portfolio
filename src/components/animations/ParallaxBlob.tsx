/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {motion, useSpring, useMotionValue, useReducedMotion, useTransform} from 'motion/react';
import {useEffect, type ReactNode} from 'react';

export function ParallaxBlob({
  children,
  className,
  strength = 40,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const reduceMotion = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const x = useSpring(useTransform(mouseX, [-1, 1], [-strength, strength]), {
    stiffness: 50,
    damping: 20,
  });
  const y = useSpring(useTransform(mouseY, [-1, 1], [-strength, strength]), {
    stiffness: 50,
    damping: 20,
  });

  useEffect(() => {
    if (reduceMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const {innerWidth, innerHeight} = window;
      mouseX.set((e.clientX / innerWidth) * 2 - 1);
      mouseY.set((e.clientY / innerHeight) * 2 - 1);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, reduceMotion]);

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} style={{x, y}}>
      {children}
    </motion.div>
  );
}
