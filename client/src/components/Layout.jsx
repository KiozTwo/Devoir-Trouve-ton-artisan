import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { api } from '../api';

const legalLinks = [
  ['Mentions légales', 'mentions-legales'],
  ['Données personnelles', 'donnees-personnelles'],
  ['Accessibilité', 'accessibilite'],
  ['Cookies', 'cookies']
];

export default function Layout() {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    api.categories().then(setCategories).catch(() => setCategories([]));
  }, []);

  function submitSearch(event) {
    event.preventDefault();
    const value = search.trim();

    if (value) {
      navigate(`/recherche?q=${encodeURIComponent(value)}`);
    }
  }

  return (
    <>
      <a className="skip-link" href="#main">Aller au contenu principal</a>

      <header>
        <nav className="navbar navbar-expand-lg" aria-label="Navigation principale">
          <div className="container">
            <Link className="navbar-brand" to="/" aria-label="Trouve ton artisan - accueil">
              <img src="/logo.png" alt="Trouve ton artisan" />
            </Link>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#mainNav"
              aria-controls="mainNav"
              aria-expanded="false"
              aria-label="Ouvrir le menu"
            >
              <span className="navbar-toggler-icon" />
            </button>

            <div className="collapse navbar-collapse" id="mainNav">
              <ul className="navbar-nav mx-auto">
                {categories.map((category) => (
                  <li className="nav-item" key={category.id}>
                    <NavLink className="nav-link" to={`/categorie/${category.slug}`}>
                      {category.name}
                    </NavLink>
                  </li>
                ))}
              </ul>

              <form className="d-flex search" role="search" onSubmit={submitSearch}>
                <label className="visually-hidden" htmlFor="site-search">
                  Rechercher un artisan
                </label>
                <input
                  id="site-search"
                  className="form-control"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Nom de l’artisan"
                />
                <button className="btn btn-primary" type="submit">Rechercher</button>
              </form>
            </div>
          </div>
        </nav>
      </header>

      <main id="main"><Outlet /></main>

      <footer>
        <div className="container footer-grid">
          <section>
            <h2>Région Auvergne-Rhône-Alpes</h2>
            <address>
              101 cours Charlemagne<br />
              CS 20033<br />
              69269 LYON CEDEX 02<br />
              France<br />
              <a href="tel:+33426734000">+33 (0)4 26 73 40 00</a>
            </address>
          </section>

          <nav aria-label="Informations légales">
            <h2>Informations</h2>
            <ul>
              {legalLinks.map(([name, path]) => (
                <li key={path}><Link to={`/${path}`}>{name}</Link></li>
              ))}
            </ul>
          </nav>
        </div>
        <p className="copyright">© {new Date().getFullYear()} Région Auvergne-Rhône-Alpes</p>
      </footer>
    </>
  );
}
