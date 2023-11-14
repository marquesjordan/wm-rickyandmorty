import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import LeftMenu from '../../components/LeftMenu/LeftMenu';
import ShowContext from '../../contexts/ShowContext';

const mockDispatch = jest.fn();

const mockContextValue = {
  state: {
    episodesInfo: {
      count: 5,
      pages: 1,
      next: 'https://api.wm.com/episodes?page=2',
      prev: '',
    },
    episodes: [
      {
        id: 1,
        name: 'Episode 1',
        air_date: '2023-01-01',
        episode: 'S01E01',
        characters: ['https://api.wm.com/character/1'],
        url: 'https://api.wm.com/episode/1',
        created: '2023-01-01T00:00:00.000Z',
      },
    ],
    charactersInfo: {
      count: 5,
      pages: 1,
      next: 'https://api.wm.com/characters?page=2',
      prev: '',
    },
    characters: [
      {
        id: 1,
        name: 'Character 1',
        status: 'Alive',
        species: 'Human',
        type: null,
        gender: 'Male',
        origin: {
          name: 'Origin 1',
          url: 'https://api.wm.com/origin/1',
        },
        location: {
          name: 'Location 1',
          url: 'https://api.wm.com/location/1',
        },
        image: 'https://wm.com/image1.jpg',
        episode: ['https://api.wm.com/episode/1'],
        url: 'https://api.wm.com/character/1',
        created: '2023-01-01T00:00:00.000Z',
      },
    ],
  },
  dispatch: mockDispatch,
};

const mockAddMoreEpisodes = jest.fn();
const mockOnEpisodeSelect = jest.fn();
const mockHandleFetchCharacters = jest.fn();

describe('LeftMenu component', () => {
  it('renders episodes and handles click events correctly', async () => {
    const { getByText, getByTestId } = render(
      <ShowContext.Provider value={mockContextValue}>
        <LeftMenu
          episodes={mockContextValue.state.episodes}
          addMoreEpisodes={mockAddMoreEpisodes}
          onEpisodeSelect={mockOnEpisodeSelect}
          handleFetchCharacters={mockHandleFetchCharacters}
        />
      </ShowContext.Provider>,
    );

    const episodeName = getByText('Episode 1');
    expect(episodeName).not.toBeNull();

    fireEvent.click(episodeName);

    await waitFor(() => {
      expect(mockOnEpisodeSelect).toHaveBeenCalledWith([
        'https://api.wm.com/character/1',
      ]);
    });

    fireEvent.click(episodeName);

    await waitFor(() => {
      expect(mockHandleFetchCharacters).toHaveBeenCalledTimes(1);
    });
  });

  it('calls addMoreEpisodes when "Add More Episodes" is clicked', async () => {
    const { getByText } = render(
      <ShowContext.Provider value={mockContextValue}>
        <LeftMenu
          episodes={mockContextValue.state.episodes}
          addMoreEpisodes={mockAddMoreEpisodes}
          onEpisodeSelect={mockOnEpisodeSelect}
          handleFetchCharacters={mockHandleFetchCharacters}
        />
      </ShowContext.Provider>,
    );

    fireEvent.click(getByText('Add More Episodes'));

    await waitFor(() => {
      expect(mockAddMoreEpisodes).toHaveBeenCalledWith(2);
    });
  });
});
