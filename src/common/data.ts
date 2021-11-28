export const DIRECTORS = [
  {
    label: "Wes Anderson",
    value: 5655,
  },
  {
    label: "Spike Jonze",
    value: 5953,
  },
  {
    label: "Jean-Luc Godard",
    value: 3776,
  },
  {
    label: "Sofia Coppola",
    value: 1769,
  },
  {
    label: "Jim Jarmusch",
    value: 4429,
  },
  {
    label: "Stanley Kubrick",
    value: 240,
  },
  {
    label: "Akira Kurosawa",
    value: 5026,
  },
  {
    label: "David Lynch",
    value: 5602,
  },
  {
    label: "David Fincher",
    value: 7467,
  },
  {
    label: "Ethan Coen",
    value: 1224,
  },
  {
    label: "Spike Lee",
    value: 5281,
  },
  {
    label: "Hayao Miyazaki",
    value: 608,
  },
  {
    label: "Gaspar Noé",
    value: 14597,
  },
  {
    label: "Richard Linklater",
    value: 564,
  },
  {
    label: "Paul Thomas Anderson",
    value: 4762,
  },
  {
    label: "Quentin Tarantino",
    value: 138,
  },
  {
    label: "Wong Kar-wai",
    value: 12453,
  },
  {
    label: "Bong Joon-ho",
    value: 21684,
  },
  {
    label: "Park Chan-wook",
    value: 10099,
  },
  {
    label: "Alfred Hitchcock",
    value: 2636,
  },
  {
    label: "Noah Baumbach",
    value: 5656,
  },
  {
    label: "Greta Gerwig",
    value: 45400,
  },
  {
    label: "Edgar Wright",
    value: 11090,
  },
  {
    label: "Jordan Peele",
    value: 291263,
  },
  {
    label: "Ari Aster",
    value: 1145520,
  },
  {
    label: "Robert Eggers",
    value: 138781,
  },
  {
    label: "John Carpenter",
    value: 11770,
  },
  {
    label: "Wes Craven",
    value: 5140,
  },
  {
    label: "Lars von Trier",
    value: 42,
  },
  {
    label: "Darren Aronofsky",
    value: 6431,
  },
  {
    label: "Michael Haneke",
    value: 6011,
  },
  {
    label: "Nicolas Winding Refn",
    value: 21183,
  },
  {
    label: "Roy Andersson",
    value: 45791,
  },
]
  .map((item) => ({
    ...item,
    value: item.value.toString(),
  }))
  .sort((a, b) => {
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
    label: "Animation",
    value: "Animation",
  },
  {
    label: "Comedy",
    value: "Comedy",
  },
  {
    label: "Family",
    value: "Family",
  },
  {
    label: "Drama",
    value: "Drama",
  },
  {
    label: "Romance",
    value: "Romance",
  },
  {
    label: "Crime",
    value: "Crime",
  },
  {
    label: "Music",
    value: "Music",
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
    label: "Science Fiction",
    value: "Science Fiction",
  },
  // {
  //     "label": "TV Movie",
  //     "value": "TV Movie"
  // },
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
  {
    label: "Mystery",
    value: "Mystery",
  },
  {
    label: "Horror",
    value: "Horror",
  },
  {
    label: "History",
    value: "History",
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
