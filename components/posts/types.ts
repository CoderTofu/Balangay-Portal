export type Listing = {
  id: string;
  title: string;
  subtitle?: string;
  sellerName: string;
  tags: string[];
  lookingFor: string;
  trusted?: boolean;
  imageSrc?: string;
  stars: number; // 0..5 (decimals allowed)
};

