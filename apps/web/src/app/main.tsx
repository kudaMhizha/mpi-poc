import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import {StrictMode} from 'react';
import * as ReactDOM from 'react-dom/client';
import {router} from '../navigation';
import {RouterProvider} from 'react-router-dom';
import '@mpi-app/ui/styles/global.css';
import {env} from '../constants/env';
// import {createAbilitiesForUser} from '@mpi-app/casl';
// import {AbilityContext} from '../providers/casl';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: `${env.VITE_API_URL}/graphql`,
});
console.log('client', {
  client,
  uri: env.VITE_API_URL
})
root.render(
  <StrictMode>
    <ApolloProvider client={client}>
      {/* TODO: Update user session once authentication is done */}
      {/* <AbilityContext.Provider value={createAbilitiesForUser('UserID')}> */}
      <RouterProvider router={router} />
      {/* </AbilityContext.Provider> */}
    </ApolloProvider>
  </StrictMode>
);
