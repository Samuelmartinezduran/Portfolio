/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {motion, useSpring, useMotionValue, useReducedMotion, useTransform} from 'motion/react';
import {type ReactNode, useRef} from 'react';

export function TiltCard({children, className}: {children: ReactNode; className?: string}) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(y, [0, 1], [7, -7]), {stiffness: 150, damping: 15});
  const rotateY = useSpring(useTransform(x, [0, 1], [-7, 7]), {stiffness: 150, damping: 15});

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!ref.current) return;
    const {left, top, width, height} = ref.current.getBoundingClientRect();
    x.set((e.clientX - left) / width);
    y.set((e.clientY - top) / height);
  };

  const handlePointerLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={className}
    >
      <div style={{transform: 'translateZ(20px)', transformStyle: 'preserve-3d'}}>
        {children}
      </div>
    </motion.div>
  );
}
