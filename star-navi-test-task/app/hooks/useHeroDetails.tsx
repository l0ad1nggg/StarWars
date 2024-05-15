import { useEffect, useState } from "react";
import Film from "../types/Film";
import Hero from "../types/Hero";
import Ship from "../types/Ship";
import axios from "axios";

const useHeroDetails = (selectedHero: Hero) => {
  const [films, setFilms] = useState<Film[]>([]);
  const [ships, setShips] = useState<Ship[]>([]);

  useEffect(() => {
    const fetchHeroDetails = async () => {
      try {
        const filmsData = [];

        for (const filmId of selectedHero.films) {
          const filmResponse = axios.get(
            `https://sw-api.starnavi.io/films/${filmId}/`
          );
          const film: Film = (await filmResponse).data;
          filmsData.push(film);
        }

        setFilms(filmsData);

        const shipsData = [];

        for (const shipId of selectedHero.starships) {
          const shipResponse = await axios.get(
            `https://sw-api.starnavi.io/starships/${shipId}/`
          );
          const ship: Ship = shipResponse.data;
          shipsData.push(ship);
        }

        setShips(shipsData);
      } catch (error) {
        console.error("Error fetching hero details:", error);
      }
    };

    fetchHeroDetails();
  }, [selectedHero]);

  return { films, ships };
};

export default useHeroDetails;
