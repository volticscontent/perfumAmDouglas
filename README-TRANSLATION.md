# 🇩🇪 PERFUME ALEMANHA - SISTEMA DE TRADUÇÃO

Sistema completo para traduzir e adaptar produtos de fragrâncias para o mercado alemão, com integração direta ao Shopify.

## 📋 VISÃO GERAL

Este sistema processa automaticamente:
- ✅ **Tradução** de títulos e descrições EN → DE
- ✅ **Identificação** de marcas por nome de imagem
- ✅ **Conversão** de preços GBP → EUR
- ✅ **Geração** de tags alemãs organizadas
- ✅ **Criação** de handles/slugs alemães
- ✅ **Sincronização** com Shopify via API
- ✅ **Export** para CSV e JSON

## 🚀 INSTALAÇÃO RÁPIDA

### 1. Instalar Dependências
```bash
cd scripts
npm install
```

### 2. Configurar Variáveis de Ambiente
```bash
# Copiar arquivo de exemplo
cp .env.example .env

# Editar com suas credenciais Shopify
notepad .env
```

### 3. Executar Tradução
```bash
# Apenas tradução (sem sincronizar)
npm run translate

# Tradução + Sincronização com Shopify
# (configure SYNC_TO_SHOPIFY=true no .env)
node run-translation.js
```

## 📁 ESTRUTURA DE ARQUIVOS

```
perfume_alemanha/
├── scripts/
│   ├── product-translator.js     # Script principal de tradução
│   ├── shopify-integration.js    # Integração com Shopify APIs
│   ├── run-translation.js       # Executor principal
│   └── package.json             # Dependências
├── .env.example                 # Exemplo de configuração
├── Planilha Sales - unified_products.csv.csv  # Dados originais
├── products-germany.csv         # Produtos traduzidos (gerado)
├── products-shopify-germany.json # JSON para Shopify (gerado)
└── README-TRANSLATION.md        # Esta documentação
```

## 🔧 CONFIGURAÇÃO SHOPIFY

### Tokens Necessários

#### 1. Storefront Access Token
```
Admin > Apps > Develop apps > Create app > Storefront API access
Permissões necessárias:
- unauthenticated_read_product_listings
- unauthenticated_read_product_inventory  
- unauthenticated_write_checkouts
- unauthenticated_read_checkouts
```

#### 2. Admin API Token
```
Admin > Apps > Develop apps > Create app > Admin API access
Permissões necessárias:
- read_products
- write_products
- read_product_listings
- write_product_listings
```

### Exemplo de .env
```env
SHOP_DOMAIN=sua-loja.myshopify.com
SHOPIFY_STOREFRONT_TOKEN=shpat_xxxxxxxxxxxxx
SHOPIFY_ADMIN_PASSWORD=shpat_xxxxxxxxxxxxx
SYNC_TO_SHOPIFY=true
DRY_RUN=false
```

## 📊 PROCESSO DE TRADUÇÃO

### Input: CSV Original
```csv
id,handle,title,price_regular,price_currency,brands,images,category
1,3-piece-mens-set,3-Piece Men's Fragrance Set,49.9,GBP,Dior|Chanel,dior-sauvage-set.jpg,Men's Fragrances
```

### Output: CSV Alemão
```csv
id,handle,title,price_regular,price_currency,brands,primary_brand,tags,seo_title
1,3-teiliges-herren-duft-set-dior,3-teiliges Herren Duft-Set,59.88,EUR,Dior|Chanel,Dior,herren|duft-set|dior|premium,3-teiliges Herren Duft-Set | Premium Düfte Deutschland
```

### Output: JSON Shopify
```json
{
  "title": "3-teiliges Herren Duft-Set",
  "handle": "3-teiliges-herren-duft-set-dior",
  "price": 59.88,
  "currency": "EUR",
  "tags": ["herren", "duft-set", "dior", "premium"],
  "metafields": {
    "internal.brands": "Dior|Chanel",
    "seo.meta_title": "3-teiliges Herren Duft-Set | Premium Düfte Deutschland",
    "market.country": "DE",
    "market.language": "de"
  }
}
```

## 🏷️ SISTEMA DE TAGS ALEMÃS

### Tags por Categoria
```javascript
Masculino: ['herren', 'männer', 'herrendüfte', 'geschenkset']
Feminino:  ['damen', 'frauen', 'damendüfte', 'geschenkset']
Gerais:    ['duft-set', 'parfüm', 'authentisch', 'premium']
Marcas:    ['dior', 'chanel', 'versace', 'hugo-boss', ...]
```

### Coleções Sugeridas
- **Herrendüfte** (Fragrâncias Masculinas)
- **Damendüfte** (Fragrâncias Femininas)  
- **Premium-Sets** (Sets Premium)
- **Geschenksets** (Sets Presente)
- **[Nome da Marca]** (Por marca específica)

## 🔄 INTEGRAÇÃO SHOPIFY

### Queries GraphQL Prontas

#### Buscar Produtos por Coleção
```graphql
query getProductsByCollection($handle: String!, $first: Int!) {
  collectionByHandle(handle: $handle) {
    products(first: $first) {
      edges {
        node {
          id
          title
          handle
          variants(first: 10) {
            edges {
              node {
                id
                price { amount currencyCode }
                availableForSale
              }
            }
          }
        }
      }
    }
  }
}
```

#### Criar Carrinho
```graphql
mutation cartCreate($input: CartInput!) {
  cartCreate(input: $input) {
    cart {
      id
      checkoutUrl
      totalQuantity
      cost {
        totalAmount { amount currencyCode }
      }
    }
  }
}
```

### Exemplo de Uso da API
```javascript
const ShopifyIntegration = require('./scripts/shopify-integration');

const shopify = new ShopifyIntegration({
    shopDomain: 'sua-loja.myshopify.com',
    storefrontToken: 'seu-token'
});

// Buscar produtos alemães
const products = await shopify.getProductsByCollection('herrenduefte', 20);

// Criar carrinho e adicionar produto
const cart = await shopify.createCart();
await shopify.addToCart(cart.cart.id, variantId, 1);
console.log('Checkout URL:', cart.cart.checkoutUrl);
```

## 📈 CONVERSÃO DE PREÇOS

### Taxa de Câmbio
```
GBP → EUR: 1.20 (configurável no .env)
Exemplo: 49.9 GBP = 59.88 EUR
```

### Arredondamento
- Preços arredondados para 2 casas decimais
- Formato alemão: 59,88 € (no frontend)
- API Shopify: 59.88 (formato decimal)

## 🎯 HANDLES/SLUGS ALEMÃES

### Padrão de Nomenclatura
```
Original: 3-piece-mens-fragrance-set-dior
Alemão:   3-teiliges-herren-duft-set-dior

Regras:
- 3-piece → 3-teiliges
- mens → herren  
- fragrance-set → duft-set
- Marca no final (se não presente)
- Máximo 80 caracteres
- Apenas a-z, 0-9, hífens
```

## 🔍 IDENTIFICAÇÃO DE MARCAS

### Por Nome de Imagem
```javascript
// Arquivo: dior-sauvage-chanel-bleu.jpg
// Marcas detectadas: ['Dior', 'Chanel']

// Arquivo: versace-eros-hugo-boss.jpg  
// Marcas detectadas: ['Versace', 'Hugo Boss']
```

### Mapeamento de Marcas
```javascript
'dior' → 'Dior'
'chanel' → 'Chanel'
'ysl' → 'Yves Saint Laurent'
'hugo-boss' → 'Hugo Boss'
'paco-rabanne' → 'Paco Rabanne'
// ... 40+ marcas mapeadas
```

## 📋 COMANDOS DISPONÍVEIS

```bash
# Instalar dependências
npm install

# Apenas tradução (sem Shopify)
npm run translate

# Processo completo (tradução + Shopify)
node run-translation.js

# Teste de conexão Shopify
node -e "
const ShopifyIntegration = require('./shopify-integration');
const shopify = new ShopifyIntegration({
  shopDomain: process.env.SHOP_DOMAIN,
  storefrontToken: process.env.SHOPIFY_STOREFRONT_TOKEN
});
shopify.validateConfig();
console.log('✅ Conexão OK');
"
```

## 📊 RELATÓRIOS GERADOS

### 1. processing-report.json
```json
{
  "total_products": 42,
  "brands_detected": {"Dior": 8, "Chanel": 6, ...},
  "price_range": {"min_eur": 59.88, "max_eur": 59.88},
  "processing_summary": {
    "exchange_rate_used": 1.20,
    "target_market": "Germany"
  }
}
```

### 2. shopify-sync-results.json
```json
{
  "created": [/* produtos criados */],
  "updated": [/* produtos atualizados */],
  "errors": [/* erros encontrados */]
}
```

### 3. final-report.json
```json
{
  "timestamp": "2024-01-15T10:30:00Z",
  "status": "completed",
  "files_generated": [
    {"file": "products-germany.csv", "size": 15420},
    {"file": "products-shopify-germany.json", "size": 28340}
  ],
  "next_steps": ["Verificar produtos no Shopify Admin", ...]
}
```

## 🚨 TROUBLESHOOTING

### Erro: "CSV não encontrado"
```bash
# Verificar se o arquivo existe
ls -la "Planilha Sales - unified_products.csv.csv"

# Verificar caminho no script
# Editar CONFIG.INPUT_FILE em product-translator.js
```

### Erro: "Shopify Authentication"
```bash
# Verificar tokens no .env
cat .env | grep SHOPIFY

# Testar conexão
curl -X POST \
  https://sua-loja.myshopify.com/api/2024-01/graphql.json \
  -H "X-Shopify-Storefront-Access-Token: seu-token" \
  -d '{"query": "{ shop { name } }"}'
```

### Erro: "Rate Limiting"
```javascript
// Aumentar delay entre requests
// Em shopify-integration.js, linha ~380:
await new Promise(resolve => setTimeout(resolve, 1000)); // 1 segundo
```

## 🎯 PRÓXIMOS PASSOS

1. **Verificar Produtos**: Admin > Products
2. **Criar Coleções**: Admin > Collections
3. **Configurar SEO**: Admin > Online Store > Preferences
4. **Testar Checkout**: Fazer pedido teste
5. **Integrar Frontend**: Usar queries GraphQL fornecidas

## 📞 SUPORTE

Para dúvidas ou problemas:
1. Verificar logs em `final-report.json`
2. Consultar documentação Shopify API
3. Testar queries no GraphiQL Admin

---

**✅ Sistema pronto para produção!**
**🇩🇪 Viel Erfolg mit Ihrem deutschen Parfüm-Shop!**