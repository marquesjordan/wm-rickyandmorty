import CharacterModal from '@/components/CharacterModal/CharacterModal';
import Characters from '@/components/Characters/Characters';
import LeftMenu from '@/components/LeftMenu/LeftMenu';
import ShowContext, { Character } from '@/contexts/ShowContext';
import { fetchData, fetchMultiData } from '@/utils/api';
import { useContext, useEffect, useState } from 'react';
import './home.scss';

export default function Home() {
  const { state, dispatch } = useContext(ShowContext)!;
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null,
  );

  const handleFetchCharacters = async (page: number) => {
    try {
      const response = await fetchData('character', page);

      dispatch({ type: 'SET_CHARACTERS', payload: response });
    } catch (error) {
      console.error('handleFetchCharacters Fetch Broke: ', error);
    }
  };

  const handleFetchEpisodes = async (page: number) => {
    try {
      const response = await fetchData('episode', page);
      dispatch({ type: 'SET_EPISODES', payload: response });
    } catch (error) {
      console.error('handleFetchEpisodes Fetch Broke: ', error);
    }
  };

  const onEpisodeSelect = async (chars: string[]) => {
    try {
      const charIds = chars.map((item) => {
        return Number(item.slice(-1));
      });

      const response = await fetchMultiData('character', charIds);
      dispatch({ type: 'UPDATE_CHARACTERS', payload: response });
    } catch (error) {
      console.error('onEpisodeSelect Broke: ', error);
    }
  };

  const onAddMoreCharacters = async (nextPage: string) => {
    try {
      const nextPageId = Number(nextPage.slice(-1));

      const response = await fetchData('character', nextPageId);
      dispatch({ type: 'ADD_CHARACTERS', payload: response });
    } catch (error) {
      console.error('onEpisodeSelect Broke: ', error);
    }
  };

  const handleModalClose = () => {
    setSelectedCharacter(null);
  };

  const handleCharacterSelect = (character: Character) => {
    setSelectedCharacter(character);
  };

  useEffect(() => {
    handleFetchCharacters(1);
    handleFetchEpisodes(1);
  }, []);

  return (
    <main className="h-screen">
      <div className="main-wrapper">
        <LeftMenu
          addMoreEpisodes={handleFetchEpisodes}
          handleFetchCharacters={handleFetchCharacters}
          episodes={state.episodes}
          onEpisodeSelect={onEpisodeSelect}
        />
        <Characters
          onAddMoreCharacters={onAddMoreCharacters}
          characters={state.characters}
          onCharacterSelect={handleCharacterSelect}
        />
      </div>
      {selectedCharacter && (
        <CharacterModal
          character={selectedCharacter}
          onClose={handleModalClose}
        />
      )}
    </main>
  );
}
