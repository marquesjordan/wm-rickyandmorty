import { createContext, Dispatch, useReducer, ReactNode } from 'react';
import { showReducer } from '@/reducers/showReducer';

export interface Info {
  count: number;
  pages: number;
  next: string;
  prev: string;
}

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string | null;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

export interface ShowState {
  charactersInfo?: Info | null;
  characters: Character[];
  episodesInfo?: Info;
  episodes: Episode[];
}

export interface ShowAction {
  type: string;
  payload: any;
}

interface ShowContextProps {
  state: ShowState;
  dispatch: Dispatch<ShowAction>;
}

const ShowContext = createContext<ShowContextProps | undefined>(undefined);

export const ShowProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const initialState: ShowState = { characters: [], episodes: [] };
  const [state, dispatch] = useReducer(showReducer, initialState);

  return (
    <ShowContext.Provider value={{ state, dispatch }}>
      {children}
    </ShowContext.Provider>
  );
};

export default ShowContext;
