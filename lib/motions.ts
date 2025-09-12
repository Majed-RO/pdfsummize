/* 
Variants
Setting animate as a target is useful for simple, single-element animations. It's also possible to orchestrate animations that propagate throughout the DOM. We can do so with variants.

Variants are a set of named targets. These names can be anything.

const variants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
}

Variants are passed to motion components via the variants prop:

<motion.div variants={variants} />
These variants can now be referred to by a label, wherever you can define an animation target:

<motion.div
  variants={variants}
  initial="hidden"
  whileInView="visible"
  exit="hidden"
/>

*/

import { Variants } from 'motion/react';

export const containerVariants: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.2,
			delayChildren: 0.1
		}
	}
};

export const itemVariants: Variants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		transition: {
			type: 'spring',
			damping: 15,
			stiffness: 50,
			duration: 0.8
		}
	},
	hover: {
		scale: 1.05,
		transition: {
			type: 'spring',
			damping: 10,
			stiffness: 300
		}
	}
};

export const buttonVariants = {
	scale: 1.05
	/* transition: {
		type: 'spring',
		damping: 10,
		stiffness: 300
	} */
};

/* const containerVariants: Variants = {
  // The 'visible' state of the container will trigger the children's 'visible' state with a stagger effect.
  visible: {
    transition: {
      staggerChildren: 0.05, // Controls the delay between each child's animation
    },
  },
}; */

export const characterVariants: Variants = {
	hidden: {
		opacity: 0
	},
	visible: {
		opacity: 1
	}
};
