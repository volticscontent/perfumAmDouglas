#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para atualizar marcas corretas e criar descrições padronizadas em alemão
para produtos de perfumes com promoção 3 por 1
"""

import csv
import re
import os
from typing import Dict, List, Tuple
from collections import Counter

class BrandDescriptionUpdater:
    def __init__(self):
        # Mapeamento de marcas conhecidas baseado nos nomes dos produtos
        self.brand_mapping = {
            # Marcas principais
            'dior': 'Dior',
            'chanel': 'Chanel', 
            'paco rabanne': 'Paco Rabanne',
            'hugo boss': 'Hugo Boss',
            'boss': 'Hugo Boss',
            'yves saint laurent': 'Yves Saint Laurent',
            'ysl': 'Yves Saint Laurent',
            'versace': 'Versace',
            'giorgio armani': 'Giorgio Armani',
            'armani': 'Giorgio Armani',
            'givenchy': 'Givenchy',
            'valentino': 'Valentino',
            'gucci': 'Gucci',
            'prada': 'Prada',
            'carolina herrera': 'Carolina Herrera',
            'jean paul gaultier': 'Jean Paul Gaultier',
            'mugler': 'Mugler',
            'bulgari': 'Bulgari',
            'ferrari': 'Ferrari',
            'azzaro': 'Azzaro',
            'narciso rodriguez': 'Narciso Rodriguez',
            'lancôme': 'Lancôme',
            'lancome': 'Lancôme',
            'chloé': 'Chloé',
            'chloe': 'Chloé',
            'dolce gabbana': 'Dolce & Gabbana',
            'dolce & gabbana': 'Dolce & Gabbana',
            'marc jacobs': 'Marc Jacobs',
            'issey miyake': 'Issey Miyake',
            'creed': 'Creed',
            'tom ford': 'Tom Ford',
            'le labo': 'Le Labo',
            'byredo': 'Byredo',
            'kilian': 'Kilian',
            'frederic malle': 'Frederic Malle',
            'laboratorio olfattivo': 'Laboratorio Olfattivo',
            'parfums de marly': 'Parfums de Marly',
            'xerjoff': 'Xerjoff',
            'initio': 'Initio',
            'philipp plein': 'Philipp Plein',
            'moschino': 'Moschino',
            'armaf': 'Armaf',
            'guerlain': 'Guerlain',
            'terre d\'hermes': 'Hermès',
            'hermes': 'Hermès',
            'louis vuitton': 'Louis Vuitton'
        }
        
        # Templates de descrição em alemão
        self.description_templates = {
            'herren': {
                'short': "Entdecken Sie unser exklusives {title} - eine Premium-Auswahl der besten Herrendüfte von {brands}. Drei hochwertige Parfüms zum Preis von einem!",
                'long': "Erleben Sie Luxus pur mit unserem {title}. Diese exklusive Kollektion vereint drei der beliebtesten Herrendüfte von {brands} in einem unschlagbaren Angebot. Jeder Duft wurde sorgfältig ausgewählt, um Ihnen die perfekte Balance aus Eleganz, Männlichkeit und Raffinesse zu bieten. Profitieren Sie von unserem einzigartigen 3-für-1-Angebot und erweitern Sie Ihre Duftkollektion mit authentischen Premium-Parfüms. Schnelle Lieferung in ganz Deutschland garantiert.",
                'seo': "Kaufen Sie {title} - {brands}. Premium Herrendüfte im 3-für-1-Angebot mit schneller Lieferung in Deutschland. Authentische Parfüms zum besten Preis."
            },
            'damen': {
                'short': "Entdecken Sie unser bezauberndes {title} - eine exquisite Auswahl der schönsten Damendüfte von {brands}. Drei luxuriöse Parfüms zum Preis von einem!",
                'long': "Verwöhnen Sie sich mit unserem {title}. Diese elegante Kollektion vereint drei der begehrtesten Damendüfte von {brands} in einem außergewöhnlichen Angebot. Jeder Duft verkörpert Weiblichkeit, Eleganz und zeitlose Schönheit. Nutzen Sie unser exklusives 3-für-1-Angebot und bereichern Sie Ihre Parfümsammlung mit authentischen Luxusdüften. Schnelle und sichere Lieferung in ganz Deutschland.",
                'seo': "Kaufen Sie {title} - {brands}. Premium Damendüfte im 3-für-1-Angebot mit schneller Lieferung in Deutschland. Authentische Parfüms zum besten Preis."
            },
            'unisex': {
                'short': "Entdecken Sie unser vielseitiges {title} - eine Premium-Auswahl der besten Düfte von {brands}. Drei hochwertige Parfüms zum Preis von einem!",
                'long': "Erleben Sie Vielfalt mit unserem {title}. Diese exklusive Kollektion vereint drei der beliebtesten Düfte von {brands} in einem unwiderstehlichen Angebot. Perfekt für alle, die Qualität und Abwechslung schätzen. Profitieren Sie von unserem einzigartigen 3-für-1-Angebot und entdecken Sie neue Duftrichtungen mit authentischen Premium-Parfüms. Schnelle Lieferung in ganz Deutschland garantiert.",
                'seo': "Kaufen Sie {title} - {brands}. Premium Düfte im 3-für-1-Angebot mit schneller Lieferung in Deutschland. Authentische Parfüms zum besten Preis."
            }
        }

    def extract_brands_from_title(self, title: str) -> List[str]:
        """Extrai marcas do título do produto"""
        brands = []
        title_lower = title.lower()
        
        # Buscar por marcas conhecidas no título
        for brand_key, brand_name in self.brand_mapping.items():
            if brand_key in title_lower:
                if brand_name not in brands:
                    brands.append(brand_name)
        
        # Casos especiais para marcas compostas
        special_cases = [
            ('1 million', 'Paco Rabanne'),
            ('invictus', 'Paco Rabanne'),
            ('sauvage', 'Dior'),
            ('bleu de chanel', 'Chanel'),
            ('coco mademoiselle', 'Chanel'),
            ('no. 5', 'Chanel'),
            ('nº5', 'Chanel'),
            ('la vie est belle', 'Lancôme'),
            ('jadore', 'Dior'),
            ('j\'adore', 'Dior'),
            ('scandal', 'Jean Paul Gaultier'),
            ('olympea', 'Paco Rabanne'),
            ('phantom', 'Paco Rabanne'),
            ('ultra male', 'Jean Paul Gaultier'),
            ('dylan blue', 'Versace'),
            ('dylan turquoise', 'Versace'),
            ('eros', 'Versace'),
            ('acqua di gio', 'Giorgio Armani'),
            ('acqua d\'gio', 'Giorgio Armani'),
            ('sì', 'Giorgio Armani'),
            ('si giorgio', 'Giorgio Armani'),
            ('hypnotic poison', 'Dior'),
            ('miss dior', 'Dior'),
            ('good girl', 'Carolina Herrera'),
            ('bad boy', 'Carolina Herrera'),
            ('212', 'Carolina Herrera'),
            ('libre', 'Yves Saint Laurent'),
            ('black opium', 'Yves Saint Laurent'),
            ('mon paris', 'Yves Saint Laurent'),
            ('y by ysl', 'Yves Saint Laurent'),
            ('gentleman', 'Givenchy'),
            ('l\'interdit', 'Givenchy'),
            ('linterdit', 'Givenchy'),
            ('amarige', 'Givenchy'),
            ('flora', 'Gucci'),
            ('guilty', 'Gucci'),
            ('candy', 'Prada'),
            ('luna rossa', 'Prada'),
            ('angel', 'Mugler'),
            ('alien', 'Mugler'),
            ('born in roma', 'Valentino'),
            ('uomo', 'Valentino'),
            ('donna', 'Valentino'),
            ('bottled', 'Hugo Boss'),
            ('the scent', 'Hugo Boss'),
            ('in black', 'Bulgari'),
            ('black', 'Bulgari'),
            ('silver scent', 'Azzaro'),
            ('azzaro', 'Azzaro'),
            ('for her', 'Narciso Rodriguez'),
            ('la nuit', 'Lancôme'),
            ('trésor', 'Lancôme'),
            ('tresor', 'Lancôme'),
            ('signature', 'Chloé'),
            ('daisy', 'Marc Jacobs'),
            ('perfect', 'Marc Jacobs'),
            ('the only one', 'Dolce & Gabbana'),
            ('light blue', 'Dolce & Gabbana'),
            ('nuit d\'issey', 'Issey Miyake'),
            ('pure xs', 'Paco Rabanne'),
            ('fame', 'Paco Rabanne')
        ]
        
        for fragrance, brand in special_cases:
            if fragrance in title_lower and brand not in brands:
                brands.append(brand)
        
        return brands

    def determine_category_type(self, category: str, tags: str) -> str:
        """Determina se é produto masculino, feminino ou unissex"""
        category_lower = category.lower()
        tags_lower = tags.lower()
        
        if 'herren' in category_lower or 'men' in category_lower:
            return 'herren'
        elif 'damen' in category_lower or 'women' in category_lower or 'woherren' in category_lower:
            return 'damen'
        elif 'herren' in tags_lower and 'damen' not in tags_lower:
            return 'herren'
        elif 'damen' in tags_lower and 'herren' not in tags_lower:
            return 'damen'
        else:
            return 'unisex'

    def format_brands_list(self, brands: List[str]) -> str:
        """Formata lista de marcas para texto em alemão"""
        if len(brands) == 0:
            return "Premium-Marken"
        elif len(brands) == 1:
            return brands[0]
        elif len(brands) == 2:
            return f"{brands[0]} und {brands[1]}"
        else:
            return f"{', '.join(brands[:-1])} und {brands[-1]}"

    def generate_descriptions(self, title: str, brands: List[str], category_type: str) -> Dict[str, str]:
        """Gera descrições padronizadas em alemão"""
        brands_text = self.format_brands_list(brands)
        template = self.description_templates[category_type]
        
        return {
            'short_description': template['short'].format(
                title=title,
                brands=brands_text
            ),
            'long_description': template['long'].format(
                title=title,
                brands=brands_text
            ),
            'seo_description': template['seo'].format(
                title=title,
                brands=brands_text
            )
        }

    def update_tags_with_brands(self, current_tags: str, brands: List[str]) -> str:
        """Atualiza tags incluindo marcas identificadas"""
        tags_list = current_tags.split('|') if current_tags else []
        
        # Remover tags de marcas antigas
        tags_list = [tag for tag in tags_list if not any(
            brand.lower().replace(' ', '-') in tag for brand in self.brand_mapping.values()
        )]
        
        # Adicionar novas tags de marcas
        for brand in brands:
            brand_tag = brand.lower().replace(' ', '-').replace('&', '').replace('  ', '-')
            if brand_tag not in tags_list:
                tags_list.append(brand_tag)
        
        return '|'.join(tags_list)

    def process_csv(self, input_file: str, output_file: str = None) -> None:
        """Processa o arquivo CSV atualizando marcas e descrições"""
        if output_file is None:
            output_file = input_file
            
        print(f"📊 Carregando arquivo: {input_file}")
        
        # Ler arquivo CSV
        rows = []
        headers = []
        
        with open(input_file, 'r', encoding='utf-8') as file:
            reader = csv.DictReader(file)
            headers = reader.fieldnames
            rows = list(reader)
        
        print(f"📦 Processando {len(rows)} produtos...")
        
        # Contadores para relatório
        updated_brands = 0
        updated_descriptions = 0
        all_brands = []
        
        for index, row in enumerate(rows):
            title = row.get('title', '')
            current_brands = row.get('brands', '')
            current_primary = row.get('primary_brand', '')
            category = row.get('category', '')
            tags = row.get('tags', '')
            
            print(f"\n🔍 Processando produto {index + 1}: {title[:50]}...")
            
            # Extrair marcas do título
            extracted_brands = self.extract_brands_from_title(title)
            
            if extracted_brands:
                # Atualizar marcas
                new_brands = '|'.join(extracted_brands)
                new_primary = extracted_brands[0]
                
                if current_brands != new_brands or current_primary != new_primary:
                    row['brands'] = new_brands
                    row['primary_brand'] = new_primary
                    updated_brands += 1
                    print(f"   ✅ Marcas atualizadas: {new_brands}")
                
                # Adicionar marcas para estatísticas
                all_brands.extend(extracted_brands)
                
                # Determinar tipo de categoria
                category_type = self.determine_category_type(category, tags)
                
                # Gerar descrições
                descriptions = self.generate_descriptions(title, extracted_brands, category_type)
                
                # Atualizar descrições
                row['seo_description'] = descriptions['seo_description']
                updated_descriptions += 1
                
                # Atualizar tags com marcas
                new_tags = self.update_tags_with_brands(tags, extracted_brands)
                row['tags'] = new_tags
                row['seo_keywords'] = new_tags
                
                print(f"   📝 Descrição atualizada para {category_type}")
                print(f"   🏷️  Marcas: {new_brands}")
                
            else:
                print(f"   ⚠️  Nenhuma marca identificada para: {title}")
        
        # Salvar arquivo atualizado
        print(f"\n💾 Salvando arquivo atualizado: {output_file}")
        
        with open(output_file, 'w', encoding='utf-8', newline='') as file:
            writer = csv.DictWriter(file, fieldnames=headers)
            writer.writeheader()
            writer.writerows(rows)
        
        # Relatório final
        print(f"\n📊 RELATÓRIO FINAL:")
        print(f"   📦 Total de produtos processados: {len(rows)}")
        print(f"   🏷️  Produtos com marcas atualizadas: {updated_brands}")
        print(f"   📝 Produtos com descrições atualizadas: {updated_descriptions}")
        print(f"   ✅ Arquivo salvo com sucesso!")
        
        # Mostrar estatísticas de marcas
        self.show_brand_statistics(all_brands, rows)

    def show_brand_statistics(self, all_brands: List[str], rows: List[Dict]) -> None:
        """Mostra estatísticas das marcas identificadas"""
        print(f"\n📈 ESTATÍSTICAS DE MARCAS:")
        
        brand_counts = Counter(all_brands)
        
        print(f"   🏆 Top 10 marcas mais frequentes:")
        for brand, count in brand_counts.most_common(10):
            print(f"      {brand}: {count} produtos")
        
        multi_brand_count = sum(1 for row in rows if row.get('brands') == 'Multi-Brand')
        if multi_brand_count > 0:
            print(f"\n   ⚠️  Produtos ainda com 'Multi-Brand': {multi_brand_count}")

def main():
    """Função principal"""
    print("🇩🇪 ATUALIZADOR DE MARCAS E DESCRIÇÕES - PERFUMES ALEMANHA")
    print("=" * 60)
    
    # Caminhos dos arquivos
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_dir = os.path.dirname(script_dir)
    input_file = os.path.join(project_dir, 'unified_products.csv')
    
    # Verificar se arquivo existe
    if not os.path.exists(input_file):
        print(f"❌ Arquivo não encontrado: {input_file}")
        return
    
    # Criar instância do atualizador
    updater = BrandDescriptionUpdater()
    
    # Processar arquivo
    try:
        updater.process_csv(input_file)
        print(f"\n🎉 PROCESSAMENTO CONCLUÍDO COM SUCESSO!")
        print(f"📁 Arquivo atualizado: {input_file}")
        
    except Exception as e:
        print(f"\n❌ ERRO durante o processamento: {str(e)}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()