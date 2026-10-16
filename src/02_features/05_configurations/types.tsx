// Shared TypeScript interfaces for the Configurations & Unit Variants section

export interface UnitSpec {
  name: string;
  dimensions: string;
}

export interface UnitItem {
  id: string;
  bua: string;
  facing: string;
  availability: string;
  tower: string;
  type: string;
  price?: string;
  towers?: string[];
  imageUrl?: string;
  specs?: UnitSpec[];
}

export interface FeedbackOption {
  emoji: string;
  label: string;
  value: string;
}
