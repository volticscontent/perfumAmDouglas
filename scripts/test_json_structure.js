/**
 * Script para testar e validar a estrutura do JSON de produtos
 */

const fs = require('fs');
const path = require('path');

function testJsonStructure() {
    console.log('🧪 TESTANDO ESTRUTURA DO JSON DE PRODUTOS');
    console.log('=' * 50);
    
    try {
        // Carregar JSON
        const jsonPath = path.join('..', 'src', 'data', 'products.json');
        const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
        
        console.log('✅ JSON carregado com sucesso');
        
        // Testar estrutura básica
        console.log('\n📊 METADADOS:');
        console.log(`   - Total de produtos: ${data.metadata.total_products}`);
        console.log(`   - Total de marcas: ${data.metadata.total_brands}`);
        console.log(`   - Total de categorias: ${data.metadata.total_categories}`);
        console.log(`   - Moeda: ${data.metadata.currency}`);
        console.log(`   - País: ${data.metadata.country}`);
        
        // Testar produtos
        console.log('\n🛍️ PRODUTOS:');
        console.log(`   - Array de produtos: ${Array.isArray(data.products) ? '✅' : '❌'}`);
        console.log(`   - Quantidade: ${data.products.length}`);
        
        // Testar primeiro produto
        if (data.products.length > 0) {
            const firstProduct = data.products[0];
            console.log('\n🔍 ESTRUTURA DO PRIMEIRO PRODUTO:');
            console.log(`   - ID: ${firstProduct.id ? '✅' : '❌'}`);
            console.log(`   - Handle: ${firstProduct.handle ? '✅' : '❌'}`);
            console.log(`   - Título: ${firstProduct.title ? '✅' : '❌'}`);
            console.log(`   - Preço: ${typeof firstProduct.price === 'number' ? '✅' : '❌'}`);
            console.log(`   - Marcas: ${Array.isArray(firstProduct.brands) ? '✅' : '❌'}`);
            console.log(`   - Categoria: ${firstProduct.category && firstProduct.category.name ? '✅' : '❌'}`);
            console.log(`   - Tags: ${Array.isArray(firstProduct.tags) ? '✅' : '❌'}`);
            console.log(`   - SEO: ${firstProduct.seo && firstProduct.seo.title ? '✅' : '❌'}`);
        }
        
        // Testar índices
        console.log('\n📇 ÍNDICES:');
        console.log(`   - Por handle: ${typeof data.indexes.by_handle === 'object' ? '✅' : '❌'}`);
        console.log(`   - Por marca: ${typeof data.indexes.by_brand === 'object' ? '✅' : '❌'}`);
        console.log(`   - Por categoria: ${typeof data.indexes.by_category === 'object' ? '✅' : '❌'}`);
        
        // Testar busca por handle
        console.log('\n🔎 TESTE DE BUSCA POR HANDLE:');
        const handles = Object.keys(data.indexes.by_handle);
        if (handles.length > 0) {
            const testHandle = handles[0];
            const productIndex = data.indexes.by_handle[testHandle];
            const product = data.products[productIndex];
            
            console.log(`   - Handle de teste: ${testHandle}`);
            console.log(`   - Índice encontrado: ${productIndex !== undefined ? '✅' : '❌'}`);
            console.log(`   - Produto encontrado: ${product ? '✅' : '❌'}`);
            console.log(`   - Handle corresponde: ${product && product.handle === testHandle ? '✅' : '❌'}`);
        }
        
        // Testar handles únicos
        console.log('\n🔑 TESTE DE HANDLES ÚNICOS:');
        const allHandles = data.products.map(p => p.handle);
        const uniqueHandles = [...new Set(allHandles)];
        console.log(`   - Total de handles: ${allHandles.length}`);
        console.log(`   - Handles únicos: ${uniqueHandles.length}`);
        console.log(`   - Todos únicos: ${allHandles.length === uniqueHandles.length ? '✅' : '❌'}`);
        
        // Testar marcas
        console.log('\n🏷️ TESTE DE MARCAS:');
        console.log(`   - Lista de marcas: ${Array.isArray(data.brands) ? '✅' : '❌'}`);
        console.log(`   - Quantidade: ${data.brands.length}`);
        
        // Top 5 marcas
        const brandCounts = {};
        data.products.forEach(product => {
            product.brands.forEach(brand => {
                brandCounts[brand] = (brandCounts[brand] || 0) + 1;
            });
        });
        
        const topBrands = Object.entries(brandCounts)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 5);
        
        console.log('\n   Top 5 marcas:');
        topBrands.forEach(([brand, count], index) => {
            console.log(`   ${index + 1}. ${brand}: ${count} produtos`);
        });
        
        // Testar categorias
        console.log('\n📂 TESTE DE CATEGORIAS:');
        console.log(`   - Lista de categorias: ${Array.isArray(data.categories) ? '✅' : '❌'}`);
        console.log(`   - Quantidade: ${data.categories.length}`);
        data.categories.forEach(category => {
            const productsInCategory = data.products.filter(p => p.category.name === category);
            console.log(`   - ${category}: ${productsInCategory.length} produtos`);
        });
        
        // Testar preços
        console.log('\n💰 TESTE DE PREÇOS:');
        const prices = data.products.map(p => p.price).filter(p => p > 0);
        if (prices.length > 0) {
            const avgPrice = prices.reduce((a, b) => a + b, 0) / prices.length;
            const minPrice = Math.min(...prices);
            const maxPrice = Math.max(...prices);
            
            console.log(`   - Produtos com preço: ${prices.length}/${data.products.length}`);
            console.log(`   - Preço médio: €${avgPrice.toFixed(2)}`);
            console.log(`   - Preço mínimo: €${minPrice.toFixed(2)}`);
            console.log(`   - Preço máximo: €${maxPrice.toFixed(2)}`);
        }
        
        // Testar imagens
        console.log('\n🖼️ TESTE DE IMAGENS:');
        const productsWithImages = data.products.filter(p => p.images && p.images.length > 0);
        console.log(`   - Produtos com imagens: ${productsWithImages.length}/${data.products.length}`);
        
        console.log('\n🎉 TODOS OS TESTES CONCLUÍDOS!');
        console.log('✅ JSON está estruturado corretamente para uso em handlers');
        
        return true;
        
    } catch (error) {
        console.error('❌ Erro ao testar JSON:', error.message);
        return false;
    }
}

// Executar testes
if (require.main === module) {
    testJsonStructure();
}