'use client';

import { motion } from 'framer-motion';
import { getStatColor, calculateStatPercentage } from '@/lib/utils';

interface StatBarProps {
  stat: string;
  value: number;
  maxValue?: number;
  delay?: number;
}

export function StatBar({ stat, value, maxValue = 255, delay = 0 }: StatBarProps) {
  const percentage = calculateStatPercentage(value, maxValue);
  const color = getStatColor(stat);
  
  const statLabels: Record<string, string> = {
    'hp': 'HP',
    'attack': 'ATK',
    'defense': 'DEF',
    'special-attack': 'SP.ATK',
    'special-defense': 'SP.DEF',
    'speed': 'SPD',
  };

  return (
    <div className="flex items-center gap-2">
      <div className="w-16 text-xs font-medium text-muted-foreground">
        {statLabels[stat] ?? stat.toUpperCase()}
      </div>
      <div className="w-12 text-right text-sm font-bold" style={{ color }}>
        {value}
      </div>
      <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, delay, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

interface StatsDisplayProps {
  stats: Array<{ base_stat: number; stat: { name: string } }>;
}

export function StatsDisplay({ stats }: StatsDisplayProps) {
  const statOrder = ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed'];
  
  const orderedStats = statOrder.map((name) => 
    stats.find((s) => s.stat.name === name)
  ).filter(Boolean);

  const total = stats.reduce((acc, s) => acc + s.base_stat, 0);

  return (
    <div className="space-y-2">
      {orderedStats.map((stat, index) => 
        stat && (
          <StatBar
            key={stat.stat.name}
            stat={stat.stat.name}
            value={stat.base_stat}
            delay={index * 0.1}
          />
        )
      )}
      <div className="flex items-center justify-between pt-2 border-t">
        <span className="text-sm font-medium">Total</span>
        <span className="text-lg font-bold">{total}</span>
      </div>
    </div>
  );
}