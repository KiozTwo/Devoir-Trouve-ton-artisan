import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { api } from '../api';
import ArtisanCard from '../components/ArtisanCard';

const categoryNames = {
  alimentation: 'Alimentation',
  batiment: 'Bâtiment',
  fabrication: 'Fabrication',
  services: 'Services'
};

export default function ArtisanList() {
  const { slug } = useParams();
  const location = useLocation();
  const search = new URLSearchParams(location.search).get('q') || '';
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const title = search
    ? `Résultats pour « ${search} »`
    : categoryNames[slug] || slug?.replace(/-/g, ' ');

  useEffect(() => {
    setLoading(true);
    setError('');

    const query = search
      ? `?search=${encodeURIComponent(search)}`
      : `?category=${encodeURIComponent(slug || '')}`;

    api.artisans(query)
      .then(setArtisans)
      .catch((requestError) => setError(requestError.message))
      .finally(() => setLoading(false));

    document.title = `${title || 'Artisans'} | Trouve ton artisan`;
  }, [slug, search, title]);

  return (
    <section className="container section">
      <h1>{title || 'Nos artisans'}</h1>
      {loading && <p role="status">Chargement…</p>}
      {error && <p className="alert alert-danger" role="alert">{error}</p>}

      {!loading && !error && artisans.length === 0 ? (
        <p>Aucun artisan ne correspond à votre recherche.</p>
      ) : (
        <div className="cards">
          {artisans.map((artisan) => (
            <ArtisanCard key={artisan.id} artisan={artisan} />
          ))}
        </div>
      )}
    </section>
  );
}
