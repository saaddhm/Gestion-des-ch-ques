import { useLocation, Link } from "wouter";

const AppTabs = () => {
  const [location] = useLocation();

  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <div className="mb-8">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <Link href="/home">
            <a className={`py-4 px-1 border-b-2 font-medium ${
              isActive('/home') 
                ? 'border-primary ' 
                : 'text-gray-500 hover:text-gray-700 border-transparent hover:border-gray-300'
            }`}>
              Nouveau Chèque
            </a>
          </Link>
          <Link href="/history">
            <a className={`py-4 px-1 border-b-2 font-medium ${
              isActive('/history') 
                ? 'border-primary ' 
                : 'text-gray-500 hover:text-gray-700 border-transparent hover:border-gray-300'
            }`}>
              Historique
            </a>
          </Link>
          {/* <Link href="/print-settings">
            <a className={`py-4 px-1 border-b-2 font-medium ${
              isActive('/print-settings') 
                ? 'border-primary ' 
                : 'text-gray-500 hover:text-gray-700 border-transparent hover:border-gray-300'
            }`}>
              Configuration d'Impression
            </a>
          </Link> */}
        </nav>
      </div>
    </div>
  );
};

export default AppTabs;
