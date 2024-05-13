"use client";
import Hero from "../types/Hero";
import HeroDetails from "../components/HeroDetails/HeroDetails";
import React, { useState } from "react";
import Modal from "react-modal";
import HeroList from "../components/HeroList/HeroList";

const StarWars = () => {
  const [selectedHero, setSelectedHero] = useState<Hero | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const onSelectHero = (hero: Hero) => {
    setSelectedHero(hero);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedHero(null);
    setModalIsOpen(false);
  };

  return (
    <div className="bg-black">
        <h1 className="flex justify-center text-yellow-500 p-4">Star Wars List</h1>
         <HeroList onSelect={onSelectHero} />
        {modalIsOpen && (
          <Modal
            isOpen={modalIsOpen}
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