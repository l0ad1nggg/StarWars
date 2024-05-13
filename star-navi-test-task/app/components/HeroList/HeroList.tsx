import React, { useEffect, useState } from "react";
import Hero from "../../types/Hero";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import HeroItem from "../HeroItem/HeroItem";
import Loader from "../Loader/Loader";

interface Props {
  onSelect: (hero: Hero) => void;
}
const HeroList: React.FC<Props> = ({ onSelect }) => {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://sw-api.starnavi.io/people/?page=${page}`
        );
        setHeroes((prevHeroes) => [...prevHeroes, ...response.data.results]);
        setHasMore(!!response.data.next);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [page]);

  const fetchMoreData = () => {
    setPage(page + 1);
  };

  return (
    <div className="bg-black">
      <div className="grid grid-cols-1 gap-8 m-7">
        <InfiniteScroll
          dataLength={heroes.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<Loader />}
          style={{ overflow: "hidden" }}
        >
          {heroes.map((hero) => (
            <HeroItem key={hero.id} hero={hero} onSelect={onSelect} />
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default HeroList;