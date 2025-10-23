// Configuração do cliente Shopify usando variáveis de ambiente
export const shopifyConfig = {
  domain: process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN || 'cc1ve6-49.myshopify.com',
  storefrontAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || '',
};

// Função para criar cliente Shopify (para uso futuro se necessário)
export const createShopifyClient = () => {
  if (!shopifyConfig.storefrontAccessToken) {
    console.warn('Shopify Storefront Access Token não encontrado nas variáveis de ambiente');
  }
  
  return {
    domain: shopifyConfig.domain,
    storefrontAccessToken: shopifyConfig.storefrontAccessToken,
  };
};

// URLs do Shopify
export const getShopifyUrls = () => {
  const baseUrl = `https://${shopifyConfig.domain}`;
  
  return {
    store: baseUrl,
    cart: `${baseUrl}/cart/`,
    product: (handle: string) => `${baseUrl}/products/${handle}`,
    checkout: (items: string) => `${baseUrl}/cart/${items}`,
  };
};

// Função para gerar URL de checkout
export const generateCheckoutUrl = (items: { variantId: number; quantity: number }[]): string => {
  const cartItems = items.map(item => `${item.variantId}:${item.quantity}`).join(',');
  return getShopifyUrls().checkout(cartItems);
};