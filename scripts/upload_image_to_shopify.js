const fs = require('fs');
const path = require('path');

// Carregar variáveis de ambiente do arquivo .env
function loadEnvFile() {
  const envPath = path.join(__dirname, '..', '.env');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const lines = envContent.split('\n');
    
    lines.forEach(line => {
      const trimmedLine = line.trim();
      if (trimmedLine && !trimmedLine.startsWith('#')) {
        const [key, ...valueParts] = trimmedLine.split('=');
        if (key && valueParts.length > 0) {
          const value = valueParts.join('=');
          process.env[key.trim()] = value.trim();
        }
      }
    });
  }
}

// Carregar .env
loadEnvFile();

// Configuração do Shopify
const SHOPIFY_CONFIG = {
  domain: process.env.SHOPIFY_DOMAIN || 'cc1ve6-49.myshopify.com',
  adminApiToken: process.env.SHOPIFY_ADMIN_API_TOKEN || 'SEU_ADMIN_API_TOKEN_AQUI',
  apiVersion: process.env.SHOPIFY_API_VERSION || '2024-01'
};

// Carregar lista de produtos do shopify-buy-config.js
const shopifyConfig = require('../shopify-buy-config.js');

// Função para fazer upload de imagem para um produto
async function uploadImageToProduct(productId, imagePath) {
  try {
    // Ler o arquivo de imagem
    const imageBuffer = fs.readFileSync(imagePath);
    const imageBase64 = imageBuffer.toString('base64');
    const imageName = path.basename(imagePath);
    
    // Preparar dados da imagem
    const imageData = {
      image: {
        attachment: imageBase64,
        filename: imageName,
        alt: 'Produto Douglas Parfum'
      }
    };

    // URL da API do Shopify
    const url = `https://${SHOPIFY_CONFIG.domain}/admin/api/${SHOPIFY_CONFIG.apiVersion}/products/${productId}/images.json`;
    
    console.log(`Fazendo upload da imagem para produto ID: ${productId}`);
    
    // Fazer requisição para Shopify Admin API
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': SHOPIFY_CONFIG.adminApiToken
      },
      body: JSON.stringify(imageData)
    });

    if (response.ok) {
      const result = await response.json();
      console.log(`✅ Imagem adicionada com sucesso ao produto ${productId}`);
      return { success: true, productId, imageId: result.image.id };
    } else {
      const error = await response.text();
      console.error(`❌ Erro ao adicionar imagem ao produto ${productId}:`, error);
      return { success: false, productId, error };
    }
  } catch (error) {
    console.error(`❌ Erro ao processar produto ${productId}:`, error.message);
    return { success: false, productId, error: error.message };
  }
}

// Função principal
async function uploadImageToAllProducts() {
  console.log('🚀 Iniciando upload da imagem para todos os produtos...');
  
  // Verificar se o token está configurado
  if (SHOPIFY_CONFIG.adminApiToken === 'SEU_ADMIN_API_TOKEN_AQUI') {
    console.error('❌ ERRO: Configure o SHOPIFY_ADMIN_API_TOKEN antes de executar o script!');
    console.log('💡 Você pode:');
    console.log('   1. Definir a variável de ambiente: set SHOPIFY_ADMIN_API_TOKEN=seu_token');
    console.log('   2. Ou editar o arquivo e substituir SEU_ADMIN_API_TOKEN_AQUI pelo seu token');
    process.exit(1);
  }

  // Caminho da imagem
  const imagePath = path.join(__dirname, '..', 'imagem_dos_produtos.jpg');
  
  // Verificar se a imagem existe
  if (!fs.existsSync(imagePath)) {
    console.error(`❌ Imagem não encontrada: ${imagePath}`);
    process.exit(1);
  }

  console.log(`📸 Imagem encontrada: ${imagePath}`);
  
  // Extrair produtos do config (assumindo que a estrutura está disponível globalmente)
  let products = [];
  
  // Tentar extrair produtos do arquivo shopify-buy-config.js
  try {
    const configContent = fs.readFileSync(path.join(__dirname, '..', 'shopify-buy-config.js'), 'utf8');
    
    // Extrair array de produtos usando regex
    const productsMatch = configContent.match(/products:\s*\[([\s\S]*?)\]/);
    if (productsMatch) {
      const productsString = productsMatch[1];
      // Avaliar o JavaScript para obter o array
      products = eval(`[${productsString}]`);
    }
  } catch (error) {
    console.error('❌ Erro ao carregar produtos:', error.message);
    process.exit(1);
  }

  console.log(`📦 Encontrados ${products.length} produtos para processar`);
  
  const results = [];
  let successCount = 0;
  let errorCount = 0;

  // Processar cada produto
  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    console.log(`\n[${i + 1}/${products.length}] Processando: ${product.title}`);
    
    const result = await uploadImageToProduct(product.product_id, imagePath);
    results.push(result);
    
    if (result.success) {
      successCount++;
    } else {
      errorCount++;
    }
    
    // Pequena pausa entre requisições para não sobrecarregar a API
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  // Relatório final
  console.log('\n' + '='.repeat(50));
  console.log('📊 RELATÓRIO FINAL');
  console.log('='.repeat(50));
  console.log(`✅ Sucessos: ${successCount}`);
  console.log(`❌ Erros: ${errorCount}`);
  console.log(`📦 Total processado: ${results.length}`);
  
  // Salvar relatório detalhado
  const reportPath = path.join(__dirname, '..', 'shopify-upload-report.json');
  fs.writeFileSync(reportPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    summary: {
      total: results.length,
      success: successCount,
      errors: errorCount
    },
    results: results
  }, null, 2));
  
  console.log(`📄 Relatório detalhado salvo em: ${reportPath}`);
  
  if (errorCount > 0) {
    console.log('\n❌ Alguns produtos tiveram erros. Verifique o relatório para detalhes.');
  } else {
    console.log('\n🎉 Todas as imagens foram adicionadas com sucesso!');
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  uploadImageToAllProducts().catch(console.error);
}

module.exports = { uploadImageToAllProducts, uploadImageToProduct };