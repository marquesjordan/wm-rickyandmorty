import { ShowAction, ShowState } from '../contexts/ShowContext';

export const showReducer = (
  state: ShowState,
  action: ShowAction,
): ShowState => {
  switch (action.type) {
    case 'SET_CHARACTERS':
      return {
        ...state,
        charactersInfo: action.payload.info,
        characters: action.payload.results,
      };
    case 'ADD_CHARACTERS':
      return {
        ...state,
        charactersInfo: action.payload.info,
        characters: [...state.characters, ...action.payload.results],
      };

    case 'SET_EPISODES':
      return {
        ...state,
        episodesInfo: action.payload.info,
        episodes: [...state.episodes, ...action.payload.results],
      };

    case 'UPDATE_CHARACTERS':
      return {
        ...state,
        charactersInfo: null,
        characters: action.payload,
      };

    default:
      return state;
  }
};
