import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';

import Characters from '@/components/Characters/Characters';
import ShowContext, { ShowProvider } from '../../contexts/ShowContext';

const mockContextValue = {
  state: {
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
    episodesInfo: undefined,
    episodes: [],
  },
  dispatch: jest.fn(),
};

const mockOnAddMoreCharacters = jest.fn();

describe('Characters component', () => {
  it('renders characters and load more button correctly', async () => {
    const { getByAltText, getByText } = render(
      <ShowProvider>
        <ShowContext.Provider value={mockContextValue}>
          <Characters
            characters={mockContextValue.state.characters}
            onAddMoreCharacters={mockOnAddMoreCharacters}
          />
        </ShowContext.Provider>
      </ShowProvider>,
    );

    const characterImage = getByAltText('Thumbnail 1');
    expect(characterImage).not.toBeNull();

    const loadMoreButton = getByText('Load More');
    expect(loadMoreButton).not.toBeNull();
  });

  it('calls onAddMoreCharacters when Load More button is clicked', async () => {
    const { getByText } = render(
      <ShowProvider>
        <ShowContext.Provider value={mockContextValue}>
          <Characters
            characters={mockContextValue.state.characters}
            onAddMoreCharacters={mockOnAddMoreCharacters}
          />
        </ShowContext.Provider>
      </ShowProvider>,
    );

    fireEvent.click(getByText('Load More'));

    await waitFor(() => {
      expect(mockOnAddMoreCharacters).toHaveBeenCalledWith(
        mockContextValue.state.charactersInfo.next,
      );
    });
  });
});
