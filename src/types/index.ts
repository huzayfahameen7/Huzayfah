export interface Product {
  id: string;
  sku: string;
  name: string;
  shortDescription: string;
  price: number;
  description: string;
  fabric: string;
  images: string[];
  category: string;
  blockPrintType: string;
  customizable?: boolean;
  printOptions?: string[];
  isNew?: boolean;
  isHot?: boolean;
  discount?: number;
  quantity?: number;
}

export interface CartItem extends Product {
  quantity: number;
  size?: string;
  // Unique id for cart entry combining product and chosen customization
  cartItemId: string;
  selectedCustomization?: {
    print?: string | null;
    garmentType?: string;
    fabric?: string;
    baseColor?: string;
    secondaryColor?: string;
    accent1Color?: string;
    accent2Color?: string;
    pattern?: string;
    goldFoil?: boolean;
    customDesignUrl?: string;
  };
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  address?: string;
}
