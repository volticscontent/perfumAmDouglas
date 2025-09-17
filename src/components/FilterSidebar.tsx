'use client';

interface Category {
  id: string;
  name: string;
  count: number;
}

interface FilterSidebarProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const FilterSidebar = ({ categories, selectedCategory, onCategoryChange }: FilterSidebarProps) => {
  return (
    <div className="bg-white">
      {/* Filter Header */}
      <div className="mb-6">
        <h2 className="font-thin mb-4">Filter</h2>
        
        {/* Categories */}
        <div className="mb-6">
          <h3 className="font-thin mb-3 text-gray-900">Kategorien</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`w-full text-left px-3 py-2 rounded font-thin transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-black text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span>{category.name}</span>
                  <span className="opacity-75">({category.count})</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-6">
          <h3 className="font-thin mb-3 text-gray-900">Preis</h3>
          <div className="space-y-2">
            <button className="w-full text-left px-3 py-2 rounded font-thin text-gray-700 hover:bg-gray-100">
              Bis 25 €
            </button>
            <button className="w-full text-left px-3 py-2 rounded font-thin text-gray-700 hover:bg-gray-100">
              25 € - 50 €
            </button>
            <button className="w-full text-left px-3 py-2 rounded font-thin text-gray-700 hover:bg-gray-100">
              50 € - 100 €
            </button>
            <button className="w-full text-left px-3 py-2 rounded font-thin text-gray-700 hover:bg-gray-100">
              100 € - 150 €
            </button>
            <button className="w-full text-left px-3 py-2 rounded font-thin text-gray-700 hover:bg-gray-100">
              Über 150 €
            </button>
          </div>
        </div>

        {/* Brand */}
        <div className="mb-6">
          <h3 className="font-thin mb-3 text-gray-900">Marke</h3>
          <div className="space-y-2">
            <label className="flex items-center space-x-2 font-thin">
              <input type="checkbox" className="rounded" />
              <span>Dolce&Gabbana</span>
            </label>
            <label className="flex items-center space-x-2 font-thin">
              <input type="checkbox" className="rounded" />
              <span>Lancôme</span>
            </label>
            <label className="flex items-center space-x-2 font-thin">
              <input type="checkbox" className="rounded" />
              <span>DIOR</span>
            </label>
            <label className="flex items-center space-x-2 font-thin">
              <input type="checkbox" className="rounded" />
              <span>Yves Saint Laurent</span>
            </label>
            <label className="flex items-center space-x-2 font-thin">
              <input type="checkbox" className="rounded" />
              <span>Ariana Grande</span>
            </label>
          </div>
        </div>

        {/* Fragrance Type */}
        <div className="mb-6">
          <h3 className="font-thin mb-3 text-gray-900">Dufttyp</h3>
          <div className="space-y-2">
            <label className="flex items-center space-x-2 font-thin">
              <input type="checkbox" className="rounded" />
              <span>Eau de Parfum</span>
            </label>
            <label className="flex items-center space-x-2 font-thin">
              <input type="checkbox" className="rounded" />
              <span>Eau de Toilette</span>
            </label>
            <label className="flex items-center space-x-2 font-thin">
              <input type="checkbox" className="rounded" />
              <span>Parfum</span>
            </label>
            <label className="flex items-center space-x-2 font-thin">
              <input type="checkbox" className="rounded" />
              <span>Bodyspray</span>
            </label>
          </div>
        </div>

        {/* Fragrance Notes */}
        <div className="mb-6">
          <h3 className="font-thin mb-3 text-gray-900">Duftnoten</h3>
          <div className="space-y-2">
            <label className="flex items-center space-x-2 font-thin">
              <input type="checkbox" className="rounded" />
              <span>Blumig</span>
            </label>
            <label className="flex items-center space-x-2 font-thin">
              <input type="checkbox" className="rounded" />
              <span>Fruchtig</span>
            </label>
            <label className="flex items-center space-x-2 font-thin">
              <input type="checkbox" className="rounded" />
              <span>Holzig</span>
            </label>
            <label className="flex items-center space-x-2 font-thin">
              <input type="checkbox" className="rounded" />
              <span>Orientalisch</span>
            </label>
            <label className="flex items-center space-x-2 font-thin">
              <input type="checkbox" className="rounded" />
              <span>Frisch</span>
            </label>
          </div>
        </div>

        {/* Size */}
        <div className="mb-6">
          <h3 className="font-thin mb-3 text-gray-900">Größe</h3>
          <div className="space-y-2">
            <label className="flex items-center space-x-2 font-thin">
              <input type="checkbox" className="rounded" />
              <span>30 ml</span>
            </label>
            <label className="flex items-center space-x-2 font-thin">
              <input type="checkbox" className="rounded" />
              <span>50 ml</span>
            </label>
            <label className="flex items-center space-x-2 font-thin">
              <input type="checkbox" className="rounded" />
              <span>100 ml</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;