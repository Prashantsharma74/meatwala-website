import React, { useState } from "react";

const ImageWithLoading = ({ src, alt, className, style }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
<>
    {isLoading && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "16px",
            color: "#666",
          }}
        >
          Loading...
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={className}
        style={style}
        onLoad={handleLoad}
      />
    </>
  );
};

export default ImageWithLoading;
