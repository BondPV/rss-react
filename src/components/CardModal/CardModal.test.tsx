import { screen, render, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { CardModal } from './CardModal';
import { ICard } from '../../types/interfaces';
import database from '../../Api/mockSource.json';

describe('CardModal', () => {
  const mockCard: ICard = database.results[0];

  test('should render the card modal', () => {
    const handleClose = vi.fn();

    render(<CardModal id={mockCard.id} handleCardModalShow={handleClose} />);

    expect(screen.getByTestId('close')).toBeInTheDocument();
  });

  test('should call the handleClose function when the close button is clicked', () => {
    const handleClose = vi.fn();

    render(<CardModal id={mockCard.id} handleCardModalShow={handleClose} />);

    fireEvent.click(screen.getByTestId('close'));

    expect(handleClose).toHaveBeenCalled();
  });

  test('should display the card information when it is loaded', async () => {
    const handleClose = vi.fn();

    render(<CardModal id={mockCard.id} handleCardModalShow={handleClose} />);

    expect(await screen.findByText(mockCard.name)).toBeInTheDocument();
    expect(await screen.findByText(mockCard.gender)).toBeInTheDocument();
  });
});