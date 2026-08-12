<template>
  <div>
    <HeaderSection />
    <HeroSection :backgroundImage="'https://zupimages.net/up/24/43/68dg.jpg'" />
    <div class="container-fluid">
      <!-- Loader personnalisé -->
      <div v-if="isLoading" class="loadingScreen">
        <h3 class="loadingScreen__text">
          <span class="loadingScreen__text__span">F</span>
          <span class="loadingScreen__text__span">A</span>
          <span class="loadingScreen__text__span">T</span>
          <span class="loadingScreen__text__span">O</span>
          <span class="loadingScreen__text__span">M</span>
        </h3>
      </div>

      <!-- Liste des posts avec pagination -->
      <div v-else>
        <div v-if="paginatedPosts.length" class="grid-container">
          <div
            class="card"
            v-for="post in paginatedPosts"
            :key="post.id"
            @click="goToPostDetails(post.id)"
          >
            <img :src="post.featuredImage || 'https://placehold.co/600x400?text=Aucune+Image'" class="card-img-top" alt="{{post.title}}" />
            <div class="card-body">
              <h6 class="card-title" v-html="post.title"></h6>
            </div>
          </div>
        </div>

        <!-- Message si aucun post n'est disponible -->
        <div v-else class="text-center">
          <p>Aucun post disponible.</p>
        </div>

        <!-- Pagination -->
        <div class="pagination" v-if="totalPages > 1">
          <button
            class="pagination-button"
            :disabled="currentPage === 1"
            @click="currentPage--"
          >
            Précédent
          </button>
          <span>Page {{ currentPage }} sur {{ totalPages }}</span>
          <button
            class="pagination-button"
            :disabled="currentPage === totalPages"
            @click="currentPage++"
          >
            Suivant
          </button>
        </div>
      </div>
    </div>
    <FooterSection />
  </div>
</template>

<script>
import HeaderSection from "../components/HeaderSection.vue";
import FooterSection from "../components/FooterSection.vue";
import HeroSection from "../components/HeroSection.vue";
import { mapActions, mapState } from "vuex";

export default {
  components: {
    HeaderSection,
    FooterSection,
    HeroSection,
  },
  data() {
    return {
      isLoading: true,
      currentPage: 1,
      itemsPerPage: 12,
    };
  },
  computed: {
    ...mapState({
      posts: (state) => state.all_posts,
    }),

    totalPages() {
      return Math.ceil(this.posts.length / this.itemsPerPage);
    },

    paginatedPosts() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.posts.slice(start, end);
    },
  },
  methods: {
    ...mapActions(["fetchAllPosts"]),

    goToPostDetails(postId) {
      this.$router.push({
        name: "PostDetailView",
        params: { id: postId },
      });
    },
  },
  mounted() {
    this.fetchAllPosts()
      .finally(() => {
        this.isLoading = false;
      });
  },
};
</script>

<style>
/* Grille pour les cartes - 4 colonnes */
.grid-container {
  display: grid;
  gap: 20px; /* Espace entre les éléments */
  grid-template-columns: repeat(4, 1fr); /* 4 colonnes par défaut */
  padding: 20px;
  margin-top: 20px;
}

.card {
  border: none;
  cursor: pointer;
  background-color: white;
  transition: transform 0.3s ease;
}

.card:hover {
  transform: scale(1.05);
}

.card-img-top {
  width: 100%;
  height: 180px;
  object-fit: cover; /* Assurer que l'image garde son ratio */
  margin: 0 auto;
}

.card-body {
  text-align: center;
}

.card-title {
  text-align: justify;
}

/* Style du loader personnalisé */
.loadingScreen {
  position: fixed;
  height: 100%;
  width: 100%;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 900000;
  overflow: hidden;
  background: #fff;

  display: flex;
  justify-content: center;
  align-items: center;
  color: #ddd;
  font-size: 30px;
  font-weight: 800;
}

.loadingScreen__text {
  display: flex;
  justify-content: center;
  align-items: center;
}

.loadingScreen__text__span {
  display: inline-block;
  padding: 5px;
  vertical-align: middle;
  animation-name: charColor;
  animation-iteration-count: infinite;
  animation-duration: 1s;
  animation-delay: 100ms;
  animation-timing-function: ease;
  animation-fill-mode: both;
  backface-visibility: hidden;
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 10px;
}

.pagination-button {
  padding: 8px 16px;
  font-size: 14px;
  border: 1px solid #ddd;
  background-color: #f8f8f8;
  cursor: pointer;
  transition: all 0.2s ease;
}

.pagination-button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.pagination-button:hover:not(:disabled) {
  background-color: #eaeaea;
}

/* Responsive */
@media (max-width: 992px) {
  .grid-container {
    grid-template-columns: repeat(3, 1fr); /* 3 colonnes pour tablettes */
  }
}

@media (max-width: 768px) {
  .grid-container {
    grid-template-columns: repeat(2, 1fr); /* 2 colonnes pour petits écrans */
  }
}

@media (max-width: 576px) {
  .grid-container {
    grid-template-columns: 1fr; /* 1 colonne pour les très petits écrans */
  }
}
</style>