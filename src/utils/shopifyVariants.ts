import shopifyVariants from '../../shopify-variants.json';

export interface ShopifyVariant {
  handle: string;
  variant_id: number;
  product_id: number;
  title: string;
  price: string;
}

// Carrega os dados do arquivo JSON
export const getShopifyVariants = (): ShopifyVariant[] => {
  return shopifyVariants as ShopifyVariant[];
};

// Encontra uma variante pelo handle
export const findVariantByHandle = (handle: string): ShopifyVariant | undefined => {
  return shopifyVariants.find((variant: ShopifyVariant) => variant.handle === handle);
};

// Cria URL do produto no Shopify
export const getShopifyProductUrl = (handle: string): string => {
  const variant = findVariantByHandle(handle);
  if (!variant) return '';
  
  return `https://cc1ve6-49.myshopify.com/products/${handle}`;
};

// Cria URL de checkout direto no Shopify
export const getShopifyCheckoutUrl = (variantId: number, quantity: number = 1): string => {
  return `https://cc1ve6-49.myshopify.com/cart/${variantId}:${quantity}`;
};

// Cria URL de checkout com múltiplos produtos
export const getShopifyMultiCheckoutUrl = (items: { variantId: number; quantity: number }[]): string => {
  const cartItems = items.map(item => `${item.variantId}:${item.quantity}`).join(',');
  return `https://cc1ve6-49.myshopify.com/cart/${cartItems}`;
};

// Verifica se um produto existe no Shopify
export const isProductInShopify = (handle: string): boolean => {
  return !!findVariantByHandle(handle);
};