import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ArtisanList from './pages/ArtisanList';
import ArtisanDetail from './pages/ArtisanDetail';
import Legal from './pages/Legal';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="categorie/:slug" element={<ArtisanList />} />
        <Route path="recherche" element={<ArtisanList />} />
        <Route path="artisan/:id" element={<ArtisanDetail />} />
        <Route path="mentions-legales" element={<Legal title="Mentions légales" />} />
        <Route path="donnees-personnelles" element={<Legal title="Données personnelles" />} />
        <Route path="accessibilite" element={<Legal title="Accessibilité" />} />
        <Route path="cookies" element={<Legal title="Cookies" />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
