/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {motion, useReducedMotion} from 'motion/react';

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export function SplitText({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();
  const words = text.split(' ');

  if (reduceMotion) {
    return <span className={className}>{text}</span>;
  }

  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{once: true}}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.08,
            delayChildren: delay,
          },
        },
      }}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.2em] last:mr-0 -mb-[0.2em] pb-[0.2em]">
          <motion.span
            className="inline-block"
            variants={{
              hidden: {y: '100%'},
              show: {
                y: 0,
                transition: {duration: 0.8, ease: EASE_OUT},
              },
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
