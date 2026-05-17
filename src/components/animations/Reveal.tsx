/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {motion, useReducedMotion} from 'motion/react';
import type {ReactNode} from 'react';

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : {opacity: 0, y}}
      whileInView={reduceMotion ? undefined : {opacity: 1, y: 0}}
      viewport={{once: true, amount: 0.24, margin: '0px 0px -80px 0px'}}
      transition={{duration: 0.65, ease: EASE_OUT, delay}}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function RevealGroup({
  children,
  className,
  delay = 0,
  stagger = 0.08,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{once: true, amount: 0.24, margin: '0px 0px -80px 0px'}}
      variants={{
        hidden: {},
        show: {
          transition: {
            delayChildren: delay,
            staggerChildren: stagger,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({children, className}: {children: ReactNode; className?: string}) {
  return (
    <motion.div
      variants={{
        hidden: {opacity: 0, y: 22},
        show: {opacity: 1, y: 0, transition: {duration: 0.6, ease: EASE_OUT}},
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
