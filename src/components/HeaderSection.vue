<template>
  <header class="navbar-header">
    <div class="navbar-container">
      <!-- Logo + Titre -->
      <div class="navbar-top">
        <div class="navbar-logo">
          <img src="/assets/logo/logo_fatom.png" alt="Logo Fondation ATEF OMAIS" class="logo-img" />
        </div>
        <div class="navbar-title-section">
          <!-- <h1 class="navbar-title">FONDATION ATEF OMAIS</h1>
          <p class="navbar-subtitle">AIMER, C’EST PARTAGER</p> -->
        </div>
        <!-- Bouton de Menu Burger -->
        <button @click="toggleMenu" class="burger-menu" aria-label="Menu">
          <div class="burger-icon"></div>
          <div class="burger-icon"></div>
          <div class="burger-icon"></div>
        </button>
      </div>

      <!-- Menu de navigation -->
      <nav :class="{'active': isMenuOpen, 'navbar': true}" class="navbar">
        <ul class="navbar-links">
          <li class="nav-item"><a href="#" class="nav-link">ACCUEIL</a></li>
          <li class="nav-item dropdown"><a href="#" class="nav-link">A PROPOS</a></li>
          <li class="nav-item dropdown"><a href="#" class="nav-link">ACTIVITÉS</a></li>
          <li class="nav-item dropdown"><a href="#" class="nav-link">PARTENAIRES</a></li>
          <li class="nav-item dropdown"><a href="#" class="nav-link">CONTACTS</a></li>
        </ul>

        <!-- Réseaux sociaux -->
        <div class="navbar-socials">
          <a href="#" class="social-icon"><img src="/assets/icons/facebook-icon.png" alt="Facebook" /></a>
          <a href="#" class="social-icon"><img src="/assets/icons/linkedin-icon.png" alt="LinkedIn" /></a>
          <a href="#" class="social-icon"><img src="/assets/icons/instagram-icon.png" alt="Instagram" /></a>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      isMenuOpen: false, // État du menu
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen; // Inverser l'état du menu
    },
  },
};
</script>

<style scoped>
/* Header global */
.navbar-header {
  padding: 20px 0;
  background-color: #ffffff;
  border-bottom: 1px solid #ccc;
}

/* Conteneur principal */
.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Partie supérieure avec le logo et le titre */
.navbar-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Logo */
.navbar-logo img {
  height: 80px; /* Ajuster la hauteur du logo */
}

/* Bouton de menu burger */
.burger-menu {
  display: none; /* Masqué par défaut */
  flex-direction: column;
  cursor: pointer;
}

.burger-icon {
  width: 25px;
  height: 3px;
  background-color: #333;
  margin: 3px 0;
}

/* Menu de navigation */
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navbar-links {
  list-style: none;
  display: flex;
  gap: 40px;
  margin: 0;
  padding: 0;
}

.nav-item {
  position: relative;
}

.nav-link {
  font-size: 16px;
  color: #333333;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: bold;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #008000; /* Vert au survol */
}

/* Réseaux sociaux */
.navbar-socials {
  display: flex;
  gap: 15px;
}

.social-icon img {
  width: 30px;
  height: 30px;
}

.social-icon img:hover {
  filter: brightness(1.2);
}

/* Styles Responsifs */
@media (max-width: 768px) {
  .navbar-top {
    flex-direction: column;
  }
  

  /* Masquer le menu de navigation par défaut sur mobile */
  .navbar {
    display: none; /* Masquer le menu sur mobile */
    flex-direction: column;
    width: 100%;
  }

  .navbar.active {
    display: flex; /* Afficher le menu quand il est actif */
  }

  .navbar-links {
    flex-direction: column;
    gap: 20px;
    text-align: center;
    width: 100%; /* S'assurer que le menu prend toute la largeur */
  }

  .burger-menu {
    display: flex; /* Afficher le bouton burger sur mobile */
  }

  /* Ajustement de la taille du logo */
  .navbar-logo img {
    height: 60px;
  }

  .logo-img{
    padding: 5px;
  }
}
</style>
