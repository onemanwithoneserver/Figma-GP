import React from 'react';

export interface PlaceItem {
  id: string;
  name: string;
  distance: string;
  color: string;
  icon: string;
}

export interface TabData {
  title: string;
  color: string;
  footer: string;
  items: PlaceItem[];
}

export interface TabInfo {
  id: string;
  label: string;
  color: string;
}

export const Icons = {
  Drive: ({ color = "currentColor" }) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 16H9m10 0h3v-3.15a1 1 0 00-.84-.99L16 11l-2.7-3.6a2 2 0 00-1.6-.8H9.3a2 2 0 00-1.6.8L5 11l-5.16.86a1 1 0 00-.84.99V16h3m10 0a2 2 0 11-4 0m4 0a2 2 0 10-4 0m-6 0a2 2 0 11-4 0m4 0a2 2 0 10-4 0"></path></svg>,
  Hospital: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M12 8v8M8 12h8"/></svg>,
  Walk: ({ color = "currentColor" }) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5m-1 0a1 1 0 102 0a1 1 0 10-2 0m-1 6l1-4l1 4m-1-4v10m-3-3l3 3l3-3"></path></svg>,
  Building: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><path d="M9 22v-4h6v4"></path><path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M16 10h.01M8 10h.01M8 14h.01M12 14h.01M16 14h.01"></path></svg>,
  School: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>,
  Tree: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 11l7-7 7 7M5 15l7-7 7 7"/></svg>,
  MapPin: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3" fill="white"></circle></svg>,
  Search: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8A7D74" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>,
  ChevronRight: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>,
  Tag: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8A7D74" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>,
  Plus: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>,
  Check: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
};

export const INITIAL_TABS: TabInfo[] = [
  { id: 'frequent', label: 'Frequent Places', color: '#322822' },
  { id: 'education', label: 'Education', color: '#322822' },
  { id: 'emergency', label: 'Emergency', color: '#322822' },
  { id: 'shopping', label: 'Shopping', color: '#322822' },
  { id: 'nearby', label: 'Nearby', color: '#322822' },
];

export const INITIAL_DATA: Record<string, TabData> = {
  frequent: {
    title: 'Frequent Places',
    color: '#322822',
    footer: 'Private & visble only to you.',
    items: [
      { id: 'f1', name: 'Workplace - Hitech City', distance: '18.2 km', color: '#E76F26', icon: 'building' },
      { id: 'f2', name: 'Gym - Golds Gym', distance: '2.5 km', color: '#E76F26', icon: 'building' },
    ]
  },
  education: {
    title: 'Distances calculated via fastest driving routes.',
    color: '#322822',
    footer: '',
    items: [
      { id: 'e1', name: 'Ryan International School', distance: '1.8 km', color: '#E76F26', icon: 'school' },
      { id: 'e2', name: 'Delhi Public School', distance: '3.1 km', color: '#E76F26', icon: 'school' },
      { id: 'e3', name: 'Oakridge International', distance: '4.5 km', color: '#E76F26', icon: 'school' },
      { id: 'e4', name: 'Chirec Public School', distance: '5.2 km', color: '#E76F26', icon: 'school' },
      { id: 'e5', name: 'Global Indian International', distance: '6.8 km', color: '#E76F26', icon: 'school' },
      { id: 'e6', name: 'Silver Oaks International', distance: '7.4 km', color: '#E76F26', icon: 'school' },
      { id: 'e7', name: 'Meridian School', distance: '4.1 km', color: '#E76F26', icon: 'school' },
      { id: 'e8', name: 'The Gaudium School', distance: '10.5 km', color: '#E76F26', icon: 'school' },
      { id: 'e9', name: 'Pebble Creek Life School', distance: '2.9 km', color: '#E76F26', icon: 'school' },
      { id: 'e10', name: 'Foster Billabong High', distance: '5.7 km', color: '#E76F26', icon: 'school' },
    ]
  },
  emergency: {
    title: 'Emergency locations are auto-detected.',
    color: '#322822',
    footer: '',
    items: [
      { id: 'em1', name: 'Apollo Hospital', distance: '2.3 km', color: '#E76F26', icon: 'hospital' },
      { id: 'em2', name: 'Continental Hospital', distance: '4.1 km', color: '#E76F26', icon: 'hospital' },
      { id: 'em3', name: 'Care Hospitals', distance: '5.8 km', color: '#E76F26', icon: 'hospital' },
      { id: 'em4', name: 'Rainbow Children Hospital', distance: '3.5 km', color: '#E76F26', icon: 'hospital' },
      { id: 'em5', name: 'KIMS Hospitals', distance: '6.2 km', color: '#E76F26', icon: 'hospital' },
      { id: 'em6', name: 'Sunshine Hospitals', distance: '8.4 km', color: '#E76F26', icon: 'hospital' },
      { id: 'em7', name: 'Yashoda Hospitals', distance: '9.1 km', color: '#E76F26', icon: 'hospital' },
      { id: 'em8', name: 'Medicover Hospitals', distance: '5.5 km', color: '#E76F26', icon: 'hospital' },
      { id: 'em9', name: 'Star Hospitals', distance: '7.9 km', color: '#E76F26', icon: 'hospital' },
      { id: 'em10', name: 'Aster Prime Hospital', distance: '11.2 km', color: '#E76F26', icon: 'hospital' },
    ]
  },
  shopping: {
    title: 'Retail centers and grocery hubs.',
    color: '#322822',
    footer: '',
    items: [
      { id: 's1', name: 'Inorbit Mall', distance: '6.2 km', color: '#E76F26', icon: 'building' },
      { id: 's2', name: 'IKEA Hyderabad', distance: '5.9 km', color: '#E76F26', icon: 'building' },
      { id: 's3', name: 'Sarath City Capital Mall', distance: '7.4 km', color: '#E76F26', icon: 'building' },
      { id: 's4', name: 'Forum Sujana Mall', distance: '9.1 km', color: '#E76F26', icon: 'building' },
      { id: 's5', name: 'Reliance Digital', distance: '2.4 km', color: '#E76F26', icon: 'building' },
      { id: 's6', name: 'Ratnadeep Supermarket', distance: '1.2 km', color: '#E76F26', icon: 'building' },
      { id: 's7', name: 'Vijetha Supermarket', distance: '0.8 km', color: '#E76F26', icon: 'building' },
      { id: 's8', name: 'Lidl Premium Retails', distance: '3.3 km', color: '#E76F26', icon: 'building' },
      { id: 's9', name: 'Spar Hypermarket', distance: '4.7 km', color: '#E76F26', icon: 'building' },
      { id: 's10', name: 'Spencers Plaza', distance: '6.1 km', color: '#E76F26', icon: 'building' },
    ]
  },
  nearby: {
    title: 'Green spaces and recreational areas.',
    color: '#322822',
    footer: '',
    items: [
      { id: 'l1', name: 'Botanical Garden', distance: '4.8 km', color: '#E76F26', icon: 'tree' },
      { id: 'l2', name: 'KBR National Park', distance: '10.2 km', color: '#E76F26', icon: 'tree' },
      { id: 'l3', name: 'Durgam Cheruvu Lake Front', distance: '5.5 km', color: '#E76F26', icon: 'tree' },
      { id: 'l4', name: 'Golconda Fort', distance: '14.1 km', color: '#E76F26', icon: 'building' },
      { id: 'l5', name: 'Gachibowli Stadium', distance: '3.9 km', color: '#E76F26', icon: 'building' },
      { id: 'l6', name: 'Pala Pitta Cycling Park', distance: '2.7 km', color: '#E76F26', icon: 'tree' },
      { id: 'l7', name: 'Ocean Park Hyderabad', distance: '11.2 km', color: '#E76F26', icon: 'building' },
      { id: 'l8', name: 'Gandipet Lake View', distance: '12.8 km', color: '#E76F26', icon: 'tree' },
      { id: 'l9', name: 'Hussain Sagar Lake', distance: '15.6 km', color: '#E76F26', icon: 'tree' },
      { id: 'l10', name: 'Lumbini Park', distance: '16.2 km', color: '#E76F26', icon: 'tree' },
    ]
  }
};