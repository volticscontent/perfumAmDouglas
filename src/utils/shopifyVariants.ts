// Importação dinâmica para evitar problemas de build
export interface ShopifyVariant {
  handle: string;
  variant_id: number;
  product_id: number;
  title: string;
  price: string;
}

// Carrega os dados do arquivo JSON de forma dinâmica
export const getShopifyVariants = async (): Promise<ShopifyVariant[]> => {
  try {
    const shopifyVariants = await import('../data/shopify-variants.json');
    return shopifyVariants.default as ShopifyVariant[];
  } catch (error) {
    console.error('Erro ao carregar shopify-variants.json:', error);
    return [];
  }
};

// Encontra uma variante pelo handle
export const findVariantByHandle = async (handle: string): Promise<ShopifyVariant | undefined> => {
  const variants = await getShopifyVariants();
  return variants.find((variant: ShopifyVariant) => variant.handle === handle);
};

// Função para obter URL do produto no Shopify
export const getShopifyProductUrl = async (handle: string): Promise<string> => {
  const variant = await findVariantByHandle(handle);
  const domain = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN || 'cc1ve6-49.myshopify.com';
  return variant ? `https://${domain}/products/${handle}` : '';
};

// Função para obter URL de checkout direto
export const getShopifyCheckoutUrl = async (variantId: number, quantity: number = 1): Promise<string> => {
  const domain = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN || 'cc1ve6-49.myshopify.com';
  return `https://${domain}/cart/${variantId}:${quantity}`;
};

// Função para checkout com múltiplos produtos
export const getShopifyMultiCheckoutUrl = (items: { variantId: number; quantity: number }[]): string => {
  const domain = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN || 'cc1ve6-49.myshopify.com';
  const cartItems = items.map(item => `${item.variantId}:${item.quantity}`).join(',');
  return `https://${domain}/cart/${cartItems}`;
};

// Verifica se um produto existe no Shopify
export const isProductInShopify = async (handle: string): Promise<boolean> => {
  const variant = await findVariantByHandle(handle);
  return !!variant;
};