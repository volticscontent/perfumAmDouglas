const fs = require('fs');
const path = require('path');

// Caminhos dos arquivos
const productsJsonPath = path.join(__dirname, '../src/data/products.json');
const sourceImagePath = path.join(__dirname, '../imagem_dos_produtos.jpg');
const targetImagePath = path.join(__dirname, '../public/products/imagem_dos_produtos.jpg');

console.log('🚀 Iniciando processo de adição de imagem aos produtos...');

try {
  // 1. Verificar se a imagem de origem existe
  if (!fs.existsSync(sourceImagePath)) {
    console.error('❌ Erro: Arquivo imagem_dos_produtos.jpg não encontrado na raiz do projeto');
    process.exit(1);
  }

  // 2. Criar diretório public/products se não existir
  const productsDir = path.dirname(targetImagePath);
  if (!fs.existsSync(productsDir)) {
    fs.mkdirSync(productsDir, { recursive: true });
    console.log('📁 Diretório public/products/ criado');
  }

  // 3. Copiar a imagem para o diretório correto
  fs.copyFileSync(sourceImagePath, targetImagePath);
  console.log('📸 Imagem copiada para public/products/imagem_dos_produtos.jpg');

  // 4. Ler o arquivo JSON dos produtos
  const productsData = JSON.parse(fs.readFileSync(productsJsonPath, 'utf8'));
  
  console.log(`📊 Total de produtos encontrados: ${productsData.products.length}`);

  // 5. Adicionar a imagem a todos os produtos
  let updatedCount = 0;
  const newImagePath = '/products/imagem_dos_produtos.jpg';

  productsData.products.forEach((product, index) => {
    // Verificar se a imagem já existe no array de imagens
    if (!product.images.includes(newImagePath)) {
      // Adicionar a nova imagem no início do array
      product.images.unshift(newImagePath);
      updatedCount++;
      console.log(`✅ Imagem adicionada ao produto ${index + 1}: ${product.title}`);
    } else {
      console.log(`⚠️ Produto ${index + 1} já possui a imagem: ${product.title}`);
    }
  });

  // 6. Salvar o arquivo JSON atualizado
  fs.writeFileSync(productsJsonPath, JSON.stringify(productsData, null, 2));
  
  console.log('\n🎉 Processo concluído com sucesso!');
  console.log(`📈 Produtos atualizados: ${updatedCount}/${productsData.products.length}`);
  console.log(`💾 Arquivo salvo: ${productsJsonPath}`);
  console.log(`🖼️ Imagem disponível em: ${targetImagePath}`);

} catch (error) {
  console.error('❌ Erro durante o processo:', error.message);
  process.exit(1);
}