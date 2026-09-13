import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Music2, Flame, Zap, Sparkles, Radio, Disc3, ArrowRight } from 'lucide-react';

const iconMap = {
  Music2,
  Flame,
  Zap,
  Sparkles,
  Radio,
  Disc3
};

export const CategoryCard = ({ category }) => {
  const IconComponent = iconMap[category.icon] || Music2;

  return (
    <Link to={`/events?category=${category.slug}`} className="block group">
      <div
        className="relative p-5 rounded-2xl bg-surface border border-border group-hover:border-coral-500 transition-all duration-200 shadow-card group-hover:shadow-card-hover flex flex-col justify-between h-38 transform-gpu group-hover:-translate-y-1"
      >
        <div>
          {/* Icon */}
          <div className="w-10 h-10 rounded-xl bg-coral-50 border border-coral-100 flex items-center justify-center mb-3 group-hover:bg-coral-500 transition-colors">
            <IconComponent className="w-5 h-5 text-coral-600 group-hover:text-white transition-colors" />
          </div>

          <h4 className="text-sm font-bold text-ink tracking-tight group-hover:text-coral-600 transition-colors">
            {category.name}
          </h4>
          <p className="text-[11px] text-ink-muted mt-0.5 line-clamp-1">
            {category.description}
          </p>
        </div>

        <div className="flex items-center gap-1 text-[11px] font-bold text-coral-600 group-hover:text-coral-700 transition-colors pt-2">
          <span>Jelajah</span>
          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
};
