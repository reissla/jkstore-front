import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface SearchContextType {
  searchTerm: string | null;
  setSearchTerm: (term: string | null) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchTerm, setSearchTerm] = useState<string | null>(null);

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('Error ao salvar o contexto inserido');
  }
  return context;
}

