<!-- src/components/Footer.vue -->
<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-column">
        <h4>ACCUEIL</h4>
        <ul>
          <li><a href="#">Qui sommes-nous ?</a></li>
        </ul>
      </div>
      <div class="footer-column">
        <h4>A PROPOS</h4>
        <ul>
          <li><a href="#">Qui sommes-nous ?</a></li>
          <li><a href="#">Notre mission</a></li>
          <li><a href="#">Nos domaines d'activités</a></li>
        </ul>
      </div>
      <div class="footer-column">
        <h4>ACTIVITÉS</h4>
        <ul>
          <li><a href="#">Dans la santé</a></li>
          <li><a href="#">Dans l'éducation</a></li>
          <li><a href="#">Dans la culture</a></li>
          <li><a href="#">Dans l'environnement</a></li>
        </ul>
      </div>
      <div class="footer-column">
        <h4>PARTENAIRES</h4>
      </div>
      <div class="footer-column">
        <h4>CONTACTS</h4>
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
