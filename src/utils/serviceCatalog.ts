import {
  ShoppingBag,
  Users,
  HeartHandshake,
  Sparkles,
  Clock,
  type LucideIcon,
} from 'lucide-react';
import type { Category } from '../api/types';

export const CATEGORY_META: Record<
  string,
  { icon: LucideIcon; emoji: string; shortName: string; desc: string }
> = {
  bag_carry: {
    icon: ShoppingBag,
    emoji: '🛍️',
    shortName: 'Bag Carry',
    desc: 'Hands-free shopping at malls and markets. Your assistant carries bags while you browse.',
  },
  queue: {
    icon: Clock,
    emoji: '⏳',
    shortName: 'Queue',
    desc: 'Let an assistant wait in line while you use your time better.',
  },
  family: {
    icon: Users,
    emoji: '👨‍👩‍👧',
    shortName: 'Family',
    desc: 'Support for parents, kids and seniors at crowded stores and exhibitions.',
  },
  senior: {
    icon: HeartHandshake,
    emoji: '♿',
    shortName: 'Senior Help',
    desc: 'Patient, trusted companions for hospitals, malls and public places.',
  },
  festival: {
    icon: Sparkles,
    emoji: '🎉',
    shortName: 'Festival',
    desc: 'Diwali, wedding season and sale days — skip the stress, not the shopping.',
  },
};

/** Fallback when API is unavailable — matches backend seed data. */
export const FALLBACK_CATEGORIES: Category[] = [
  { id: 'bag_carry', slug: 'bag_carry', name: 'Bag Carry Assistance', baseRate: 150 },
  { id: 'queue', slug: 'queue', name: 'Queue Assistance', baseRate: 120 },
  { id: 'family', slug: 'family', name: 'Family Shopping Help', baseRate: 200 },
  { id: 'senior', slug: 'senior', name: 'Senior Citizen Help', baseRate: 180 },
  { id: 'festival', slug: 'festival', name: 'Festival Shopping Support', baseRate: 250 },
];

export function categoryShortName(name: string, slug?: string) {
  if (slug && CATEGORY_META[slug]) return CATEGORY_META[slug].shortName;
  if (name.includes('Bag')) return 'Bag Carry';
  if (name.includes('Queue')) return 'Queue';
  if (name.includes('Senior')) return 'Senior Help';
  if (name.includes('Family')) return 'Family';
  if (name.includes('Festival')) return 'Festival';
  return name.split(' ').slice(0, 2).join(' ');
}

export function categoryDescription(slug: string, apiDesc?: string) {
  return apiDesc?.trim() || CATEGORY_META[slug]?.desc || 'Personal shopping help at your venue.';
}

export function categoryIcon(slug: string): LucideIcon {
  return CATEGORY_META[slug]?.icon ?? ShoppingBag;
}

export function categoryEmoji(slug: string) {
  return CATEGORY_META[slug]?.emoji ?? '✨';
}

/** Matches Flutter app `AppColors.categoryColor` */
export const CATEGORY_COLORS: Record<string, { main: string; soft: string; border: string }> = {
  bag_carry: { main: '#ff0064', soft: '#fff0f6', border: 'rgba(255, 0, 100, 0.18)' },
  queue: { main: '#8b5cf6', soft: '#f3e8ff', border: 'rgba(139, 92, 246, 0.2)' },
  family: { main: '#3b82f6', soft: '#eff6ff', border: 'rgba(59, 130, 246, 0.2)' },
  senior: { main: '#10b981', soft: '#ecfdf5', border: 'rgba(16, 185, 129, 0.2)' },
  festival: { main: '#ec4899', soft: '#fdf2f8', border: 'rgba(236, 72, 153, 0.2)' },
};

export function categoryColorClass(slug: string) {
  return CATEGORY_COLORS[slug] ? `cat-${slug.replace(/_/g, '-')}` : 'cat-default';
}

export function formatHourlyRate(rate: number) {
  return `₹${Math.round(rate)}/hr`;
}

export function minHourlyRate(categories: Category[]) {
  if (!categories.length) return 120;
  return Math.min(...categories.map((c) => c.baseRate));
}
