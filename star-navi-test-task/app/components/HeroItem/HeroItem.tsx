import Hero from "@/app/types/Hero";

interface Props {
  hero: Hero;
  onHeroSelect: (hero: Hero) => void;
}

const HeroItem: React.FC<Props> = ({ hero, onHeroSelect }) => (
  <div
    key={hero.id}
    onClick={() => onHeroSelect(hero)}
    className="flex justify-center py-5"
  >
    <div className="w-1/2 bg-black-300 rounded-lg shadow-md overflow-hidden cursor-pointer border border-yellow-500 hover:bg-neutral-900">
      <div className="p-4">
        <p className="text-sm font-semibold leading-6 text-yellow-500">
          {hero.name}
        </p>

        <p className="text-sm leading-5 text-yellow-500">{hero.height} cm</p>
      </div>
    </div>
  </div>
);

export default HeroItem;
