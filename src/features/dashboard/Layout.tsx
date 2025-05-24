import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

const Header = () => {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold hover:text-blue-200">
            Biblioteca Virtual
          </Link>
          <div className="space-x-6">
            <Link to="/livros" className="hover:text-blue-200">
              Livros
            </Link>
            <Link to="/categorias" className="hover:text-blue-200">
              Categorias
            </Link>
            <Link to="/sobre" className="hover:text-blue-200">
              Sobre
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <p className="text-sm">
            © {new Date().getFullYear()} Biblioteca Virtual. Todos os direitos reservados.
          </p>
          <div className="mt-2 space-x-4">
            <Link to="/termos" className="text-sm hover:text-blue-300">
              Terms of Use
            </Link>
            <Link to="/privacidade" className="text-sm hover:text-blue-300">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
} 