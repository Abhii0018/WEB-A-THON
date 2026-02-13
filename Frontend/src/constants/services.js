import { Home, Wrench, Zap, ChefHat } from 'lucide-react';
import cleanImage from '../assets/clean1.jpeg';
import plumberImage from '../assets/plumber.jpeg';
import electricianImage from '../assets/electrician.jpeg';
import cookingImage from '../assets/cook.png';

export const SERVICES = [
  {
    id: 1,
    title: 'Home Cleaning',
    icon: Home,
    image: cleanImage,
    description: 'Professional home cleaning services'
  },
  {
    id: 2,
    title: 'Plumbing',
    icon: Wrench,
    image: plumberImage,
    description: 'Expert plumbing repairs and installations'
  },
  {
    id: 3,
    title: 'Electrician',
    icon: Zap,
    image: electricianImage,
    description: 'Licensed electrician services'
  },
  {
    id: 4,
    title: 'Cooking',
    icon: ChefHat,
    image: cookingImage,
    description: 'Professional cooking and meal prep'
  }
];

export const ESTIMATED_ARRIVAL_MIN = 10;
export const ESTIMATED_ARRIVAL_MAX = 15;
