export interface Perfume {
  id: string;
  name: string;
  brand: string;
  type: 'Eau de Parfum' | 'Eau de Toilette' | 'Parfum' | 'Bodyspray';
  gender: 'Weiblich' | 'Männlich' | 'Unisex';
  size: string;
  originalPrice: number;
  currentPrice: number;
  discount?: number;
  image: string;
  description: string;
  notes: string[];
  inStock: boolean;
  isGift?: boolean;
  isNew?: boolean;
  slug: string;
}

export const perfumes: Perfume[] = [
  {
    id: '1',
    name: 'The One',
    brand: 'Dolce&Gabbana',
    type: 'Eau de Parfum',
    gender: 'Weiblich',
    size: '50 ml',
    originalPrice: 118.00,
    currentPrice: 69.99,
    discount: 41,
    image: '/images/dolce-gabbana-the-one.jpg',
    description: 'Ein sinnlicher und eleganter Duft für die moderne Frau.',
    notes: ['Bergamotte', 'Litschi', 'Pfirsich', 'Jasmin', 'Maiglöckchen', 'Vanille', 'Amber'],
    inStock: true,
    isGift: true,
    slug: 'dolce-gabbana-the-one'
  },
  {
    id: '2',
    name: 'Light Blue',
    brand: 'Dolce&Gabbana',
    type: 'Eau de Toilette',
    gender: 'Weiblich',
    size: '50 ml',
    originalPrice: 108.00,
    currentPrice: 66.99,
    discount: 38,
    image: '/images/dolce-gabbana-light-blue.jpg',
    description: 'Frisch und mediterran - der Duft des italienischen Sommers.',
    notes: ['Zitrone', 'Apfel', 'Zedernholz', 'Jasmin', 'Bambus', 'Weißer Moschus'],
    inStock: true,
    isGift: true,
    slug: 'dolce-gabbana-light-blue'
  },
  {
    id: '3',
    name: 'R.E.M. Cherry Eclipse',
    brand: 'Ariana Grande',
    type: 'Eau de Parfum',
    gender: 'Unisex',
    size: '100 ml',
    originalPrice: 72.00,
    currentPrice: 72.00,
    image: '/images/ariana-grande-rem.jpg',
    description: 'Ein träumerischer und süßer Duft mit fruchtigen Noten.',
    notes: ['Kirsche', 'Mandel', 'Vanille', 'Karamell', 'Sandelholz'],
    inStock: true,
    isNew: true,
    slug: 'ariana-grande-rem-cherry-eclipse'
  },
  {
    id: '4',
    name: 'La vie est belle',
    brand: 'Lancôme',
    type: 'Eau de Parfum',
    gender: 'Weiblich',
    size: '30 ml',
    originalPrice: 72.00,
    currentPrice: 39.17,
    discount: 46,
    image: '/images/lancome-la-vie-est-belle.jpg',
    description: 'Das Leben ist schön - ein Duft voller Freude und Glück.',
    notes: ['Schwarze Johannisbeere', 'Birne', 'Iris', 'Jasmin', 'Vanille', 'Praline'],
    inStock: true,
    slug: 'lancome-la-vie-est-belle'
  },
  {
    id: '5',
    name: 'Libre Vanille Couture',
    brand: 'Yves Saint Laurent',
    type: 'Eau de Parfum',
    gender: 'Weiblich',
    size: '50 ml',
    originalPrice: 143.00,
    currentPrice: 143.00,
    image: '/images/ysl-libre-vanille.jpg',
    description: 'Freiheit und Eleganz in einem luxuriösen Vanille-Duft.',
    notes: ['Bergamotte', 'Lavendel', 'Vanille', 'Tonkabohne', 'Ambergris'],
    inStock: true,
    isNew: true,
    slug: 'ysl-libre-vanille-couture'
  },
  {
    id: '6',
    name: 'Miss Dior Essence',
    brand: 'DIOR',
    type: 'Eau de Parfum',
    gender: 'Weiblich',
    size: '35 ml',
    originalPrice: 109.00,
    currentPrice: 109.00,
    image: '/images/dior-miss-dior.jpg',
    description: 'Zeitlose Eleganz und feminine Raffinesse.',
    notes: ['Rose', 'Pfingstrose', 'Iris', 'Weißer Moschus', 'Patchouli'],
    inStock: true,
    isGift: true,
    slug: 'dior-miss-dior-essence'
  }
];

export const categories = [
  { id: 'all', name: 'Alles in Parfum', count: perfumes.length },
  { id: 'weiblich', name: 'Damendüfte', count: perfumes.filter(p => p.gender === 'Weiblich').length },
  { id: 'männlich', name: 'Herrendüfte', count: perfumes.filter(p => p.gender === 'Männlich').length },
  { id: 'unisex', name: 'Unisex-Düfte', count: perfumes.filter(p => p.gender === 'Unisex').length },
  { id: 'nische', name: 'Nischendüfte', count: 0 },
  { id: 'minis', name: 'Minis', count: 0 },
  { id: 'refills', name: 'Refills', count: 0 }
];