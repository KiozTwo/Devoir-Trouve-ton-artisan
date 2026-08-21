import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  useEffect(() => {
    document.title = 'Page non trouvée | Trouve ton artisan';
  }, []);

  return (
    <section className="container section not-found">
      <img
        className="error-image"
        src="/404.svg"
        alt="Illustration d’une page introuvable"
      />
      <h1>Page non trouvée</h1>
      <p>La page que vous avez demandée n’existe pas ou a été déplacée.</p>
      <Link className="btn btn-primary" to="/">
        Retour à l’accueil
      </Link>
    </section>
  );
}
