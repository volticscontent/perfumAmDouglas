#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para converter unified_products.csv em JSON estruturado
para handlers de página de produto Next.js
"""

import csv
import json
import os
from datetime import datetime

def slugify(text):
    """Converte texto em slug válido"""
    if not text:
        return ""
    
    # Normalizar e limpar
    text = str(text).lower()
    text = text.replace(' ', '-')
    text = text.replace('_', '-')
    
    # Remover caracteres especiais
    allowed_chars = 'abcdefghijklmnopqrstuvwxyz0123456789-'
    text = ''.join(c for c in text if c in allowed_chars)
    
    # Remover hífens duplos
    while '--' in text:
        text = text.replace('--', '-')
    
    # Remover hífens no início e fim
    text = text.strip('-')
    
    return text

def parse_tags(tags_str):
    """Converte string de tags em lista"""
    if not tags_str:
        return []
    
    # Remove colchetes se existirem
    tags_str = tags_str.strip('[]')
    
    # Separa por vírgula e limpa
    tags = [tag.strip().strip("'\"") for tag in tags_str.split(',')]
    
    return [tag for tag in tags if tag]

def parse_brands(brands_str):
    """Converte string de marcas em lista"""
    if not brands_str:
        return []
    
    # Separa por | ou vírgula
    if '|' in brands_str:
        brands = brands_str.split('|')
    else:
        brands = brands_str.split(',')
    
    return [brand.strip() for brand in brands if brand.strip()]

def determine_category_info(category, tags):
    """Determina informações da categoria"""
    category_map = {
        'Duft-Sets': {
            'type': 'set',
            'gender': 'unisex',
            'description': 'Duft-Set'
        },
        'Herren Dufts': {
            'type': 'fragrance',
            'gender': 'men',
            'description': 'Herrenduft'
        },
        'WoHerren Dufts': {
            'type': 'fragrance', 
            'gender': 'women',
            'description': 'Damenduft'
        }
    }
    
    return category_map.get(category, {
        'type': 'fragrance',
        'gender': 'unisex',
        'description': 'Duft'
    })

def convert_csv_to_product_json():
    """Converte CSV para JSON estruturado para handlers de produto"""
    
    # Caminhos dos arquivos
    csv_path = os.path.join('..', 'unified_products.csv')
    json_path = os.path.join('..', 'src', 'data', 'products.json')
    
    # Criar diretório se não existir
    os.makedirs(os.path.dirname(json_path), exist_ok=True)
    
    products = []
    handles_map = {}  # Para busca rápida por handle
    brands_map = {}   # Para busca por marca
    categories_map = {} # Para busca por categoria
    
    print("🔄 Convertendo CSV para JSON estruturado...")
    
    try:
        with open(csv_path, 'r', encoding='utf-8') as file:
            reader = csv.DictReader(file)
            
            for row in reader:
                # Dados básicos
                product_id = row.get('id', '')
                title = row.get('title', '')
                handle = slugify(row.get('handle', title))
                
                # Garantir handle único
                original_handle = handle
                counter = 1
                while handle in handles_map:
                    handle = f"{original_handle}-{counter}"
                    counter += 1
                
                # Preço
                try:
                    price = float(row.get('price', 0))
                except:
                    price = 0.0
                
                # Marcas
                brands = parse_brands(row.get('brands', ''))
                primary_brand = row.get('primary_brand', brands[0] if brands else '')
                
                # Tags e categoria
                tags = parse_tags(row.get('tags', ''))
                category = row.get('category', 'Duft-Sets')
                category_info = determine_category_info(category, tags)
                
                # Imagens
                image_url = row.get('image_url', '')
                if image_url and not image_url.startswith('http'):
                    # Assumir que é caminho local
                    image_url = f"/products/{image_url.split('/')[-1]}"
                
                # Estrutura do produto
                product = {
                    "id": product_id,
                    "handle": handle,
                    "title": title,
                    "description": row.get('seo_description', ''),
                    "price": price,
                    "currency": "EUR",
                    "brands": brands,
                    "primary_brand": primary_brand,
                    "category": {
                        "name": category,
                        "type": category_info['type'],
                        "gender": category_info['gender'],
                        "description": category_info['description']
                    },
                    "tags": tags,
                    "images": [image_url] if image_url else [],
                    "seo": {
                        "title": row.get('seo_title', title),
                        "description": row.get('seo_description', ''),
                        "keywords": row.get('seo_keywords', '').split('|') if row.get('seo_keywords') else tags
                    },
                    "variants": [
                        {
                            "id": f"{product_id}-default",
                            "title": "Standard",
                            "price": price,
                            "available": True,
                            "inventory": 50,
                            "weight": "0.5kg"
                        }
                    ],
                    "availability": {
                        "in_stock": True,
                        "shipping_time": "1-3 Werktage",
                        "shipping_countries": ["DE", "AT", "CH"]
                    },
                    "promotion": {
                        "type": "bundle",
                        "description": "3 für 1 Angebot",
                        "discount_percentage": 67,
                        "valid_until": "2024-12-31"
                    }
                }
                
                products.append(product)
                
                # Mapear para busca rápida
                handles_map[handle] = len(products) - 1
                
                # Mapear marcas
                for brand in brands:
                    if brand not in brands_map:
                        brands_map[brand] = []
                    brands_map[brand].append(handle)
                
                # Mapear categorias
                if category not in categories_map:
                    categories_map[category] = []
                categories_map[category].append(handle)
        
        # Estrutura final do JSON
        final_json = {
            "metadata": {
                "generated_at": datetime.now().isoformat(),
                "total_products": len(products),
                "total_brands": len(brands_map),
                "total_categories": len(categories_map),
                "currency": "EUR",
                "country": "DE",
                "language": "de"
            },
            "products": products,
            "indexes": {
                "by_handle": handles_map,
                "by_brand": brands_map,
                "by_category": categories_map
            },
            "categories": list(categories_map.keys()),
            "brands": list(brands_map.keys())
        }
        
        # Salvar JSON
        with open(json_path, 'w', encoding='utf-8') as file:
            json.dump(final_json, file, ensure_ascii=False, indent=2)
        
        print(f"✅ JSON gerado com sucesso: {json_path}")
        print(f"📊 Estatísticas:")
        print(f"   - Produtos: {len(products)}")
        print(f"   - Marcas: {len(brands_map)}")
        print(f"   - Categorias: {len(categories_map)}")
        print(f"   - Handles únicos: {len(handles_map)}")
        
        # Mostrar algumas marcas principais
        print(f"\n🏷️ Top 5 Marcas:")
        sorted_brands = sorted(brands_map.items(), key=lambda x: len(x[1]), reverse=True)
        for brand, handles in sorted_brands[:5]:
            print(f"   - {brand}: {len(handles)} produtos")
        
        return json_path
        
    except Exception as e:
        print(f"❌ Erro ao converter CSV: {e}")
        return None

if __name__ == "__main__":
    print("=" * 60)
    print("🛍️  CONVERSOR CSV → JSON PARA HANDLERS DE PRODUTO")
    print("=" * 60)
    
    result = convert_csv_to_product_json()
    
    if result:
        print(f"\n🎉 Conversão concluída com sucesso!")
        print(f"📁 Arquivo gerado: {result}")
    else:
        print(f"\n❌ Falha na conversão!")