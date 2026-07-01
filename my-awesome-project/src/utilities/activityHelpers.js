import { 
  LogIn, 
  ShoppingCart, 
  User, 
  LogOut, 
  Lock 
} from 'lucide-react';

// Central configuration mapping activity types to styles and Lucide React icons
export const ICONS_CONFIG = {
  login: { 
    icon: LogIn, 
    bg: 'bg-blue-50 dark:bg-blue-900/30', 
    text: 'text-blue-600 dark:text-blue-400' 
  },
  purchase: { 
    icon: ShoppingCart, 
    bg: 'bg-emerald-50 dark:bg-emerald-900/30', 
    text: 'text-emerald-600 dark:text-emerald-400' 
  },
  profile: { 
    icon: User, 
    bg: 'bg-purple-50 dark:bg-purple-900/30', 
    text: 'text-purple-600 dark:text-purple-400' 
  },
  logout: { 
    icon: LogOut, 
    bg: 'bg-gray-100 dark:bg-gray-800', 
    text: 'text-gray-600 dark:text-gray-400' 
  },
  password: { 
    icon: Lock, 
    bg: 'bg-amber-50 dark:bg-amber-900/30', 
    text: 'text-amber-600 dark:text-amber-400' 
  }
};

export function getMetaForActivity(type) {
  return ICONS_CONFIG[type] || ICONS_CONFIG.login;
}