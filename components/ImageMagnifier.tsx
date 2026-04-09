import React, { useState } from 'react';

export default function ImageMagnifier({ 
  src, 
  alt, 
  zoomLevel = 2
}: { 
  src: string; 
  alt: string; 
  zoomLevel?: number 
}) {
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [[x, y], setXY] = useState([0, 0]);
  const [imgSize, setImgSize] = useState({ width: 0, height: 0 });
  const magnifierSize = 150;

  return (
    <div
      style={{ position: 'relative', width: '100%', height: '100%' }}
      className="cursor-zoom-in"
      onMouseEnter={(e) => {
        const elem = e.currentTarget;
        const { width, height } = elem.getBoundingClientRect();
        setImgSize({ width, height });
        setShowMagnifier(true);
      }}
      onMouseLeave={() => {
        setShowMagnifier(false);
      }}
      onMouseMove={(e) => {
        const elem = e.currentTarget;
        const { top, left } = elem.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;
        setXY([x, y]);
      }}
    >
      <img src={src} alt={alt} className="absolute inset-0 w-full h-full object-cover" />

      {showMagnifier && (
        <div
          style={{
            position: 'absolute',
            left: `${x}px`,
            top: `${y}px`,
            // Ngăn chặn kính lúp block sự kiện chuột
            pointerEvents: 'none',
            // Kích thước kính lúp
            width: `${magnifierSize}px`,
            height: `${magnifierSize}px`,
            transform: 'translate(-50%, -50%)',
            border: '3px solid #dfc39d',
            borderRadius: '50%',
            boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
            backgroundColor: 'white',
            backgroundImage: `url('${src}')`,
            backgroundRepeat: 'no-repeat',
            // Tính toán kích thước zoom
            backgroundSize: `${imgSize.width * zoomLevel}px ${imgSize.height * zoomLevel}px`,
            // Tính toán vị trí ảnh nền bên trong kính lúp
            backgroundPositionX: `${-x * zoomLevel + magnifierSize / 3}px`,
            backgroundPositionY: `${-y * zoomLevel + magnifierSize / 3}px`,
          }}
        />
      )}
    </div>
  );
}
