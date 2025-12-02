import { createContext, useContext, useState, useEffect } from 'react';
import type {ReactNode} from 'react';

interface Route {
  path: string;
  element: ReactNode;
}

interface RouterContextType {
  currentPath: string;
  navigate: (path: string) => void;
}

const RouterContext = createContext<RouterContextType | null>(null);

export const useRouter = () => {
  const context = useContext(RouterContext);
  if (!context) throw new Error('useRouter must be used within RouterProvider');
  return context;
};

export const useNavigate = () => {
  const { navigate } = useRouter();
  return navigate;
};

export const RouterProvider = ({ children }: { children: ReactNode }) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <RouterContext.Provider value={{ currentPath, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};

export const Router = ({ routes }: { routes: Route[] }) => {
  const { currentPath } = useRouter();

  const route = routes.find(r => r.path === currentPath) || routes.find(r => r.path === '/404');

  return <>{route?.element}</>;
};

export const Link = ({ to, children, className = '' }: { to: string; children: ReactNode; className?: string }) => {
  const { navigate } = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(to);
  };

  return (
    <a href={to} onClick={handleClick} className={className}>
      {children}
    </a>
  );
};










