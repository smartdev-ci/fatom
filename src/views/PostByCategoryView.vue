<template>
  <div>
    <LoaderComponent :isLoading="isLoading" text="FATOM" />
    <HeaderSection />
    <HeroSection :backgroundImage="heroImageUrl" />
    <h4 class="title" :style="titleBackgroundStyle">
      {{ currentCategoryName }}
    </h4>
    <div v-if="!isLoading" class="container">
      <div class="row mt-5">
        <div class="post-list" v-if="posts.length">
          <div class="post-card" v-for="post in paginatedPosts" :key="post.id">
            <div class="card h-100">
              <img
                :src="post.featuredImage || placeholderImage"
                alt="Image mise en avant"
                class="img-fluid"
              />
              <div class="card-body">
                <h5 class="card-title">
                  {{ truncateText(decodeHtmlEntities(post.title)) }}
                </h5>
                <!-- Limitation du texte à 200 caractères suivi de "..." -->
                <p class="card-text">
                  {{
                    truncateText(decodeHtmlEntities(post.excerpt), 200)
                  }}
                </p>
              </div>
              <div
                class="card-footer text-muted"
                style="border: none; text-align: center; background: none"
              >
                <router-link :to="`/post/${post.id}`" class="btn btn-primary"
                  >Lire plus</router-link
                >
              </div>
            </div>
          </div>
        </div>
        <div v-else class="col-12">
          <p>Aucun article trouvé pour cette catégorie.</p>
        </div>
      </div>
      <!-- Pagination -->
      <div v-if="totalPages > 1" class="pagination-container">
        <button
          class="btn btn-secondary"
          :disabled="currentPage === 1"
          @click="changePage(currentPage - 1)"
        >
          Précédent
        </button>
        <span>Page {{ currentPage }} sur {{ totalPages }}</span>
        <button
          class="btn btn-secondary"
          :disabled="currentPage === totalPages"
          @click="changePage(currentPage + 1)"
        >
          Suivant
        </button>
      </div>
    </div>
    <FooterSection />
  </div>
</template>

<script>
import HeaderSection from "@/components/HeaderSection.vue";
import FooterSection from "@/components/FooterSection.vue";
import { mapActions, mapState } from "vuex";
import HeroSection from "@/components/HeroSection.vue";
import LoaderComponent from "@/components/LoaderComponent.vue";

export default {
  components: {
    LoaderComponent,
    HeaderSection,
    HeroSection,
    FooterSection,
  },
  data() {
    return {
      currentCategoryId: null,
      currentCategoryName: "",
      heroImageUrl: "",  
      isLoading: true, 
      currentPage: 1,
      postsPerPage: 8,
      placeholderImage: "https://placehold.co/600x400?text=Aucune+image",
    };
  },
  computed: {
    ...mapState({
      posts: (state) => state.posts,
    }),
    titleBackgroundStyle() {
      let backgroundColor = "none";

      if (this.currentCategoryName === "Santé") {
        backgroundColor = "#77B5FE";
      } else if (this.currentCategoryName === "Culture") {
        backgroundColor = "red";
      } else if (this.currentCategoryName === "Environnement") {
        backgroundColor = "green";
      }

      return {
        backgroundColor,
        padding: "5px",
        marginTop: "20px",
        marginBottom: "20px",
        textAlign: "center",
        color: "white",
      };
    },
    paginatedPosts() {
      const start = (this.currentPage - 1) * this.postsPerPage;
      const end = start + this.postsPerPage;
      return this.posts.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.posts.length / this.postsPerPage);
    },
  },
  methods: {
    ...mapActions(["fetchPostsByCategory"]),

    async fetchCategoryName(categoryId) {
      try {
        const response = await fetch(
          `https://reseau.fatom.org/wp-json/wp/v2/categories/${categoryId}`
        );
        const category = await response.json();
        return category.name;
      } catch (error) {
        console.error("Erreur lors de la récupération de la catégorie:", error);
        return "Inconnue";
      }
    },

    async loadCategoryInfo() {
      this.isLoading = true;
      try {
        // Charger les infos de la catégorie et les posts
        this.currentCategoryId = this.$route.params.categoryId;
        this.currentCategoryName = await this.fetchCategoryName(this.currentCategoryId);

        // Définir l'image du Hero en fonction de la catégorie
        this.setHeroImage();

        await this.fetchPostsByCategory(this.currentCategoryId);
      } catch (error) {
        console.error("Erreur:", error);
      } finally {
        this.isLoading = false; // Masquer le loader
      }
    },

    // Méthode pour définir l'image du Hero en fonction de la catégorie
    setHeroImage() {
      if (this.currentCategoryName === "Education") {
        this.heroImageUrl = "https://zupimages.net/up/24/52/7lo5.jpeg";
      } else if (this.currentCategoryName === "Santé") {
        this.heroImageUrl = "https://scontent.fabj4-2.fna.fbcdn.net/v/t39.30808-6/468525423_978292527673314_4668076112598296849_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeH3vgtxtLNO5biUBDTcQvJN-yKJrivaKqv7IomuK9oqq5LPtFVmtjmYG4zn3AQAQIxW-tBqvV00F-YB6WD2qn30&_nc_ohc=25f7Ccx0MG8Q7kNvgEJJblg&_nc_zt=23&_nc_ht=scontent.fabj4-2.fna&_nc_gid=AOHx70pyde1b0p-GSg7hHNG&oh=00_AYCK2O2hO4SJ77zoM54Ik4RHBr8IUwHKTuuANl74LgwUYQ&oe=677120E2";
      } else if (this.currentCategoryName === "Culture") {
        this.heroImageUrl = "https://reseau.fatom.org/wp-content/uploads/2024/11/Massa-202413-scaled.jpg";
      } else if (this.currentCategoryName === "Environnement") {
        this.heroImageUrl = "https://zupimages.net/up/24/43/68dg.jpg";
      } else {
        this.heroImageUrl = "https://zupimages.net/up/24/43/68dg.jpg";
      }
    },

    decodeHtmlEntities(text) {
      const doc = new DOMParser().parseFromString(text, "text/html");
      return doc.documentElement.textContent;
    },

    truncateText(text, maxLength) {
      // Traitement pour enlever le HTML et tronquer le texte à la longueur souhaitée
      const cleanText = text.replace(/<[^>]*>/g, "");
      if (cleanText.length > maxLength) {
        return cleanText.substring(0, maxLength) + "[...]";
      }
      return cleanText;
    },

    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
  },
  async mounted() {
    this.loadCategoryInfo();
  },
};
</script>

<style>
.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}

.card-text {
  text-align: justify;
}

.custom-loader {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 4px solid #e87b27;
  position: relative;
  transform-origin: left;
  animation: h2 1s infinite linear;
}
.custom-loader::before,
.custom-loader::after {
  content: "";
  position: absolute;
  inset: 0 0 auto;
  margin: auto;
  width: 50%;
  height: 50%;
  border-radius: 50%;
  border: 4px solid #e87b27;
  transform-origin: 50% calc(100% - 8px);
  animation: inherit;
}
.custom-loader::after {
  inset: auto 0 calc(100% + 4px);
  animation-duration: 0.5s;
  animation-direction: reverse;
  transform-origin: 50% calc(200% - 4px);
}
@keyframes h2 {
  100% {
    transform: rotate(1turn);
  }
}

/* Transition pour le loader */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.post-list {
  display: grid;
  gap: 20px; /* Espace entre les articles */
  grid-template-columns: repeat(4, 1fr); /* 4 colonnes pour les grands écrans */
}

.post-card {
  display: flex;
  flex-direction: column;
}

/* Responsivité pour ajuster les colonnes en fonction de la taille de l'écran */
@media (max-width: 1200px) {
  .post-list {
    grid-template-columns: repeat(
      3,
      1fr
    ); /* 3 colonnes pour les écrans de taille moyenne */
  }
}

@media (max-width: 992px) {
  .post-list {
    grid-template-columns: repeat(2, 1fr); /* 2 colonnes pour les tablettes */
  }
}

@media (max-width: 768px) {
  .post-list {
    grid-template-columns: 1fr; /* 1 colonne pour les petits écrans */
  }
}

.title {
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
  padding: 5px;
  background-color: orange;
}

/* Pagination */
.pagination-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
</style>
