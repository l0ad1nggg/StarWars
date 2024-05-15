import React, { useEffect, useState } from "react";
import Hero from "../../types/Hero";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import HeroItem from "../HeroItem/HeroItem";
import Loader from "../Loader/Loader";

interface Props {
  onSelectHero: (hero: Hero) => void;
}
const HeroList: React.FC<Props> = ({ onSelectHero }) => {
  // State to store the list of heroes
  const [heroes, setHeroes] = useState<Hero[]>([]);

  // State to track if there are more heroes to fetch
  const [hasMore, setHasMore] = useState<boolean>(true);

  // State to track the current page of hero data
  const [page, setPage] = useState<number>(1);

  // Fetch heroes data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch heroes data from the API based on the current page
        const response = await axios.get(
          `https://sw-api.starnavi.io/people/?page=${page}`
        );

        // Update the list of heroes with the new data
        setHeroes((prevHeroes) => [...prevHeroes, ...response.data.results]);

        // Check if there are more pages of heroes to fetch
        setHasMore(!!response.data.next);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [page]);

  // Function to fetch more hero data when scrolling
  const fetchMoreData = () => {
    setPage(page + 1);
  };

  return (
    <div className="bg-black">
      <div className="gap-8 m-7">
        {/* Infinite scroll component to load more heroes */}
        <InfiniteScroll
          dataLength={heroes.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<Loader />}
          style={{ overflow: "hidden" }}
        >
          {/* Render each hero item */}
          {heroes.map((hero) => (
            <HeroItem key={hero.id} hero={hero} onHeroSelect={onSelectHero} />
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default HeroList;
