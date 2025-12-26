'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import RoomCard from './RoomCard';
import { Room } from '@/lib/types';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface RoomsCarouselProps {
  rooms: Room[];
  propertyId: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
}

export default function RoomsCarousel({ rooms, propertyId, checkIn, checkOut, guests }: RoomsCarouselProps) {
  if (rooms.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No rooms available</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={24}
        slidesPerView={1}
        slidesPerGroup={1}
        navigation={{
          nextEl: '.swiper-button-next-rooms',
          prevEl: '.swiper-button-prev-rooms',
        }}
        pagination={{
          clickable: true,
          el: '.swiper-pagination-rooms',
          bulletClass: 'swiper-pagination-bullet',
          bulletActiveClass: 'swiper-pagination-bullet-active',
        }}
        breakpoints={{
          768: {
            slidesPerView: 2,
            slidesPerGroup: 2,
          },
          1024: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
        }}
        className="rooms-swiper"
      >
        {rooms.map((room) => (
          <SwiperSlide key={room.id}>
            <RoomCard
              room={room}
              propertyId={propertyId}
              checkIn={checkIn}
              checkOut={checkOut}
              guests={guests}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <button
        className="swiper-button-prev-rooms absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition"
        aria-label="Previous rooms"
      >
        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        className="swiper-button-next-rooms absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition"
        aria-label="Next rooms"
      >
        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Custom Pagination */}
      <div className="swiper-pagination-rooms flex justify-center gap-2 mt-4"></div>
    </div>
  );
}

