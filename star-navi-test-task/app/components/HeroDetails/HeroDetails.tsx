"use client";
import React, { useEffect } from "react";
import Hero from "../../types/Hero";
import ReactFlow, {
  useEdgesState,
  useNodesState,
  Edge,
  Node,
  Background,
} from "reactflow";

import "reactflow/dist/style.css";
import Ship from "../../types/Ship";
import useHeroDetails from "@/app/hooks/useHeroDetails";
import CustomEdge, { edgeTypes } from "../CustomEdge/CustomEdge";
import {
  filmNodeX,
  filmNodeY,
  heroNodeX,
  heroNodeY,
  intervalOfPoints,
  pointsSize,
  shipNodeX,
  shipNodeY,
} from "@/app/constants";

interface Props {
  selectedHero: Hero;
}

const HeroDetails: React.FC<Props> = ({ selectedHero }) => {
  // Extract films and ships data using a custom hook
  const { films, ships } = useHeroDetails(selectedHero);

  // State for nodes and edges
  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([]);

  useEffect(() => {
    // Define the hero node with its initial position and style
    const heroNode: Node = {
      id: selectedHero.name,
      position: { x: heroNodeX, y: heroNodeY }, // Define position for the hero node
      data: {
        label: selectedHero.name,
      },
      style: {
        backgroundColor: "rgb(0 128 0)",
        color: "#000000",
        textAlign: "center",
        fontSize: "14px",
        fontWeight: "bold",
      },
    };

    // Create nodes for films with their positions and styles
    const filmNodes: Node[] = films.map((film, index) => ({
      id: `${film.id}`,
      position: {
        x: filmNodeX + 200 * (index - Math.floor(films.length / 2)),
        y: filmNodeY,
      },
      data: { label: film.title },
      style: {
        backgroundColor: "rgb(59 130 246)",
        color: "#000000",
        textAlign: "center",
        fontSize: "12px",
        fontWeight: "bold",
      },
    }));

    // Create nodes for ships with their positions and styles
    const shipNodes: Node[] = ships.map((ship: Ship, index: number) => ({
      id: `${ship.id}`,
      position: {
        x: shipNodeX + 200 * (index - Math.floor(ships.length / 2)),
        y: shipNodeY,
      },
      data: { label: ship.name },
      style: {
        backgroundColor: "rgb(184 15 10)",
        color: "#000000",
        textAlign: "center",
        fontSize: "12px",
        fontWeight: "bold",
      },
    }));

    // Create edges between the hero node and film nodes
    const filmEdges: Edge[] = filmNodes.map((filmNode) => ({
      id: `${heroNode.id}-${filmNode.id}`,
      source: heroNode.id,
      target: filmNode.id,
      type: "black-line",
    }));

    // Create edges between films and associated ships
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

    // Combine all nodes and edges
    const allNodes = [heroNode, ...filmNodes, ...shipNodes];
    const allEdges = [...filmEdges, ...filmShipEdges];

    // Set nodes and edges states
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
            <Background
              color="yellow"
              gap={intervalOfPoints}
              size={pointsSize}
            />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
};

export default HeroDetails;
