const fs = require('fs');
const path = require('path');

// Caminhos dos arquivos
const productsJsonPath = path.join(__dirname, '../src/data/products.json');

// Ler o JSON dos produtos
const productsData = JSON.parse(fs.readFileSync(productsJsonPath, 'utf8'));

// Dicionário de traduções para alemão
const translations = {
  // Termos gerais
  'Fragrance Set': 'Duft-Set',
  'Piece': 'teiliges',
  'Premium': 'Premium',
  'Collection': 'Kollektion',
  'Special Edition': 'Sonderausgabe',
  'Men\'s': 'Herren',
  'Women\'s': 'Damen',
  'Mens': 'Herren',
  'Womens': 'Damen',
  
  // Marcas (mantém nomes originais)
  'Sauvage': 'Sauvage',
  'Dior': 'Dior',
  'Chanel': 'Chanel',
  'Paco Rabanne': 'Paco Rabanne',
  'Carolina Herrera': 'Carolina Herrera',
  'Giorgio Armani': 'Giorgio Armani',
  'Versace': 'Versace',
  'Yves Saint Laurent': 'Yves Saint Laurent',
  'YSL': 'YSL',
  'Jean Paul Gaultier': 'Jean Paul Gaultier',
  'Gucci': 'Gucci',
  'Tom Ford': 'Tom Ford',
  'Creed': 'Creed',
  'Thierry Mugler': 'Thierry Mugler',
  'Mugler': 'Mugler',
  'Boss': 'Boss',
  'Hugo Boss': 'Hugo Boss',
  'Lancôme': 'Lancôme',
  'Givenchy': 'Givenchy',
  'Armani': 'Armani',
  'Emporio Armani': 'Emporio Armani',
  'Valentino': 'Valentino',
  'Dolce & Gabbana': 'Dolce & Gabbana',
  'Marc Jacobs': 'Marc Jacobs',
  'Bulgari': 'Bulgari',
  'Ferrari': 'Ferrari',
  'Azzaro': 'Azzaro',
  'Issey Miyake': 'Issey Miyake',
  'Prada': 'Prada',
  'Guerlain': 'Guerlain',
  'Armaf': 'Armaf',
  'Philipp Plein': 'Philipp Plein',
  'Moschino': 'Moschino',
  'Louis Vuitton': 'Louis Vuitton',
  'Parfums de Marly': 'Parfums de Marly',
  'Xerjoff': 'Xerjoff',
  'Initio': 'Initio',
  'Le Labo': 'Le Labo',
  'Frederic Malle': 'Frederic Malle',
  'Kilian': 'Kilian',
  'Byredo': 'Byredo',
  'Laboratorio Olfattivo': 'Laboratorio Olfattivo',
  'Narciso Rodriguez': 'Narciso Rodriguez',
  'Chloé': 'Chloé',
  
  // Nomes de perfumes específicos (mantém originais)
  '1 Million': '1 Million',
  'Invictus': 'Invictus',
  'Olympea': 'Olympea',
  'Coco Mademoiselle': 'Coco Mademoiselle',
  '212 VIP': '212 VIP',
  'Boss Bottled': 'Boss Bottled',
  'The Scent': 'The Scent',
  'Dylan Blue': 'Dylan Blue',
  'Phantom': 'Phantom',
  'Ultra Male': 'Ultra Male',
  'Scandal': 'Scandal',
  'J\'adore': 'J\'adore',
  'La Vie Est Belle': 'La Vie Est Belle',
  'Versace Eros': 'Versace Eros',
  'Miss 212': 'Miss 212',
  'Libre': 'Libre',
  'Light Blue': 'Light Blue',
  'Hypnotic Poison': 'Hypnotic Poison',
  'Dylan Turquoise': 'Dylan Turquoise',
  'Bleu de Chanel': 'Bleu de Chanel',
  'Silver Scent': 'Silver Scent',
  'Good Girl': 'Good Girl',
  'Fame': 'Fame',
  'Nº5': 'Nº5',
  'No. 5': 'No. 5',
  'Black Opium': 'Black Opium',
  'Angel': 'Angel',
  'Alien': 'Alien',
  'Santal 33': 'Santal 33',
  'Tobacco Vanille': 'Tobacco Vanille',
  'Aventus': 'Aventus',
  'Acqua di Giò': 'Acqua di Giò',
  'Code': 'Code',
  'Le Male': 'Le Male'
};

// Função para traduzir título
function translateTitle(title) {
  let translatedTitle = title;
  
  // Padrões específicos para traduções
  if (title.includes('3-Piece')) {
    // Substituir "3-Piece" por "3-teiliges"
    translatedTitle = translatedTitle.replace(/3-Piece/g, '3-teiliges');
    
    // Substituir "Fragrance Set" por "Duft-Set"
    translatedTitle = translatedTitle.replace(/Fragrance Set/g, 'Duft-Set');
    
    // Substituir "Men's" por "Herren"
    translatedTitle = translatedTitle.replace(/Men's/g, 'Herren');
    
    // Substituir "Women's" por "Damen"
    translatedTitle = translatedTitle.replace(/Women's/g, 'Damen');
    
    // Substituir "Premium Fragrance Collection" por "Premium Duft-Kollektion"
    translatedTitle = translatedTitle.replace(/Premium Fragrance Collection/g, 'Premium Duft-Kollektion');
    
    // Substituir "Special Edition" por "Sonderausgabe"
    translatedTitle = translatedTitle.replace(/Special Edition/g, 'Sonderausgabe');
  }
  
  return translatedTitle;
}

// Traduzir títulos dos produtos
let translatedCount = 0;

productsData.products.forEach(product => {
  const originalTitle = product.title;
  const translatedTitle = translateTitle(originalTitle);
  
  if (originalTitle !== translatedTitle) {
    product.title = translatedTitle;
    console.log(`✓ "${originalTitle}" → "${translatedTitle}"`);
    translatedCount++;
  } else {
    console.log(`~ "${originalTitle}" (sem alteração)`);
  }
});

// Salvar o JSON atualizado
fs.writeFileSync(productsJsonPath, JSON.stringify(productsData, null, 2));

console.log('\n✅ Tradução concluída!');
console.log(`📊 Total de produtos: ${productsData.products.length}`);
console.log(`🔄 Títulos traduzidos: ${translatedCount}`);
console.log(`📝 Títulos sem alteração: ${productsData.products.length - translatedCount}`);