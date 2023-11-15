import ShowContext, { Episode } from '../../contexts/ShowContext';
import { useContext, useState } from 'react';
import './LeftMenu.scss';

interface LeftMenuProps {
  episodes: Episode[];
  addMoreEpisodes: (page: number) => Promise<void>;
  onEpisodeSelect: (chars: string[], title: string) => Promise<void>;
  handleFetchCharacters: (page: number) => Promise<void>;
}

const LeftMenu = ({
  episodes,
  addMoreEpisodes,
  onEpisodeSelect,
  handleFetchCharacters,
}: LeftMenuProps) => {
  const { state } = useContext(ShowContext)!;
  const [selectedId, setSelectedId] = useState<number | null>();

  const handleSelectEpisode = (
    id: number,
    title: string,
    episodeCharacters: string[],
  ) => {
    if (id !== selectedId) {
      setSelectedId(id);
      onEpisodeSelect(episodeCharacters, title);
    } else {
      setSelectedId(null);
      handleFetchCharacters(1);
    }
  };

  return (
    <div className="text-white p-4 sidebar">
      <div className="left-menu">
        <div>
          <h2 className="text-xl font-bold text-center">Episodes</h2>
          <hr />
        </div>
        <div className="links">
          <ul>
            {episodes &&
              episodes.length &&
              episodes.map((item, index) => (
                <li
                  onClick={() =>
                    handleSelectEpisode(item.id, item.name, item.characters)
                  }
                  key={item.id}
                  className={`${selectedId === item.id ? 'selected' : ''}`}>
                  <div className="hover:text-gray-300">{item.name}</div>
                </li>
              ))}
            {state.episodesInfo && state.episodesInfo?.next && (
              <li className="more">
                <div
                  onClick={() =>
                    addMoreEpisodes(Number(state.episodesInfo?.next.slice(-1)))
                  }>
                  Add More Episodes
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LeftMenu;
