'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { getTypeColor } from '@/lib/utils';

interface TypeBadgeProps {
  type: string;
  size?: 'sm' | 'md' | 'lg';
  link?: boolean;
}

const sizeClasses = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
  lg: 'px-4 py-1.5 text-base',
};

export function TypeBadge({ type, size = 'md', link = false }: TypeBadgeProps) {
  const badge = (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Badge
        className={`${sizeClasses[size]} border-0 font-semibold text-white shadow-sm transition-shadow hover:shadow-md`}
        style={{ backgroundColor: getTypeColor(type) }}
      >
        {type.toUpperCase()}
      </Badge>
    </motion.div>
  );

  if (link) {
    return (
      <Link href={`/pokedex?type=${type}`}>
        {badge}
      </Link>
    );
  }

  return badge;
}

interface TypeBadgesProps {
  types: string[];
  size?: 'sm' | 'md' | 'lg';
  link?: boolean;
}

export function TypeBadges({ types, size = 'md', link = false }: TypeBadgesProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {types.map((type, index) => (
        <motion.div
          key={type}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <TypeBadge type={type} size={size} link={link} />
        </motion.div>
      ))}
    </div>
  );
}