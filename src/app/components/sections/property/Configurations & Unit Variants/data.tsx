
import type { UnitItem, FeedbackOption } from './types';

export const mockData: UnitItem[] = [
  { id: '1',  bua: '1,110', facing: 'East',       availability: 'Available', tower: 'Tower A', type: '2 BHK' },
  { id: '4',  bua: '1,180', facing: 'South',      availability: 'Sold Out',  tower: 'Tower A', type: '2 BHK' },
  { id: '6',  bua: '1,340', facing: 'North',      availability: 'Available', tower: 'Tower A', type: '3 BHK' },
  { id: '9',  bua: '1,450', facing: 'North-West', availability: 'Available', tower: 'Tower A', type: '3 BHK' },
  { id: '12', bua: '1,800', facing: 'South',      availability: 'Available', tower: 'Tower A', type: '4 BHK' },
  { id: '15', bua: '2,100', facing: 'North-West', availability: 'Limited',   tower: 'Tower A', type: '4 BHK' },

  { id: '2',  bua: '1,250', facing: 'West',       availability: 'Limited',   tower: 'Tower B', type: '2 BHK' },
  { id: '5',  bua: '1,200', facing: 'North-East', availability: 'Available', tower: 'Tower B', type: '2 BHK' },
  { id: '16', bua: '1,085', facing: 'East',       availability: 'Available', tower: 'Tower B', type: '2 BHK' },
  { id: '17', bua: '1,320', facing: 'South-West', availability: 'Sold Out',  tower: 'Tower B', type: '2 BHK' },
  { id: '20', bua: '1,420', facing: 'South-East', availability: 'Limited',   tower: 'Tower B', type: '3 BHK' },
  { id: '21', bua: '1,380', facing: 'North-West', availability: 'Available', tower: 'Tower B', type: '3 BHK' },
  { id: '22', bua: '1,460', facing: 'East',       availability: 'Available', tower: 'Tower B', type: '3 BHK' },


  { id: '7',  bua: '1,350', facing: 'East',       availability: 'Sold Out',  tower: 'Tower C', type: '3 BHK' },
  { id: '10', bua: '1,500', facing: 'West',       availability: 'Available', tower: 'Tower C', type: '3 BHK' },
  { id: '18', bua: '1,410', facing: 'North',      availability: 'Available', tower: 'Tower C', type: '3 BHK' },
  { id: '19', bua: '1,480', facing: 'South-East', availability: 'Limited',   tower: 'Tower C', type: '3 BHK' },
];

export const TOWER_BHK_RESTRICTION: Record<string, string | null> = {
  'Tower A': null,
  'Tower B': null,
  'Tower C': null,
};

export const defaultUnitData: Required<UnitItem> = {
  id: '2',
  bua: '1,250',
  facing: 'West',
  availability: 'Limited',
  tower: 'Tower B',
  type: '2 BHK',
  price: '₹ 1.2 Crore',
  towers: ['Tower B'],
  imageUrl: 'https://tse2.mm.bing.net/th/id/OIP.zfjO_Bc4Zd12w29SSI7sagAAAA?rs=1&pid=ImgDetMain&o=7&rm=3',
  specs: [
    { name: 'Living',              dimensions: "16' x 12'" },
    { name: 'Dining',              dimensions: "10' x 9'"  },
    { name: 'Kitchen',             dimensions: "9' x 8'"   },
    { name: 'Master Bedroom',      dimensions: "14' x 11'" },
    { name: 'Bedroom 2',           dimensions: "12' x 10'" },
    { name: 'Toilets & Balconies', dimensions: '3 / 2'     },
  ],
};

export const FEEDBACK_OPTIONS: FeedbackOption[] = [
  { emoji: '😍', label: 'Love it',    value: 'love' },
  { emoji: '🙂', label: 'Like it',    value: 'like' },
  { emoji: '😐', label: "It's okay",  value: 'okay' },
  { emoji: '😞', label: 'Not for me', value: 'no'   },
];
