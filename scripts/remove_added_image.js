const fs = require('fs');
const path = require('path');

// Caminhos dos arquivos
const productsJsonPath = path.join(__dirname, '../src/data/products.json');

console.log('🔄 Revertendo alterações no arquivo products.json...');

try {
  // Ler o arquivo JSON dos produtos
  const productsData = JSON.parse(fs.readFileSync(productsJsonPath, 'utf8'));
  
  console.log(`📊 Total de produtos encontrados: ${productsData.products.length}`);

  // Remover a imagem adicionada de todos os produtos
  let removedCount = 0;
  const imageToRemove = '/products/imagem_dos_produtos.jpg';

  productsData.products.forEach((product, index) => {
    // Verificar se a imagem existe no array de imagens
    const imageIndex = product.images.indexOf(imageToRemove);
    if (imageIndex !== -1) {
      // Remover a imagem do array
      product.images.splice(imageIndex, 1);
      removedCount++;
      console.log(`✅ Imagem removida do produto ${index + 1}: ${product.title}`);
    } else {
      console.log(`⚠️ Produto ${index + 1} não possui a imagem: ${product.title}`);
    }
  });

  // Salvar o arquivo JSON atualizado
  fs.writeFileSync(productsJsonPath, JSON.stringify(productsData, null, 2));
  
  console.log('\n🎉 Reversão concluída com sucesso!');
  console.log(`📈 Produtos atualizados: ${removedCount}/${productsData.products.length}`);
  console.log(`💾 Arquivo salvo: ${productsJsonPath}`);

} catch (error) {
  console.error('❌ Erro durante a reversão:', error.message);
  process.exit(1);
}