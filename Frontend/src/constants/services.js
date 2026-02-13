import { Home, Wrench, Zap, ChefHat, Hammer, Leaf, Shirt, PaintBucket } from 'lucide-react';

// Main Categories with unique gradients, emojis, and real images
export const CATEGORIES = [
  {
    id: 1,
    name: 'Home Cleaning',
    icon: Home,
    emoji: '🧹',
    description: 'Professional home cleaning services',
    gradient: 'from-blue-400 to-cyan-500',
    bgColor: 'bg-gradient-to-br from-blue-100 to-cyan-100',
    image: '/images/categories/home-cleaning.jpg'
  },
  {
    id: 2,
    name: 'Repairs & Maintenance',
    icon: Wrench,
    emoji: '🔧',
    description: 'Home repairs and maintenance',
    gradient: 'from-red-400 to-orange-500',
    bgColor: 'bg-gradient-to-br from-red-100 to-orange-100',
    image: '/images/categories/repairs-maintenance.jpg'
  },
  {
    id: 3,
    name: 'Electrical',
    icon: Zap,
    emoji: '⚡',
    description: 'Licensed electrician services',
    gradient: 'from-yellow-400 to-amber-500',
    bgColor: 'bg-gradient-to-br from-yellow-100 to-amber-100',
    image: '/images/categories/electrical.jpg'
  },
  {
    id: 4,
    name: 'Cooking & Catering',
    icon: ChefHat,
    emoji: '👨‍🍳',
    description: 'Professional cooking and meal prep',
    gradient: 'from-orange-400 to-red-500',
    bgColor: 'bg-gradient-to-br from-orange-100 to-red-100',
    image: '/images/categories/cooking-catering.jpg'
  },
  {
    id: 5,
    name: 'Carpentry',
    icon: Hammer,
    emoji: '🪵',
    description: 'Custom carpentry and woodwork',
    gradient: 'from-amber-400 to-yellow-500',
    bgColor: 'bg-gradient-to-br from-amber-100 to-yellow-100',
    image: null
  },
  {
    id: 6,
    name: 'Gardening & Landscaping',
    icon: Leaf,
    emoji: '🌿',
    description: 'Professional garden services',
    gradient: 'from-green-400 to-emerald-500',
    bgColor: 'bg-gradient-to-br from-green-100 to-emerald-100',
    image: null
  },
  {
    id: 7,
    name: 'Laundry & Dry Cleaning',
    icon: Shirt,
    emoji: '👕',
    description: 'Professional laundry services',
    gradient: 'from-purple-400 to-pink-500',
    bgColor: 'bg-gradient-to-br from-purple-100 to-pink-100',
    image: null
  },
  {
    id: 8,
    name: 'Painting & Decoration',
    icon: PaintBucket,
    emoji: '🎨',
    description: 'Interior and exterior painting',
    gradient: 'from-pink-400 to-rose-500',
    bgColor: 'bg-gradient-to-br from-pink-100 to-rose-100',
    image: null
  }
];

// Services for each category
export const CATEGORY_SERVICES = {
  1: [ // Home Cleaning
    { id: 101, name: 'Basic House Cleaning', price: 50, duration: '2 hours', description: 'Regular house cleaning', image: null },
    { id: 102, name: 'Deep Cleaning', price: 120, duration: '4 hours', description: 'Thorough deep cleaning', image: null },
    { id: 103, name: 'Window Cleaning', price: 30, duration: '1 hour', description: 'Professional window cleaning', image: null },
    { id: 104, name: 'Carpet Cleaning', price: 80, duration: '2 hours', description: 'Deep carpet cleaning', image: null },
    { id: 105, name: 'Move-in/Move-out Cleaning', price: 150, duration: '3 hours', description: 'Complete move cleaning', image: null }
  ],
  2: [ // Repairs & Maintenance
    { id: 201, name: 'Plumbing Repair', price: 60, duration: '1.5 hours', description: 'Pipe and faucet repairs', image: null },
    { id: 202, name: 'Leak Detection', price: 80, duration: '2 hours', description: 'Find and fix leaks', image: null },
    { id: 203, name: 'Drain Cleaning', price: 70, duration: '1 hour', description: 'Clear clogged drains', image: null },
    { id: 204, name: 'Fixture Installation', price: 100, duration: '2 hours', description: 'Install new fixtures', image: null },
    { id: 205, name: 'General Maintenance', price: 55, duration: '1.5 hours', description: 'Regular maintenance checks', image: null }
  ],
  3: [ // Electrical
    { id: 301, name: 'Electrical Repair', price: 70, duration: '1.5 hours', description: 'Fix electrical issues', image: null },
    { id: 302, name: 'Light Installation', price: 50, duration: '1 hour', description: 'Install new lights', image: null },
    { id: 303, name: 'Outlet Installation', price: 45, duration: '45 minutes', description: 'Add new outlets', image: null },
    { id: 304, name: 'Wiring Work', price: 100, duration: '2 hours', description: 'Electrical wiring services', image: null },
    { id: 305, name: 'Safety Inspection', price: 60, duration: '1 hour', description: 'Full electrical inspection', image: null }
  ],
  4: [ // Cooking & Catering
    { id: 401, name: 'Personal Chef', price: 150, duration: 'Per meal', description: 'Private chef service', image: null },
    { id: 402, name: 'Meal Prep Service', price: 100, duration: '2 hours', description: 'Weekly meal prep', image: null },
    { id: 403, name: 'Catering for Events', price: 200, duration: 'Per event', description: 'Event catering', image: null },
    { id: 404, name: 'Cooking Classes', price: 80, duration: '2 hours', description: 'Learn to cook', image: null },
    { id: 405, name: 'Special Diet Cooking', price: 120, duration: 'Per meal', description: 'Diet-specific meals', image: null }
  ],
  5: [ // Carpentry
    { id: 501, name: 'Furniture Repair', price: 65, duration: '1-2 hours', description: 'Fix furniture', image: null },
    { id: 502, name: 'Cabinet Installation', price: 150, duration: '3 hours', description: 'Install cabinets', image: null },
    { id: 503, name: 'Shelving Installation', price: 80, duration: '2 hours', description: 'Custom shelves', image: null },
    { id: 504, name: 'Door Repair/Installation', price: 100, duration: '2 hours', description: 'Door services', image: null },
    { id: 505, name: 'Wood Finishing', price: 90, duration: '2 hours', description: 'Stain and finish wood', image: null }
  ],
  6: [ // Gardening & Landscaping
    { id: 601, name: 'Lawn Mowing', price: 40, duration: '1 hour', description: 'Regular lawn care', image: null },
    { id: 602, name: 'Garden Design', price: 120, duration: '2 hours', description: 'Design your garden', image: null },
    { id: 603, name: 'Plant Installation', price: 85, duration: '1.5 hours', description: 'Plant installation', image: null },
    { id: 604, name: 'Weed Control', price: 50, duration: '1 hour', description: 'Remove weeds', image: null },
    { id: 605, name: 'Landscape Maintenance', price: 100, duration: '2 hours', description: 'Monthly maintenance', image: null }
  ],
  7: [ // Laundry & Dry Cleaning
    { id: 701, name: 'Dry Cleaning', price: 35, duration: 'Per load', description: 'Professional dry cleaning', image: null },
    { id: 702, name: 'Laundry Service', price: 25, duration: 'Per load', description: 'Wash and fold', image: null },
    { id: 703, name: 'Ironing Service', price: 20, duration: 'Per load', description: 'Professional ironing', image: null },
    { id: 704, name: 'Stain Removal', price: 15, duration: 'Per item', description: 'Remove tough stains', image: null },
    { id: 705, name: 'Tailoring & Alterations', price: 30, duration: 'Per item', description: 'Adjust clothing', image: null }
  ],
  8: [ // Painting & Decoration
    { id: 801, name: 'Interior Painting', price: 85, duration: '2-3 hours', description: 'Paint interior walls', image: null },
    { id: 802, name: 'Exterior Painting', price: 120, duration: '3-4 hours', description: 'Paint exterior', image: null },
    { id: 803, name: 'Accent Wall', price: 65, duration: '2 hours', description: 'Special accent painting', image: null },
    { id: 804, name: 'Wallpaper Installation', price: 95, duration: '2.5 hours', description: 'Install wallpaper', image: null },
    { id: 805, name: 'Decoration Consultation', price: 50, duration: '1 hour', description: 'Design advice', image: null }
  ]
};

// Legacy SERVICES export for backward compatibility
export const SERVICES = CATEGORIES;

export const ESTIMATED_ARRIVAL_MIN = 10;
export const ESTIMATED_ARRIVAL_MAX = 15;
