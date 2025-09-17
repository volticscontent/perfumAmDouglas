import Header from '../components/Header';
import CategoryCarousel from '../components/CategoryCarousel';
import PerfumeInfo from '../components/PerfumeInfo';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

       <div className=''>
          <Image
            src="/bannersHeader/Banner_1.jpg"
            alt="Promotional banner for perfumes and fragrances"
            width={1200}
            height={400}
            className="w-full h-auto object-contain"
          />
        </div>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-6">

        {/* Product Overview Headline */}
        <div className="product-overview__headline-container mb-6 pl-4 ">
          <div className="product-overview__headline-wrapper flex items-center gap-1 text-[1.2rem]">
            <div className="sr-only" role="heading" aria-level={1}>
              Parfüm & Düfte 5760
              <div className="sr-only-translation">ergebnisse</div>
            </div>
            <h1 
              aria-hidden="true" 
              data-testid="product-overview-headline" 
              className="font-medium text-black uppercase"
            >
              Parfüm & Düfte
            </h1>
            <span aria-hidden="true" className="font-thin text-gray-600">
              (5.760)
            </span>
          </div>
        </div>

        {/* Category Carousel */}
        <CategoryCarousel className="mb-8 pl-4 " />
        
        {/* TODO: Aqui serão adicionados os cards de produtos */}
        <div className="mt-12 mb-8">
          <p className="text-center text-gray-500 py-16">
            [Seção de produtos será implementada aqui]
          </p>
        </div>
      </main>

      {/* Seções de conteúdo */}
      <PerfumeInfo />
      <Newsletter />
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
