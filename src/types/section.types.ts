export const sections = [
  'About',
  'Profile',
  'Education',
  'Interests',
  'Projects',
  'Work Experience'
] as const;

export type SectionKey = (typeof sections)[number];

export interface SectionContent {
  [key: string]: string;
} 