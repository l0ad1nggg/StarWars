"use client";
import Hero from "../types/Hero";
import HeroDetails from "../components/HeroDetails/HeroDetails";
import React, { useState } from "react";
import Modal from "react-modal";
import HeroList from "../components/HeroList/HeroList";

const StarWars = () => {
  const [selectedHero, setSelectedHero] = useState<Hero | null>(null);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const onSelectHero = (hero: Hero) => {
    setSelectedHero(hero);
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setSelectedHero(null);
    setIsOpenModal(false);
  };

  return (
    <div className="bg-black">
      <h1 className="flex justify-center text-yellow-500 p-4">
        Star Wars List
      </h1>

      <HeroList onSelectHero={onSelectHero} />

      {isOpenModal && (
        <Modal
          isOpen={isOpenModal}
          onRequestClose={closeModal}
          contentLabel="Hero Details"
          className="bg-neutral-800"
        >
          {selectedHero && <HeroDetails selectedHero={selectedHero} />}
          <button
            className="absolute top-0 right-4 mt-4 p-2 rounded-full bg-black text-yellow-500 hover:text-black hover:bg-yellow-500"
            onClick={closeModal}
          >
            Close Modal
          </button>
        </Modal>
      )}
    </div>
  );
};

export default StarWars;
