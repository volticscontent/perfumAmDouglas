#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para regenerar os arquivos de saída com marcas e descrições corretas
"""

import csv
import json
import os
from typing import Dict, List

def load_updated_csv(file_path: str) -> List[Dict]:
    """Carrega o CSV atualizado"""
    products = []
    with open(file_path, 'r', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        products = list(reader)
    return products

def generate_shopify_json(products: List[Dict], output_file: str) -> None:
    """Gera arquivo JSON para Shopify"""
    shopify_products = []
    
    for product in products:
        # Criar variante única
        variant = {
            "sku": f"COMBO-{product['id']}",
            "title": "Standard",
            "price": float(product['price_regular']),
            "inventory": 50,
            "weight": "0.5kg",
            "requires_shipping": True
        }
        
        # Criar produto Shopify
        shopify_product = {
            "title": product['title'],
            "handle": product['handle'],
            "description": f"<p>{product['seo_description']}</p>",
            "price": float(product['price_regular']),
            "currency": product['price_currency'],
            "variants": [variant],
            "images": [product['images']] if product['images'] else [],
            "tags": product['tags'].split('|') if product['tags'] else [],
            "metafields": {
                "internal.id": product['id'],
                "internal.brands": product['brands'],
                "internal.primary_brand": product['primary_brand'],
                "internal.category": product['category'],
                "internal.country": product['country_target'],
                "internal.language": product['language'],
                "seo.meta_title": product['seo_title'],
                "seo.meta_description": product['seo_description'],
                "seo.keywords": product['seo_keywords']
            }
        }
        
        shopify_products.append(shopify_product)
    
    # Salvar arquivo JSON
    with open(output_file, 'w', encoding='utf-8') as file:
        json.dump(shopify_products, file, indent=2, ensure_ascii=False)
    
    print(f"✅ Arquivo Shopify JSON gerado: {output_file}")

def generate_processing_report(products: List[Dict], output_file: str) -> None:
    """Gera relatório de processamento atualizado"""
    from collections import Counter
    
    # Estatísticas básicas
    total_products = len(products)
    
    # Contar marcas
    all_brands = []
    for product in products:
        if product['brands']:
            all_brands.extend(product['brands'].split('|'))
    
    brand_counts = Counter(all_brands)
    
    # Contar categorias
    categories = [product['category'] for product in products if product['category']]
    category_counts = Counter(categories)
    
    # Preços
    prices = [float(product['price_regular']) for product in products if product['price_regular']]
    
    report = {
        "processing_summary": {
            "total_products": total_products,
            "timestamp": "2024-01-15T10:00:00Z",
            "status": "completed_with_brand_updates"
        },
        "brand_statistics": {
            "total_brands": len(brand_counts),
            "brand_distribution": dict(brand_counts.most_common(15))
        },
        "category_statistics": {
            "total_categories": len(category_counts),
            "category_distribution": dict(category_counts)
        },
        "price_statistics": {
            "min_price": min(prices) if prices else 0,
            "max_price": max(prices) if prices else 0,
            "avg_price": round(sum(prices) / len(prices), 2) if prices else 0,
            "currency": "EUR"
        },
        "quality_metrics": {
            "products_with_brands": sum(1 for p in products if p['brands'] and p['brands'] != 'Multi-Brand'),
            "products_with_descriptions": sum(1 for p in products if p['seo_description']),
            "products_with_images": sum(1 for p in products if p['images']),
            "multi_brand_remaining": sum(1 for p in products if p['brands'] == 'Multi-Brand')
        }
    }
    
    # Salvar relatório
    with open(output_file, 'w', encoding='utf-8') as file:
        json.dump(report, file, indent=2, ensure_ascii=False)
    
    print(f"✅ Relatório de processamento gerado: {output_file}")
    
    # Mostrar resumo
    print(f"\n📊 RESUMO DO RELATÓRIO:")
    print(f"   📦 Total de produtos: {total_products}")
    print(f"   🏷️  Total de marcas: {len(brand_counts)}")
    print(f"   📝 Produtos com descrições: {report['quality_metrics']['products_with_descriptions']}")
    print(f"   🖼️  Produtos com imagens: {report['quality_metrics']['products_with_images']}")
    print(f"   ⚠️  Multi-Brand restantes: {report['quality_metrics']['multi_brand_remaining']}")

def main():
    """Função principal"""
    print("🔄 REGENERANDO ARQUIVOS DE SAÍDA COM DADOS ATUALIZADOS")
    print("=" * 55)
    
    # Caminhos dos arquivos
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_dir = os.path.dirname(script_dir)
    
    input_file = os.path.join(project_dir, 'unified_products.csv')
    shopify_output = os.path.join(project_dir, 'products-shopify-germany-updated.json')
    report_output = os.path.join(project_dir, 'processing-report-updated.json')
    
    # Verificar se arquivo existe
    if not os.path.exists(input_file):
        print(f"❌ Arquivo não encontrado: {input_file}")
        return
    
    try:
        # Carregar produtos atualizados
        print(f"📊 Carregando produtos atualizados...")
        products = load_updated_csv(input_file)
        print(f"   ✅ {len(products)} produtos carregados")
        
        # Gerar arquivo Shopify JSON
        print(f"\n🛍️  Gerando arquivo Shopify JSON...")
        generate_shopify_json(products, shopify_output)
        
        # Gerar relatório atualizado
        print(f"\n📈 Gerando relatório de processamento...")
        generate_processing_report(products, report_output)
        
        print(f"\n🎉 REGENERAÇÃO CONCLUÍDA COM SUCESSO!")
        print(f"📁 Arquivos gerados:")
        print(f"   - {shopify_output}")
        print(f"   - {report_output}")
        
    except Exception as e:
        print(f"\n❌ ERRO durante a regeneração: {str(e)}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()