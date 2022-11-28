export interface IndexContentProps {
  removed: boolean;
  order: number;
  isEnd: boolean;
  onExchange: (relation: number) => void;
  
  id: string;
  contentId: string;
};
