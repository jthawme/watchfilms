export const tickedUpdate = (cb: () => void) => {
  let ticking = false;

  const update = () => {
    cb();
    ticking = false;
  };

  const requestTick = () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  };

  return requestTick;
};

export const movieDbImage = (
  posterPath: string,
  size = "w780",
  baseUrl = "https://image.tmdb.org/t/p/"
) => {
  return `${baseUrl}${size}${posterPath}`;
};
