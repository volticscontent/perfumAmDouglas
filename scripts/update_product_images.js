const fs = require('fs');
const path = require('path');

// Caminhos dos arquivos
const productsJsonPath = path.join(__dirname, '../src/data/products.json');
const imagesDir = path.join(__dirname, '../public/products');

// Ler o JSON dos produtos
const productsData = JSON.parse(fs.readFileSync(productsJsonPath, 'utf8'));

// Ler as imagens disponíveis
const availableImages = fs.readdirSync(imagesDir);

// Função para extrair palavras-chave do título
function extractKeywords(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 2)
    .filter(word => !['piece', 'fragrance', 'set', 'premium', 'collection', 'the', 'and', 'für'].includes(word));
}

// Função para calcular similaridade entre duas strings
function calculateSimilarity(str1, str2) {
  const words1 = extractKeywords(str1);
  const words2 = extractKeywords(str2);
  
  let matches = 0;
  words1.forEach(word1 => {
    if (words2.some(word2 => word2.includes(word1) || word1.includes(word2))) {
      matches++;
    }
  });
  
  return matches / Math.max(words1.length, words2.length);
}

// Mapear imagens para produtos
let mappedCount = 0;
let unmappedProducts = [];

productsData.products.forEach(product => {
  let bestMatch = null;
  let bestScore = 0;
  
  // Procurar a melhor correspondência
  availableImages.forEach(imageName => {
    const imageNameWithoutExt = imageName.replace(/\.(png|jpg|jpeg|webp)$/i, '');
    const similarity = calculateSimilarity(product.title, imageNameWithoutExt);
    
    if (similarity > bestScore && similarity > 0.3) { // Threshold mínimo de 30%
      bestScore = similarity;
      bestMatch = imageName;
    }
  });
  
  if (bestMatch) {
    product.images = [`/products/${bestMatch}`];
    console.log(`✓ "${product.title}" -> ${bestMatch} (score: ${(bestScore * 100).toFixed(1)}%)`);
    mappedCount++;
  } else {
    // Fallback: usar uma imagem padrão baseada no tipo
    const fallbackImages = {
      'mens': '3-piece-mens-fragrance-set-sauvage-invictus-1-million.jpg',
      'womens': '3-piece-womens-fragrance-set-miss-212-la-vie-est-belle-jadore.jpg',
      'unisex': '3-piece-fragrance-set-1-million-parfum-sauvage-dior-invictus-paco-rabanne.png'
    };
    
    let fallbackImage = fallbackImages.unisex;
    
    if (product.title.toLowerCase().includes('men') || product.category.gender === 'men') {
      fallbackImage = fallbackImages.mens;
    } else if (product.title.toLowerCase().includes('women') || product.category.gender === 'women') {
      fallbackImage = fallbackImages.womens;
    }
    
    product.images = [`/products/${fallbackImage}`];
    console.log(`~ "${product.title}" -> ${fallbackImage} (fallback)`);
    unmappedProducts.push(product.title);
  }
});

// Salvar o JSON atualizado
fs.writeFileSync(productsJsonPath, JSON.stringify(productsData, null, 2));

console.log('\n✅ Atualização concluída!');
console.log(`📊 Total de produtos: ${productsData.products.length}`);
console.log(`🎯 Produtos mapeados com precisão: ${mappedCount}`);
console.log(`🔄 Produtos com imagem fallback: ${unmappedProducts.length}`);

if (unmappedProducts.length > 0) {
  console.log('\n📝 Produtos que usaram imagem fallback:');
  unmappedProducts.forEach(title => console.log(`  - ${title}`));
}