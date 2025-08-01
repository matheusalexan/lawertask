import { render, screen } from '@testing-library/react';
import { useAuth } from '@/contexts/AuthContext';
import Navigation from './Navigation';

// Mock do contexto de autenticação
jest.mock('@/contexts/AuthContext');
jest.mock('next/navigation', () => ({
  usePathname: () => '/dashboard',
}));

const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

describe('Navigation', () => {
  beforeEach(() => {
    mockUseAuth.mockReturnValue({
      user: { id: '1', name: 'Test User', email: 'test@example.com' },
      token: 'test-token',
      login: jest.fn(),
      logout: jest.fn(),
      isAuthenticated: true,
    });
  });

  it('deve renderizar o logo do LawerTask', () => {
    render(<Navigation />);
    expect(screen.getByText('LawerTask')).toBeInTheDocument();
  });

  it('deve renderizar o nome do usuário', () => {
    render(<Navigation />);
    expect(screen.getByText('Test User')).toBeInTheDocument();
  });

  it('deve renderizar os links de navegação', () => {
    render(<Navigation />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Tarefas')).toBeInTheDocument();
  });

  it('deve renderizar o botão de logout', () => {
    render(<Navigation />);
    expect(screen.getByText('Sair')).toBeInTheDocument();
  });

  it('deve chamar logout quando o botão de sair for clicado', () => {
    const mockLogout = jest.fn();
    mockUseAuth.mockReturnValue({
      user: { id: '1', name: 'Test User', email: 'test@example.com' },
      token: 'test-token',
      login: jest.fn(),
      logout: mockLogout,
      isAuthenticated: true,
    });

    render(<Navigation />);
    screen.getByText('Sair').click();
    expect(mockLogout).toHaveBeenCalled();
  });
}); 