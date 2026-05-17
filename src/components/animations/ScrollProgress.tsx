/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {motion, useScroll, useSpring, useReducedMotion} from 'motion/react';

export function ScrollProgress() {
  const reduceMotion = useReducedMotion();
  const {scrollYProgress} = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  if (reduceMotion) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-[100]"
      style={{scaleX}}
    />
  );
}
