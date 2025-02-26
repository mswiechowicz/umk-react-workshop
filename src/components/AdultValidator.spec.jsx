import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AdultValidator } from './AdultValidator';

describe('AdultValidator', () => {
  it('should render textbox with label', () => {
    // when
    render(<AdultValidator />);

    // then
    expect(screen.getByRole('textbox')).toBeInTheDocument(); // <- złapie inputa (zwróci błąd jeśli będzie na stronie więcej niż jeden input. Wtedy getAllByRole)

    // expect(screen.getByLabelText('Put your age here')).toBeInTheDocument(); // <- złapie inputa, ale tego, który ma taki label text
    // expect(screen.getByRole('textbox', { name: /put your age here/i })).toBeInTheDocument(); // <- złapie inputa, który będzie miał taki label
    // expect(screen.getByText('Put your age here')).toBeInTheDocument(); // <- złapie label, nie inputa. Sprawdzamy czy "coś" z takim tekstem jest na stronie
    // expect(screen.getByText('Put your age here')).toHaveAttribute('for', 'age'); // <- możemy sprawdzić czy ma odpowiedni atrybut
  });

  it('should not render alert box by default', () => {
    // when
    render(<AdultValidator />);

    // then
    expect(screen.queryByRole('alert')).not.toBeInTheDocument(); // <- getByRole gdy nie znajdzie elementu od razu failuje test
    // dlatego do szukania elementów, których oczekujemy, że nie będzie - używamy queryByRole
  });

  it('should show TO YOUNG alert after entering value smaller than min', async () => {
    // given
    render(<AdultValidator />);
    const input = screen.getByRole('textbox', { name: 'Put your age here' });

    // when
    await userEvent.type(input, '3'); // <- symulowanie akcji użytkownika

    // then
    const alertBox = await screen.findByRole('alert'); // <- find(ByRole) używamy do elementów, które dopiero mają się pojawić
    // test musi być asynchroniczny (skladnia async await), alert pojawi się dopiero po wpisaniu przez nas wartości dlatego musimy na nią "poczekać"
    expect(alertBox).toHaveTextContent('Are you really so young?');
  });

  it('should not render adult validator', () => {
    // when
    const { container } = render(<AdultValidator shouldRender={false} />); // <- container to kontener, któwym byłby wyrenderowany komponent
    // możemy znaleźć tu jeszcze inne rzeczy jak np rerender -> https://testing-library.com/docs/react-testing-library/api/#render-options

    // screen.debug(); <- możemy zdebugować to co w trakcie testu zostało "wyrenderowane"

    // then
    expect(container).toBeEmptyDOMElement();
  });
});
