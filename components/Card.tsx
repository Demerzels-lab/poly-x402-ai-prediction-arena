import { motion, HTMLMotionProps } from 'framer-motion';
import { MotionProps } from 'framer-motion';

type CardProps = {
  children: React.ReactNode;
  className?: string;
} & HTMLMotionProps<"div">;

export default function Card({ children, className = '', ...rest }: CardProps) {
  return (
    <motion.div
      className={`
        glassmorphism bg-card border border-neutral-light
        pixel-border rounded-xl p-6 card-hover fade-in ${className}
      `}
      {...rest} // Pass framer-motion props
    >
      {children}
    </motion.div>
  );
}