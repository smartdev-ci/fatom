<template>
  <div>
    <HeaderSection />
    <HeroSection :backgroundImage="'https://zupimages.net/up/24/43/68dg.jpg'" />

    <div class="grid">
      <!-- Skeleton pendant le chargement -->
      <template v-if="isLoading">
        <div v-for="n in itemsPerPage" :key="'skeleton-' + n" class="grid-item skeleton-item">
          <div class="skeleton-img"></div>
          <div class="skeleton-text"></div>
        </div>
      </template>

      <!-- Partenaires une fois chargés -->
      <template v-else>
        <div
          v-for="partner in paginatedPartners"
          :key="partner.id"
          class="grid-item"
        >
          <img :src="partner.image" :alt="partner.alt" />
          <p>{{ partner.name }}</p>
        </div>
      </template>
    </div>

    <!-- Pagination Controls -->
    <div class="pagination" v-if="!isLoading">
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="pagination-button"
      >
        Précédent
      </button>
      <span>Page {{ currentPage }} sur {{ totalPages }}</span>
      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="pagination-button"
      >
        Suivant
      </button>
    </div>

    <FooterSection />
  </div>
</template>

<script>
import HeaderSection from "../components/HeaderSection.vue";
import HeroSection from "../components/HeroSection.vue";
import FooterSection from "../components/FooterSection.vue";
import { mapState } from "vuex";

export default {
  components: {
    HeaderSection,
    HeroSection,
    FooterSection,
  },

  data() {
    return {
      currentPage: 1,
      itemsPerPage: 16,
      isLoading: true,
    };
  },

  computed: {
    ...mapState(["partners"]),

    totalPages() {
      return Math.ceil(this.partners.length / this.itemsPerPage) || 1;
    },

    paginatedPartners() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.partners.slice(start, start + this.itemsPerPage);
    },
  },

  async mounted() {
    // Si les partenaires sont déjà en mémoire (ex: on vient de la page d'accueil),
    // inutile d'afficher le skeleton à nouveau.
    if (this.partners.length > 0) {
      this.isLoading = false;
      return;
    }

    this.isLoading = true;
    await this.$store.dispatch("fetchPartners");
    this.isLoading = false;
  },

  methods: {
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },

    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
  },
};
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  width: 1000px;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 20px;
}

.grid-item {
  text-align: center;
  border: 1px solid #d4d4d4;
  border-radius: 12px;
  padding: 20px;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.grid-item:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.grid-item img {
  max-width: 100px;
  height: auto;
  margin-bottom: 10px;
  border-radius: 8px;
}

.grid-item p {
  font-size: 1.1em;
  color: #333;
  margin-top: 10px;
  transition: color 0.3s;
}

.grid-item:hover p {
  color: #e53e3e;
}

/* Skeleton loading */
.skeleton-item {
  cursor: default;
}

.skeleton-item:hover {
  transform: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.skeleton-img {
  width: 100px;
  height: 100px;
  margin: 0 auto 10px;
  border-radius: 8px;
  background: linear-gradient(90deg, #e8e8e8 25%, #f4f4f4 50%, #e8e8e8 75%);
  background-size: 200% 100%;
  animation: skeleton-pulse 1.4s ease-in-out infinite;
}

.skeleton-text {
  width: 70%;
  height: 14px;
  margin: 10px auto 0;
  border-radius: 4px;
  background: linear-gradient(90deg, #e8e8e8 25%, #f4f4f4 50%, #e8e8e8 75%);
  background-size: 200% 100%;
  animation: skeleton-pulse 1.4s ease-in-out infinite;
}

@keyframes skeleton-pulse {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
}

.pagination-button {
  background-color: #4a5568;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 15px;
  min-width: 100px;
  margin: 0 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.pagination-button:hover {
  background-color: #e53e3e;
}

.pagination-button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

@media (max-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 600px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
    width: 100%;
    padding: 0 10px;
  }
}
</style>