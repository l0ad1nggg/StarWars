import Hero from "@/app/types/Hero";

interface Props {
  hero: Hero;
  onSelect: (hero: Hero) => void;
}

const HeroItem: React.FC<Props> = ({ hero, onSelect }) => {
  return (
    <div
      key={hero.id}
      onClick={() => onSelect(hero)}
      className="flex justify-between gap-x-6 py-5"
    >
      <div className="flex min-w-0 w-full gap-x-4 bg-black-300 rounded-lg shadow-md overflow-hidden cursor-pointer border border-yellow-500 hover:bg-neutral-900">
        <div className="min-w-0 flex-auto p-4">
          <p className="text-sm font-semibold leading-6 text-yellow-500">
            {hero.name}
          </p>
          <p className="text-sm leading-5 text-yellow-500">
            {hero.height} cm
          </p>
        </div>
      </div>
    </div>
  );
}; 

export default HeroItem;