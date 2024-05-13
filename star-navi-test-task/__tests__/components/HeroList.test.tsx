import { render } from '@testing-library/react';
import  HeroList  from '@/app/components/HeroList/HeroList.tsx';

const heroes = [
  { id: 1, name: 'Darth Vader' },
  { id: 2, name: 'Darth Vader' },
  { id: 3, name: 'Darth Vader' },
];

describe('HeroList', () => {
  it('renders a list of heroes', () => {
    const { getByTestId } = render(
      <HeroList onSelect={() => {}} />
    );
    heroes.forEach((hero) => {
      expect(getByTestId(`hero-${hero.id}`)).toBeInTheDocument();
    });
  });
});
