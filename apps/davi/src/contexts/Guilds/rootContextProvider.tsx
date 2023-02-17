import React from 'react';
import { FilterProvider } from '.';
import { OrbisProvider } from './orbis';
import { HookStoreProvider } from 'stores';
import { LoadingPage } from 'components/LoadingPage';
import NotFound from 'Modules/Guilds/pages/NotFound';

export const GuildsContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <HookStoreProvider
      loadingIndicator={<LoadingPage />}
      matchErrorIndicator={<NotFound />}
    >
      <FilterProvider>
        <OrbisProvider>{children}</OrbisProvider>
      </FilterProvider>
    </HookStoreProvider>
  );
};
