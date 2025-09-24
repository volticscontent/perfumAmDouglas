const fs = require('fs');
const path = require('path');

// Caminhos dos arquivos
const mainProductsPath = path.join(__dirname, '..', 'products-shopify-germany-updated.json');
const localProductsPath = path.join(__dirname, '..', 'src', 'data', 'products.json');

console.log('🔧 Iniciando correção de preços...');

try {
  // Ler arquivo principal (fonte da verdade)
  console.log('📖 Lendo arquivo principal de produtos...');
  const mainProducts = JSON.parse(fs.readFileSync(mainProductsPath, 'utf8'));
  
  // Ler arquivo local (que precisa ser corrigido)
  console.log('📖 Lendo arquivo local de produtos...');
  const localData = JSON.parse(fs.readFileSync(localProductsPath, 'utf8'));
  const localProducts = localData.products || [];
  
  // Criar mapa de preços corretos por ID
  const priceMap = {};
  mainProducts.forEach(product => {
    const id = product.metafields?.['internal.id'];
    if (id) {
      priceMap[id] = {
        price: product.price,
        variantPrice: product.variants?.[0]?.price || product.price
      };
    }
  });
  
  console.log(`💰 Encontrados ${Object.keys(priceMap).length} preços de referência`);
  
  // Corrigir preços no arquivo local
  let correctedCount = 0;
  localProducts.forEach(product => {
    const id = product.id?.toString();
    if (id && priceMap[id]) {
      const correctPrice = priceMap[id].price;
      
      // Verificar se o preço está incorreto
      if (product.price !== correctPrice) {
        console.log(`🔄 Corrigindo produto ID ${id}: ${product.price}€ → ${correctPrice}€`);
        
        // Corrigir preço principal
        product.price = correctPrice;
        
        // Corrigir preço nas variantes
        if (product.variants && product.variants.length > 0) {
          product.variants.forEach(variant => {
            variant.price = correctPrice;
          });
        }
        
        correctedCount++;
      }
    }
  });
  
  console.log(`✅ ${correctedCount} produtos corrigidos`);
  
  // Salvar arquivo corrigido
  if (correctedCount > 0) {
    console.log('💾 Salvando arquivo corrigido...');
    localData.products = localProducts;
    fs.writeFileSync(localProductsPath, JSON.stringify(localData, null, 2), 'utf8');
    console.log('✅ Arquivo salvo com sucesso!');
  } else {
    console.log('ℹ️ Nenhuma correção necessária');
  }
  
  // Relatório final
  console.log('\n📊 RELATÓRIO FINAL:');
  console.log(`- Produtos verificados: ${localProducts.length}`);
  console.log(`- Produtos corrigidos: ${correctedCount}`);
  console.log(`- Preços de referência: ${Object.keys(priceMap).length}`);
  
} catch (error) {
  console.error('❌ Erro durante a correção:', error.message);
  process.exit(1);
}