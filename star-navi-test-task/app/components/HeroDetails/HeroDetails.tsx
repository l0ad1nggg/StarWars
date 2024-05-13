"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Hero from "../../types/Hero";
import ReactFlow, {
  useEdgesState,
  useNodesState,
  Edge,
  Node,
  EdgeProps,
  Background,
} from "reactflow";

import "reactflow/dist/style.css";
import Film from "../../types/Film";
import Ship from "../../types/Ship";

interface Props {
  selectedHero: Hero;
}

const HeroDetails: React.FC<Props> = ({ selectedHero }) => {
  const [films, setFilms] = useState<Film[]>([]);
  const [ships, setShips] = useState<Ship[]>([]);
  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([]);

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

  useEffect(() => {
    const heroNode: Node = {
      id: selectedHero.name,
      position: { x: 800, y: 100 },
      data: {
        label: selectedHero.name,
      },
      style: {
        backgroundColor: "rgb(163 163 163)",
        color: "#000000",
        textAlign: "center",
        fontSize: "14px",
        fontWeight: "bold",
      },
    };

    const filmNodes: Node[] = films.map((film, index) => ({
      id: `${film.id}`,
      position: {
        x: 800 + 200 * (index - Math.floor(films.length / 2)),
        y: 200,
      },
      data: { label: film.title },
      style: {
        backgroundColor: "rgb(163 163 163)",
        color: "#000000",
        textAlign: "center",
        fontSize: "12px",
        fontWeight: "bold",
      },
    }));

    const shipNodes: Node[] = ships.map((ship: Ship, index: number) => ({
      id: `${ship.id}`,
      position: {
        x: 800 + 200 * (index - Math.floor(ships.length / 2)),
        y: 350 + 50,
      },
      data: { label: ship.name },
      style: {
        backgroundColor: "rgb(163 163 163)",
        color: "#000000",
        textAlign: "center",
        fontSize: "12px",
        fontWeight: "bold",
      },
    }));

    const filmEdges: Edge[] = filmNodes.map((filmNode) => ({
      id: `${heroNode.id}-${filmNode.id}`,
      source: heroNode.id,
      target: filmNode.id,
      type: "black-line",
    }));

    const filmShipEdges: Edge[] = [];
    let edgeIdCounter = 0;

    for (const film of films) {
      for (const starshipId of film.starships) {
        const starship = ships.find((ship) => ship.id === starshipId);
        if (starship && selectedHero.starships.includes(starshipId)) {
          edgeIdCounter++;
          filmShipEdges.push({
            id: `film-ship-${edgeIdCounter}`,
            source: `${film.id}`,
            target: `${starshipId}`,
            type: "black-line",
          });
        }
      }
    }
    const allNodes = [heroNode, ...filmNodes, ...shipNodes];
    const allEdges = [...filmEdges, ...filmShipEdges];

    setNodes(allNodes);
    setEdges(allEdges);
  }, [selectedHero, films, ships, setNodes, setEdges]);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-full h-full">
        <div className="h-full bg-black">
          <h2 className="text-2xl text-yellow-500 font-bold pt-7">
            Details for {selectedHero.name}
          </h2>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={(params) => console.log("Connected:", params)}
            edgeTypes={edgeTypes}
            className="bg-black w-full h-full"
          >
            <Background color="yellow" gap={64} size={1} />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
};

export default HeroDetails;

const CustomEdge: React.FC<EdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  style = {},
}) => {
  const controlPointX = (sourceX + targetX) / 2;
  const controlPointY = (sourceY + targetY) / 2;

  return (
    <>
      <path
        id={id}
        style={{
          strokeWidth: 3,
          stroke: "yellow",
          ...style,
        }}
        d={`M${sourceX},${sourceY}Q${controlPointX},${controlPointY} ${targetX},${targetY}`}
      />
    </>
  );
};

const edgeTypes = {
  "black-line": CustomEdge,
};
