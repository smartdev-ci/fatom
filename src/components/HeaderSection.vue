<template>
  <header class="navbar-header">
    <div class="navbar-container">
      <div class="navbar-top">
        <div class="navbar-logo">
          <router-link to="/"><img src="/assets/logo/logo_fatom.png" alt="Logo Fondation ATEF OMAIS" class="logo-img" /></router-link>
        </div>
        <button
          @click="toggleMenu"
          class="burger-menu"
          aria-label="Menu"
          :aria-expanded="isMenuOpen"
          aria-haspopup="true"
        >
          <div class="burger-icon"></div>
          <div class="burger-icon"></div>
          <div class="burger-icon"></div>
        </button>
      </div>

      <nav :class="{ active: isMenuOpen, navbar: true }" class="navbar">
        <ul class="navbar-links">
          <li class="nav-item">
            <router-link to="/" class="nav-link" exact-active-class="active-link">ACCUEIL</router-link>
          </li>
          <li class="nav-item dropdown">
            <router-link to="/about" class="nav-link" exact-active-class="active-link">A PROPOS</router-link>
          </li>
          <li class="nav-item dropdown">
            <span class="nav-link">ACTIVITÉS</span>
            <ul class="dropdown-menu">
              <li v-for="category in categories" :key="category.id" class="dropdown-item">
                <router-link :to="`/categories/${category.id}`" class="nav-link">
                  {{ category.name }}
                </router-link>
              </li>
            </ul>
          </li>
          <li class="nav-item dropdown">
            <router-link to="/partners" class="nav-link" exact-active-class="active-link">PARTENAIRES</router-link>
          </li>
          <li class="nav-item dropdown">
            <router-link to="/contacts" class="nav-link" exact-active-class="active-link">CONTACTS</router-link>
          </li>
        </ul>

        <div class="navbar-socials">
          <a href="https://www.facebook.com/FATOMCI" class="social-icon">
            <img src="/assets/icons/facebook-icon.png" alt="Facebook" />
          </a>
          <a href="https://www.linkedin.com/in/fondation-atef-oma%C3%AFs-952168100" class="social-icon">
            <img src="/assets/icons/linkedin-icon.png" alt="LinkedIn" />
          </a>
          <a href="https://www.youtube.com/@FONDATIONATEFOMAIS" class="social-icon">
            <img src="/assets/icons/youtube-icon.png" alt="Youtube" />
          </a>
        </div>
      </nav>
    </div>
  </header>
</template>


<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      isMenuOpen: false,
      activeDropdown: null,
    };
  },
  computed: {
    ...mapState({
      categories: (state) => state.categories,
    }),
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    showDropdown(menu) {
      this.activeDropdown = menu;
    },
    hideDropdown(menu) {
      if (this.activeDropdown === menu) {
        this.activeDropdown = null;
      }
    },
    ...mapActions(["fetchCategories"]),
    goToCategoryPosts(categoryId) {
      this.$router.push({
        name: "PostByCategoryView",
        params: { categoryId: categoryId },
      });
    },
  },
  mounted() {
    this.fetchCategories();
  },
};
</script>

<style scoped>
.navbar-header {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000; /* S'assurer qu'elle reste au-dessus du contenu */
  /* padding: 20px 0; */
  background-color: #ffffff;
  border-bottom: 1px solid #ccc;
}

/* Conteneur principal */
.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  /* padding-top: 20px; Espace pour ne pas masquer le contenu */
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

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  list-style: none;
  padding: 10px 0;
  margin: 0;
  display: none; /* Par défaut, masqué */
  z-index: 1000;
}

.dropdown-menu li {
  padding: 10px 20px;
}

.dropdown-link {
  font-size: 14px;
  color: #333333;
  text-decoration: none;
  display: block;
  transition: color 0.3s ease;
}

.dropdown-link:hover {
  color: #008000; /* Couleur verte au survol */
}

.nav-item.dropdown:hover .dropdown-menu {
  display: block;
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

/* Lien actif */
.active-link {
  color: #008000;
  font-weight: bold;
  border-bottom: 2px solid #008000;
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

  .navbar-logo img {
    height: 60px;
  }

  .dropdown-menu {
    position: static;
    box-shadow: none;
  }

  .nav-item.dropdown {
    margin-bottom: 10px;
  }

  .logo-img {
    padding: 5px;
  }
}
</style>
