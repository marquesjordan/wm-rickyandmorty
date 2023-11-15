import { useContext } from 'react';
import ShowContext, { Character } from '../../contexts/ShowContext';
import './Characters.scss';

interface CharacterProps {
  characters: Character[];
  onAddMoreCharacters: (nextPage: string) => Promise<void>;
  onCharacterSelect: (character: Character) => void;
  episodeTitle: string | null;
}

const Characters = ({
  characters,
  onAddMoreCharacters,
  onCharacterSelect,
  episodeTitle,
}: CharacterProps) => {
  const { state } = useContext(ShowContext)!;

  const handleLoadMoreCharacters = () => {
    if (state && state.charactersInfo) {
      onAddMoreCharacters(state.charactersInfo.next);
    }
  };

  return (
    <div className="flex-1 characters">
      {episodeTitle && (
        <h4>{`${characters.length} Characters in episode ${episodeTitle}`}</h4>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {characters &&
          characters.length &&
          characters.map((item, index) => (
            <div key={item.id} style={{ position: 'relative' }}>
              <img
                src={item.image}
                alt="Thumbnail 1"
                className="thumbnail"
                onClick={() => onCharacterSelect(item)}
              />
              <h4
                style={{
                  position: 'absolute',
                  bottom: '-25px',
                  width: '100%',
                  textAlign: 'center',
                }}>
                {item.name}
              </h4>
            </div>
          ))}
      </div>
      {state.charactersInfo && state.charactersInfo?.next && (
        <div className="text-center" style={{ marginTop: '2rem' }}>
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
