'use client';

import Image from 'next/image';

function ImagePreview({ base64Image, alt, width, height}) {

  return (
    <div>
      <Image
        src={`data:image/jpeg;image/jpg;image/png;image/gif;image/webp;base64,${base64Image}`} 
        alt={alt}
        width={width}
        height={height}
      />
    </div>
  );
}

export default ImagePreview;