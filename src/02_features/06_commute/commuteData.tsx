import DirectionsCarOutlined from '@mui/icons-material/DirectionsCarOutlined';
import LocalHospitalOutlined from '@mui/icons-material/LocalHospitalOutlined';
import DirectionsWalkRounded from '@mui/icons-material/DirectionsWalkRounded';
import ApartmentOutlined from '@mui/icons-material/ApartmentOutlined';
import SchoolOutlined from '@mui/icons-material/SchoolOutlined';
import ParkOutlined from '@mui/icons-material/ParkOutlined';
import LocationOnRounded from '@mui/icons-material/LocationOnRounded';
import SearchRounded from '@mui/icons-material/SearchRounded';
import ChevronRightRounded from '@mui/icons-material/ChevronRightRounded';
import SellOutlined from '@mui/icons-material/SellOutlined';
import AddRounded from '@mui/icons-material/AddRounded';
import CheckRounded from '@mui/icons-material/CheckRounded';
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
  Drive: ({ color = "currentColor" }) => <DirectionsCarOutlined style={{ color }} className="w-[14px] h-[14px]" />,
  Hospital: () => <LocalHospitalOutlined className="w-[18px] h-[18px]" />,
  Walk: ({ color = "currentColor" }) => <DirectionsWalkRounded style={{ color }} className="w-[14px] h-[14px]" />,
  Building: () => <ApartmentOutlined className="w-[18px] h-[18px]" />,
  School: () => <SchoolOutlined className="w-[18px] h-[18px]" />,
  Tree: () => <ParkOutlined className="w-[18px] h-[18px]" />,
  MapPin: () => <LocationOnRounded className="w-[20px] h-[20px]" />,
  Search: () => <SearchRounded className="w-[16px] h-[16px] text-[#8A7D74]" />,
  ChevronRight: () => <ChevronRightRounded className="w-[16px] h-[16px]" />,
  Tag: () => <SellOutlined className="w-[16px] h-[16px] text-[#8A7D74]" />,
  Plus: () => <AddRounded className="w-[16px] h-[16px]" />,
  Check: () => <CheckRounded className="w-[14px] h-[14px]" />
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
