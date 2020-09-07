import React, { useState, useEffect } from "react";
import classNames from "classnames";

import styles from "./LazyImage.module.scss";

interface LazyImageProps {
  src: string;
  className?: string;
  alt: string;
}

export const loadImage = (src: string) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.src = src;
  });
};

const LazyImage: React.FC<LazyImageProps> = ({ src, className, alt }) => {
  const [loadedImage, setLoadedImage] = useState(
    `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO8detePQAIOwMTpO6upwAAAABJRU5ErkJggg==`
  );
  const [show, setShow] = useState(false);

  const cls = classNames(styles.wrapper, className, {
    [styles.show]: show,
  });

  useEffect(() => {
    let followThrough = true;

    setShow(false);
    loadImage(src).then(() => {
      if (followThrough) {
        setLoadedImage(src);
      }

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (followThrough) {
            setShow(true);
          }
        });
      });
    });

    return () => {
      followThrough = false;
    };
  }, [src]);

  return (
    <div className={cls}>
      <img src={loadedImage} alt={alt} />
    </div>
  );
};

export { LazyImage };
