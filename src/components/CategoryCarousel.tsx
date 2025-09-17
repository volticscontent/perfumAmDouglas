'use client';

import { useState } from 'react';

interface CategoryCarouselProps {
  className?: string;
}

const CategoryCarousel: React.FC<CategoryCarouselProps> = ({ className = '' }) => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const categories = [
    { id: 'kategorien', label: 'Kategorien', testId: 'menu-button-categories' },
    { id: 'preis', label: 'Preis', testId: 'menu-button-priceValue' },
    { id: 'produktart', label: 'Produktart', testId: 'menu-button-classificationClassName' },
    { id: 'marke', label: 'Marke', testId: 'menu-button-brand' },
    { id: 'fuer-wen', label: 'Für Wen', testId: 'menu-button-gender' },
    { id: 'duftnote', label: 'Duftnote', testId: 'menu-button-fragranceNew' },
    { id: 'verantwortung', label: 'Verantwortung', testId: 'menu-button-responsibility' },
    { id: 'zusatzstoffe', label: 'Zusatzstoffe', testId: 'menu-button-additives' },
    { id: 'aktionen', label: 'Aktionen', testId: 'menu-button-flags' },
    { id: 'geschenk', label: 'Geschenk für', testId: 'menu-button-giftFor' }
  ];

  const handleFilterClick = (categoryId: string) => {
    setActiveFilter(activeFilter === categoryId ? null : categoryId);
  };

  return (
    <div className={`facets-mobile facets-mobile--pop ${className}`}>
      <div className="quick-filter-menu">
        {/* Single Filter Bar with SVG and Categories */}
        <div className="flex items-center gap-2 bg-white">
          {/* Filter SVG Icon */}
          <svg 
            width="35" 
            height="35" 
            viewBox="0 0 25 25" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg" 
            aria-hidden="true" 
            role="img" 
            className="text-black flex-shrink-0 border border-black p-[5px]"
          >
            <path 
              d="M18.95 7H21.5C21.7761 7 22 6.77614 22 6.5C22 6.22386 21.7761 6 21.5 6H18.95C18.7184 4.85888 17.7095 4 16.5 4C15.2905 4 14.2816 4.85888 14.05 6H2.5C2.22386 6 2 6.22386 2 6.5C2 6.77614 2.22386 7 2.5 7H14.05C14.2816 8.14112 15.2905 9 16.5 9C17.7095 9 18.7184 8.14112 18.95 7ZM16.5 8C15.6716 8 15 7.32843 15 6.5C15 5.67157 15.6716 5 16.5 5C17.3284 5 18 5.67157 18 6.5C18 7.32843 17.3284 8 16.5 8Z" 
              fill="currentColor" 
              fillRule="evenodd" 
              clipRule="evenodd"
            />
            <path 
              d="M9.94999 12H21.5C21.7761 12 22 11.7761 22 11.5C22 11.2239 21.7761 11 21.5 11H9.94999C9.71836 9.85888 8.70948 9 7.5 9C6.29052 9 5.28164 9.85888 5.05001 11H2.5C2.22386 11 2 11.2239 2 11.5C2 11.7761 2.22386 12 2.5 12H5.05001C5.28164 13.1411 6.29052 14 7.5 14C8.70948 14 9.71836 13.1411 9.94999 12ZM7.5 13C6.67157 13 6 12.3284 6 11.5C6 10.6716 6.67157 10 7.5 10C8.32843 10 9 10.6716 9 11.5C9 12.3284 8.32843 13 7.5 13Z" 
              fill="currentColor" 
              fillRule="evenodd" 
              clipRule="evenodd"
            />
            <path 
              d="M21.5 17H16.95C16.7184 18.1411 15.7095 19 14.5 19C13.2905 19 12.2816 18.1411 12.05 17H2.5C2.22386 17 2 16.2239 2 16.5C2 16.2239 2.22386 16 2.5 16H12.05C12.2816 14.8589 13.2905 14 14.5 14C15.7095 14 16.7184 14.8589 16.95 16H21.5C21.7761 16 22 16.2239 22 16.5C22 16.7761 21.7761 17 21.5 17ZM13 16.5C13 17.3284 13.6716 18 14.5 18C15.3284 18 16 17.3284 16 16.5C16 15.6716 15.3284 15 14.5 15C13.6716 15 13 15.6716 13 16.5Z" 
              fill="currentColor" 
              fillRule="evenodd" 
              clipRule="evenodd"
            />
          </svg>
          
          {/* Category Carousel inside the bar */}
          <div className="flex gap-1 overflow-x-auto scrollbar-hide flex-1">
            {categories.map((category) => (
              <button  
                 key={category.id}
                 type="button"  
                 className={`px-4 py-3 border border-black font-thin text-xs whitespace-nowrap lowercase transition-colors duration-200 ${
                   activeFilter === category.id  
                     ? 'bg-black text-white'  
                     : 'text-[#242424]' 
                 }`}
                data-testid={category.testId}
                onClick={() => handleFilterClick(category.id)}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCarousel;