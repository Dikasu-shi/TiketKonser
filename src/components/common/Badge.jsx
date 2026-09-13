import React from 'react';

export const Badge = ({
  children,
  variant = 'default', // 'default', 'brand', 'success', 'warning', 'danger', 'cyan'
  size = 'sm',
  className = '',
  icon: Icon
}) => {
  const variants = {
    default: 'bg-stone-100 text-ink-secondary border-border',
    brand: 'bg-coral-50 text-coral-600 border-coral-200',
    coral: 'bg-coral-50 text-coral-600 border-coral-200',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    warning: 'bg-amber-50 text-amber-800 border-amber-200',
    danger: 'bg-rose-50 text-rose-700 border-rose-200',
    cyan: 'bg-sky-50 text-sky-700 border-sky-200',
    dark: 'bg-ink text-white border-ink'
  };

  const sizes = {
    xs: 'text-[9px] px-2 py-0.5 gap-1 font-semibold uppercase tracking-wider',
    sm: 'text-[10px] px-2.5 py-0.5 gap-1.5 font-bold uppercase tracking-wider',
    md: 'text-xs px-3 py-1 gap-2 font-bold'
  };

  return (
    <span className={`inline-flex items-center rounded-md border font-medium ${variants[variant] || variants.default} ${sizes[size]} ${className}`}>
      {Icon && <Icon className={size === 'xs' ? 'w-2.5 h-2.5' : 'w-3 h-3'} />}
      <span>{children}</span>
    </span>
  );
};
