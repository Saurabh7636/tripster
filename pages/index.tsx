import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';
import SearchForm from '@/components/search/SearchForm';
import { mockProperties, popularDestinations } from '@/lib/mockData';
import { getRatingColor, getRatingLabel } from '@/lib/utils';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function HomePage() {
  const featuredHotels = mockProperties.slice(0, 5);

  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-[600px] mb-8">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920"
            alt="Hotel room"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 pointer-events-none">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Book your stay with Tripster
          </h1>
          <p className="text-xl text-white mb-8">
            1,480,086 rooms around the world are waiting for you!
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/2 z-20">
          <div className="max-w-7xl mx-auto px-4">
            <SearchForm variant="hero" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-32">
        {/* Popular Destinations */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Popular destinations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {popularDestinations.map((dest, idx) => (
              <Link
                key={idx}
                href={`/search?location=${dest.city}`}
                className={`relative rounded-xl overflow-hidden shadow-md hover:shadow-lg transition ${
                  idx === 0 || idx === 3 ? 'md:col-span-2 md:row-span-2' : ''
                }`}
              >
                <div className={`relative ${idx === 0 || idx === 3 ? 'h-96' : 'h-48'}`}>
                  <Image
                    src={dest.image}
                    alt={dest.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-4 left-4 bg-white rounded-full px-4 py-2">
                    <span className="font-semibold text-gray-900">{dest.name}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Hotels Loved by Guests */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Hotels loved by guests</h2>
          <div className="relative">
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={24}
              slidesPerView={1}
              slidesPerGroup={1}
              navigation={{
                nextEl: '.swiper-button-next-hotels',
                prevEl: '.swiper-button-prev-hotels',
              }}
              pagination={{
                clickable: true,
                el: '.swiper-pagination-hotels',
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  slidesPerGroup: 2,
                },
                1024: {
                  slidesPerView: 3,
                  slidesPerGroup: 3,
                },
                1280: {
                  slidesPerView: 4,
                  slidesPerGroup: 4,
                },
              }}
              className="hotels-swiper"
            >
              {featuredHotels.map((hotel) => (
                <SwiperSlide key={hotel.id}>
                  <Link
                    href={`/property/${hotel.id}`}
                    className="block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
                  >
                    <div className="relative h-48">
                      <Image
                        src={hotel.image}
                        alt={hotel.name}
                        fill
                        className="object-cover"
                      />
                      <div className={`absolute top-3 left-3 ${getRatingColor(hotel.rating)} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
                        {hotel.rating}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg text-gray-900 mb-1">{hotel.name}</h3>
                      <p className="text-gray-600 text-sm mb-2">{hotel.city}</p>
                      <p className="text-gray-900 font-semibold">from ${hotel.pricePerNight}/night</p>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation Buttons */}
            <button
              className="swiper-button-prev-hotels absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition"
              aria-label="Previous hotels"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              className="swiper-button-next-hotels absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition"
              aria-label="Next hotels"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Custom Pagination */}
            <div className="swiper-pagination-hotels flex justify-center gap-2 mt-4"></div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="bg-gray-50 rounded-2xl p-8 mb-16">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center">
                <span className="text-white text-2xl font-bold">$</span>
              </div>
              <p className="text-gray-700">
                Pssst! Do you want to get secret offers and best prices for amazing stays? Sign up to join our Travel Club!
              </p>
            </div>
            <button className="px-6 py-3 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition font-medium whitespace-nowrap">
              Sign up for newsletter
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

