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

export enum STAGES {
  TITLE = "title",
  INTRO = "intro",
  FILTER = "filter",
  FILM = "film",
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
}
