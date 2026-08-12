<template>
  <div>
    <!-- Afficher le preloader tant que la page est en cours de chargement -->
    <div v-if="isLoading" class="loadingScreen">
      <h3 class="loadingScreen__text">
        <span class="loadingScreen__text__span">F</span>
        <span class="loadingScreen__text__span">A</span>
        <span class="loadingScreen__text__span">T</span>
        <span class="loadingScreen__text__span">O</span>
        <span class="loadingScreen__text__span">M</span>
      </h3>
    </div>

    <HeaderSection />
    <HeroSection :backgroundImage="'https://zupimages.net/up/24/43/68dg.jpg'" />

    <div class="grid">
      <div
        v-for="report in paginatedReports"
        :key="report.id"
        class="grid-item"
      >
        <img v-if="report.featuredImage" :src="report.featuredImage" :alt="report.name" />
        <p>{{ report.name }}</p>
        <a v-if="report.pdfUrl" :href="report.pdfUrl" target="_blank" class="download-button">Télécharger</a>
      </div>
    </div>

    <div class="pagination">
      <button
        class="pagination-button"
        :disabled="currentPage === 1"
        @click="changePage(currentPage - 1)"
      >
        Précédent
      </button>
      <span>Page {{ currentPage }} sur {{ totalPages }}</span>
      <button
        class="pagination-button"
        :disabled="currentPage === totalPages"
        @click="changePage(currentPage + 1)"
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

export default {
  components: {
    HeaderSection,
    HeroSection,
    FooterSection,
  },
  data() {
    return {
      reports: [], // Stocker tous les rapports récupérés
      isLoading: true, // Variable pour afficher le préchargeur
      currentPage: 1, // Page actuelle
      itemsPerPage: 8, // Nombre d'éléments par page
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.reports.length / this.itemsPerPage);
    },
    paginatedReports() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.reports.slice(start, end);
    },
  },
  async created() {
    await this.fetchReports();
  },
  methods: {
    async fetchReports() {
      try {
        const response = await fetch(
          "https://reseau.fatom.org/wp-json/wp/v2/posts?categories=7&per_page=50"
        );
        if (!response.ok)
          throw new Error("Échec de la récupération des rapports");

        const data = await response.json();

        const reportsWithFiles = await Promise.all(
          data.map(async (report) => {
            const pdfUrlMatch =
              report.content.rendered.match(/href="([^"]+\.pdf)"/);
            const pdfUrl = pdfUrlMatch ? pdfUrlMatch[1] : null;

            if (report.featured_media) {
              const mediaResponse = await fetch(
                `https://reseau.fatom.org/wp-json/wp/v2/media/${report.featured_media}`
              );
              const mediaData = await mediaResponse.json();
              report.featured_media_url = mediaData.source_url;
            }

            return {
              id: report.id,
              name: report.title?.rendered || "Sans titre",
              pdfUrl,
              featuredImage: report.featured_media_url || null,
            };
          })
        );

        const sortedReports = reportsWithFiles.sort((a, b) => {
          const nameA = a.name.toLowerCase();
          const nameB = b.name.toLowerCase();
          return nameA > nameB ? -1 : nameA < nameB ? 1 : 0;
        });

        this.reports = sortedReports;
        this.isLoading = false; 
      } catch (error) {
        console.error("Erreur lors de la récupération des rapports:", error);
        this.isLoading = false;
      }
    },
    changePage(page) {
      this.currentPage = page;
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
  border: 1px solid #d4d4d4; /* Bordure légère */
  border-radius: 12px; /* Coins arrondis */
  padding: 20px; /* Espacement interne augmenté */
  background-color: white; /* Fond blanc pour le contraste */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Ombre légère */
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* Transition pour zoom et ombre */
}

.grid-item:hover {
  transform: scale(1.05); /* Zoom effect on hover */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* Ombre plus prononcée au survol */
}

.grid-item img {
  max-width: 100px; /* Maintien de la taille d'image */
  height: auto; /* Assurer la proportionnalité */
  margin-bottom: 10px;
  border-radius: 8px; /* Coins arrondis pour les images */
}

.grid-item p {
  font-size: 1.1em; /* Augmentation de la taille de police */
  color: #333; /* Couleur de texte foncé */
  margin-top: 10px; /* Marge au-dessus du texte */
  transition: color 0.3s; /* Transition pour le changement de couleur */
}

.grid-item:hover p {
  color: #e53e3e; /* Changement de couleur du texte au survol */
}

/* Pagination styles */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
}

.pagination-button {
  background-color: #4a5568; /* Couleur de fond */
  color: white; /* Couleur du texte */
  border: none; /* Supprime la bordure par défaut */
  border-radius: 8px; /* Coins arrondis */
  padding: 10px 15px; /* Espacement interne */
  min-width: 100px; /* Largeur minimale */
  margin: 0 10px; /* Espacement horizontal entre les boutons */
  cursor: pointer; /* Curseur pointeur au survol */
  transition: background-color 0.3s; /* Transition douce pour le changement de couleur */
}

.pagination-button:hover {
  background-color: #e53e3e; /* Couleur de fond au survol */
}

.pagination-button:disabled {
  cursor: not-allowed; /* Curseur non autorisé */
  opacity: 0.5; /* Opacité pour les boutons désactivés */
}

/* Media query pour écrans moyens (tablettes) */
@media (max-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Media query pour petits écrans (téléphones) */
@media (max-width: 600px) {
  .grid {
    grid-template-columns: repeat(2, 1fr); /* Définit deux colonnes sur les écrans de moins de 600px */
    gap: 15px; /* Réduit l'espace entre les éléments pour les petits écrans */
    width: 100%; /* Prend toute la largeur disponible sur petits écrans */
    padding: 0 10px; /* Ajoute un léger padding pour éviter que les éléments touchent les bords */
  }
}

/* =========================================
 LoadingScreen
 =========================================*/

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
}

.loadingScreen__text {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  text-align: center;
  width: auto;
  height: 100px;
  color: #ddd;
  text-transform: uppercase;
  font-size: 30px;
}

.download-button {
  display: inline-block; /* Pour ressembler à un bouton */
  background-color: orange; /* Couleur de fond orange */
  color: white; /* Texte en blanc */
  text-decoration: none; /* Supprime le soulignement */
  padding: 10px 15px; /* Espacement interne pour une apparence de bouton */
  border-radius: 5px; /* Coins arrondis */
  font-weight: bold; /* Texte en gras */
  text-align: center; /* Centre le texte */
  transition: background-color 0.3s ease, transform 0.2s ease; /* Transition douce */
}

.download-button:hover {
  background-color: darkorange; /* Couleur plus foncée au survol */
  transform: translateY(-2px); /* Effet de soulèvement */
}

.download-button:active {
  background-color: #e67300; /* Couleur encore plus foncée en cas de clic */
  transform: translateY(0); /* Annule le soulèvement */
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

@keyframes charColor {
  0% {
    color: #cccccc; /* Lighten the color */
  }
  50% {
    color: #5c5c5c; /* Main feature color */
  }
  100% {
    color: #cccccc; /* Lighten the color */
  }
}

/* To add delays to each span */
.loadingScreen__text__span:nth-child(1) {
  animation-delay: 100ms;
}
.loadingScreen__text__span:nth-child(2) {
  animation-delay: 200ms;
}
.loadingScreen__text__span:nth-child(3) {
  animation-delay: 300ms;
}
.loadingScreen__text__span:nth-child(4) {
  animation-delay: 400ms;
}
.loadingScreen__text__span:nth-child(5) {
  animation-delay: 500ms;
}
.loadingScreen__text__span:nth-child(6) {
  animation-delay: 600ms;
}
.loadingScreen__text__span:nth-child(7) {
  animation-delay: 700ms;
}
.loadingScreen__text__span:nth-child(8) {
  animation-delay: 800ms;
}
.loadingScreen__text__span:nth-child(9) {
  animation-delay: 900ms;
}

</style>
