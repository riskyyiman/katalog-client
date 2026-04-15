export interface Product {
  id: number;
  nama: string;
  harga: number;
  gambar: string;
  category: string;
  stok: number;
  deskripsi?: string;

  // Field Tambahan/Fallback
  name?: string;
  price?: number;
  image_url?: string;
  old_price?: number;
  discount?: number;
  sizes?: string[];
  additional_images?: string[];
}

export interface FAQ {
  q: string;
  a: string;
  icon: string;
  category: string;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size: string;
}
