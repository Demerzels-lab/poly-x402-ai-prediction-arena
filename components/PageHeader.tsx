import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

type PageHeaderProps = {
  title: string;
  description: string;
  icon?: LucideIcon; // Optional icon
};

export default function PageHeader({ title, description, icon: Icon }: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-12" // Consistent margin-bottom
    >
      {Icon && (
        <div className="">
        <Icon className="text-primary text-white" size={64} />
        </div>
      )}
      <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-center">
        {title}
      </h1>
      <p className="text-lg text-muted text-center">
        {description}
      </p>
    </motion.div>
  );
}