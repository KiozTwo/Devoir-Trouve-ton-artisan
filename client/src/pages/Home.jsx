import { useEffect, useState } from 'react';
import { api } from '../api';
import ArtisanCard from '../components/ArtisanCard';

export default function Home() {
  const [artisans, setArtisans] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    document.title = 'Trouve ton artisan | Auvergne-Rhône-Alpes';
    document.querySelector('meta[name=description]').content =
      'Trouvez et contactez un artisan de confiance en Auvergne-Rhône-Alpes.';

    api.artisans('?top=true')
      .then(setArtisans)
      .catch(() => setError('Les artisans du mois sont momentanément indisponibles.'));
  }, []);

  return (
    <>
      <section className="hero">
        <div className="container">
          <p className="eyebrow">Auvergne-Rhône-Alpes</p>
          <h1>Le savoir-faire près de chez vous</h1>
          <p>Trouvez simplement l’artisan adapté à votre projet.</p>
        </div>
      </section>

      <section className="container section">
        <h2>Comment trouver mon artisan ?</h2>
        <ol className="steps">
          <li><span>1</span>Choisir la catégorie d’artisanat dans le menu.</li>
          <li><span>2</span>Choisir un artisan.</li>
          <li><span>3</span>Le contacter via le formulaire de contact.</li>
          <li><span>4</span>Une réponse sera apportée sous 48h.</li>
        </ol>
      </section>

      <section className="highlight">
        <div className="container section">
          <h2>Les artisans du mois</h2>
          {error && <p className="alert alert-danger" role="alert">{error}</p>}
          <div className="cards">
            {artisans.map((artisan) => (
              <ArtisanCard key={artisan.id} artisan={artisan} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
