<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-column">
        <h4>ACCUEIL</h4>
        <ul>
          <li><router-link to="/" class="nav-link" exact-active-class="active-link">ACCUEIL</router-link></li>
        </ul>
      </div>
      <div class="footer-column">
        <h4>A PROPOS</h4>
        <ul>
          <li><router-link to="/about" class="nav-link" exact-active-class="active-link">Qui sommes-nous?</router-link></li>
          <li><router-link to="/activities" class="nav-link" exact-active-class="active-link">Nos domaines d'activités</router-link></li>
          <li><router-link to="/partners" class="nav-link" exact-active-class="active-link">Nos partenaires</router-link></li>
        </ul>
      </div>
      <div class="footer-column">
        <h4>ACTIVITÉS</h4>
        <ul>
          <li>
            <router-link to="/categories/2" class="nav-link" exact-active-class="active-link">Dans la santé</router-link>
          </li>
          <li>
            <router-link to="/categories/3" class="nav-link" exact-active-class="active-link">Dans l'éducation</router-link>
          </li>
          <li>
            <router-link to="/categories/4" class="nav-link" exact-active-class="active-link">Dans la culture</router-link>
          </li>
          <li>
            <router-link to="/categories/5" class="nav-link" exact-active-class="active-link">Dans l'environnement</router-link>
          </li>
        </ul>
      </div>
      <div class="footer-column">
        <h4>CONTACTS</h4>
      </div>
      <div class="footer-column">
        <h4>Télécharger notre canevas</h4>
        <ul>
          <li>
            <!-- Lien de téléchargement PDF -->
            <a href="/documents/Fondation-Canevas.docx" class="nav-link" download>
              <i class="fas fa-file-pdf"></i> Télécharger notre document
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="footer-social">
      <a href="#"><i class="fab fa-facebook-f"></i></a>
      <a href="#"><i class="fab fa-linkedin-in"></i></a>
      <a href="#"><i class="fab fa-twitter"></i></a>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #333;
  color: white;
  padding: 40px 20px;
  margin-top: 20px;
}

.footer-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto;
}

.footer-column {
  flex: 1;
  min-width: 200px;
  margin-bottom: 20px;
}

.footer-column h4 {
  font-size: 18px;
  color: #ffffff;
  margin-bottom: 15px;
}

.footer-column ul {
  list-style: none;
  padding: 0;
}

.footer-column ul li {
  margin-bottom: 10px;
}

.footer-column ul li a {
  color: #cccccc;
  text-decoration: none;
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
}

.footer-column ul li a i {
  margin-right: 8px;
  font-size: 18px;
}

.footer-column ul li a:hover {
  color: #ffffff;
}

.footer-social {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.footer-social a {
  color: white;
  font-size: 18px;
  margin-left: 15px;
  transition: color 0.3s ease;
}

.footer-social a:hover {
  color: #cccccc;
}
</style>
