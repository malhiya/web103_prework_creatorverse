import { useRoutes, BrowserRouter } from 'react-router-dom';
import ShowCreators from './pages/ShowCreators';
import AddCreator from './pages/AddCreator';
import ViewCreator from './pages/ViewCreator';
import EditCreator from './pages/EditCreator';

function AppRoutes() {
  return useRoutes([
    { path: '/', element: <ShowCreators /> },
    { path: '/add', element: <AddCreator /> },
    { path: '/creator/:id', element: <ViewCreator /> },
    { path: '/edit/:id', element: <EditCreator /> }
  ]);
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
