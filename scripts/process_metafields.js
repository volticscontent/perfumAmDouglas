const fs = require('fs');
const path = require('path');

// Lê o arquivo JSON original com metafields
const originalDataPath = path.join(__dirname, '..', 'products-shopify-germany-updated.json');
const processedDataPath = path.join(__dirname, '..', 'src', 'data', 'products.json');

console.log('Processando metafields do arquivo original...');

try {
  // Lê o arquivo original
  const originalData = JSON.parse(fs.readFileSync(originalDataPath, 'utf8'));
  
  // Lê o arquivo processado atual
  const processedData = JSON.parse(fs.readFileSync(processedDataPath, 'utf8'));
  
  // Cria um mapa dos produtos originais por handle
  const originalProductsMap = {};
  originalData.forEach(product => {
    const handle = product.handle.toLowerCase().replace(/\s+/g, '-');
    originalProductsMap[handle] = product;
  });
  
  // Atualiza os produtos processados com metafields
  processedData.products.forEach(product => {
    const originalProduct = originalProductsMap[product.handle];
    if (originalProduct && originalProduct.metafields) {
      product.metafields = originalProduct.metafields;
      console.log(`Metafields adicionados para: ${product.title}`);
    }
  });
  
  // Salva o arquivo atualizado
  fs.writeFileSync(processedDataPath, JSON.stringify(processedData, null, 2));
  
  console.log('✅ Metafields processados com sucesso!');
  console.log(`📊 Total de produtos: ${processedData.products.length}`);
  
  // Conta quantos produtos têm metafields
  const productsWithMetafields = processedData.products.filter(p => p.metafields).length;
  console.log(`🏷️ Produtos com metafields: ${productsWithMetafields}`);
  
} catch (error) {
  console.error('❌ Erro ao processar metafields:', error.message);
  process.exit(1);
}