export const DIRECTORS = [
  {
    label: "Wes Anderson",
    value: "5655",
  },
  {
    label: "Spike Jonze",
    value: "5953",
  },
  {
    label: "Jean-Luc Godard",
    value: "3776",
  },
  {
    label: "Sofia Coppola",
    value: "1769",
  },
  {
    label: "Jim Jarmusch",
    value: "4429",
  },
  {
    label: "Stanley Kubrick",
    value: "240",
  },
  {
    label: "Akira Kurosowa",
    value: "5026",
  },
  {
    label: "David Lynch",
    value: "5602",
  },
  {
    label: "David Fincher",
    value: "7467",
  },
  {
    label: "Ethan Coen",
    value: "1224",
  },
  {
    label: "Spike Lee",
    value: "5281",
  },
  {
    label: "Hayao Miyazaki",
    value: "608",
  },
  {
    label: "Gaspar Noé",
    value: "14597",
  },
  {
    label: "Richard Linklater",
    value: "564",
  },
  {
    label: "Paul Thomas Anderson",
    value: "4762",
  },
  {
    label: "Quentin Tarantino",
    value: "138",
  },
  {
    label: "Wong Kar Wai",
    value: "12453",
  },
  {
    label: "Bong Joon Ho",
    value: "21684",
  },
  {
    label: "Park Chan Wook",
    value: "10099",
  },
  {
    label: "Alfred Hitchcock",
    value: "2636",
  },
  {
    label: "Greta Gerwig",
    value: "45400",
  },
  {
    label: "Noah Baumbach",
    value: "5656",
  },
].sort((a, b) => {
  if (a.label < b.label) {
    return -1;
  }

  if (a.label > b.label) {
    return 1;
  }

  return 0;
});

export const GENRES = [
  {
    label: "Adventure",
    value: "Adventure",
  },
  {
    label: "Comedy",
    value: "Comedy",
  },
  {
    label: "Drama",
    value: "Drama",
  },
  {
    label: "Animation",
    value: "Animation",
  },
  {
    label: "Romance",
    value: "Romance",
  },
  {
    label: "Documentary",
    value: "Documentary",
  },
  {
    label: "Fantasy",
    value: "Fantasy",
  },
  {
    label: "Crime",
    value: "Crime",
  },
  {
    label: "Science Fiction",
    value: "Science Fiction",
  },
  {
    label: "Music",
    value: "Music",
  },
  {
    label: "Action",
    value: "Action",
  },
  {
    label: "Thriller",
    value: "Thriller",
  },
  {
    label: "War",
    value: "War",
  },
  {
    label: "Western",
    value: "Western",
  },
].sort((a, b) => {
  if (a.label < b.label) {
    return -1;
  }

  if (a.label > b.label) {
    return 1;
  }

  return 0;
});

export const getDirectorById = (id: string) => {
  return DIRECTORS.find((d) => d.value === id);
};

export enum FILTER {
  GENRE = "genre",
  DIRECTOR = "director",
}

export interface Film {
  id: string;
  title: string;
  synopsis: string;
  poster: string;
  genres: string[];
  runtime: number;
  date: string;
  director: string;
  imdb: string;
  score: number;
  rottenTomatoes: number;
}

export interface QueryFilter {
  skip: string;
  directors?: string;
  genres?: string;
}
