/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {motion, useSpring, useMotionValue, useReducedMotion} from 'motion/react';
import type {ReactNode} from 'react';
import {useRef} from 'react';

export function Magnetic({children, strength = 0.3}: {children: ReactNode; strength?: number}) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, {stiffness: 150, damping: 15, mass: 0.1});
  const springY = useSpring(y, {stiffness: 150, damping: 15, mass: 0.1});

  if (reduceMotion) {
    return <>{children}</>;
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!ref.current) return;
    const {clientX, clientY} = e;
    const {left, top, width, height} = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    x.set((clientX - centerX) * strength);
    y.set((clientY - centerY) * strength);
  };

  const handlePointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{x: springX, y: springY}}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}
