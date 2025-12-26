import { useState } from 'react';
import Image from 'next/image';

interface ImageGalleryProps {
  images: string[];
  name: string;
  mainImage?: string;
}

export default function ImageGallery({ images, name, mainImage }: ImageGalleryProps) {
  // Use main image if images array is empty, otherwise use first image from array
  const defaultImage = mainImage || images[0] || '';
  const [selectedImage, setSelectedImage] = useState(defaultImage);
  
  // Combine main image with images array, removing duplicates
  const allImages = mainImage 
    ? [mainImage, ...images.filter(img => img !== mainImage)]
    : images;
  
  // Ensure we have at least one image
  if (!defaultImage) {
    return null;
  }

  return (
    <div className="grid grid-cols-4 gap-2">
      {/* Main image on the left */}
      <div className="col-span-4 md:col-span-3">
        <div className="relative h-96 rounded-lg overflow-hidden">
          <Image
            src={selectedImage}
            alt={name}
            fill
            className="object-cover"
          />
        </div>
      </div>
      {/* 3 thumbnails stacked vertically on the right */}
      <div className="col-span-4 md:col-span-1 flex flex-col gap-2">
        {allImages.slice(1, 4).map((image, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedImage(image)}
            className={`relative h-32 rounded-lg overflow-hidden border-2 transition ${
              selectedImage === image ? 'border-primary' : 'border-transparent hover:border-gray-300'
            }`}
          >
            <Image
              src={image}
              alt={`${name} ${idx + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

