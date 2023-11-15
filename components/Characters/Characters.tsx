import { useContext } from 'react';
import ShowContext, { Character } from '../../contexts/ShowContext';
import './Characters.scss';

interface CharacterProps {
  characters: Character[];
  onAddMoreCharacters: (nextPage: string) => Promise<void>;
  onCharacterSelect: (character: Character) => void;
}

const Characters = ({
  characters,
  onAddMoreCharacters,
  onCharacterSelect,
}: CharacterProps) => {
  const { state } = useContext(ShowContext)!;

  const handleLoadMoreCharacters = () => {
    if (state && state.charactersInfo) {
      onAddMoreCharacters(state.charactersInfo.next);
    }
  };

  return (
    <div className="flex-1 characters">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {characters &&
          characters.length &&
          characters.map((item, index) => (
            <img
              key={item.id}
              src={item.image}
              alt="Thumbnail 1"
              className="thumbnail"
              onClick={() => onCharacterSelect(item)}
            />
          ))}
      </div>
      {state.charactersInfo && state.charactersInfo?.next && (
        <div className="text-center mt-4">
          <button
            onClick={handleLoadMoreCharacters}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none">
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default Characters;
