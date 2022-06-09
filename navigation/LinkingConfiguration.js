import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.createURL('/')],
  config: {
    screens: {
      Root: {
        path: '/',
        screens: {
          Home: 'home',
          People: {
            path: 'People',
            screens: {
              Viewpeople: 'view-all',
              ViewPerson: 'view',
              EditPerson: 'edit',
              AddPerson: 'add',
            },
          },
          AddPerson: 'people/add',
          Help: 'help',
        },
      },
      NotFound: '*', // catch-all route (404 resource not found)
    },
  },
};
