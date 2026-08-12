<template>
  <section class="reports-section">
    <h2>LES RAPPORTS DE LA FATOM</h2>
    <div class="reports-grid">
      <div v-if="reports.length === 0">Aucun rapport disponible</div>
      <div
        v-else
        v-for="report in reports.slice(0, 5)"
        :key="report.id"
        class="report-card"
      >
        <div class="report-image">
          <img
            v-if="report.featuredImage"
            :src="report.featuredImage"
            alt="Report Image"
          />
        </div>
        <a v-if="report.pdfUrl" :href="report.pdfUrl" target="_blank">
          <p>{{ report.name }}</p>
        </a>
      </div>
    </div>
    <div class="view-all">
      <router-link
        to="/rapports"
        class="nav-link"
        exact-active-class="active-link"
        >TOUS LES RAPPORTS <i class="fas fa-arrow-right"></i
      ></router-link>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["reports"]),
  },
  created() {
    this.$store.dispatch("fetchLastReports");
  },
};
</script>

<style scoped>
.reports-section {
  padding: 40px 0;
  text-align: center;
  background-color: #fff;
  color: #333;
}

.reports-section h2 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.reports-grid {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
}

.report-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 120px;
  height: 215px;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 10px;
  transition: transform 0.3s ease, background-color 0.3s ease; /* Animation lors du survol */
}

.report-card:hover {
  transform: scale(1.05); /* Légère augmentation de l'échelle */
  background-color: #e0e0e0; /* Changement de couleur de fond */
}

.report-image {
  width: 100%;
  height: 130px; /* Ajuster la hauteur pour mieux correspondre à la carte */
  background-color: #ccc;
  border-radius: 8px;
  margin-bottom: 10px;
  overflow: hidden; /* Assure que l'image ne déborde pas du conteneur */
}

.report-image img {
  width: 100%; /* S'assure que l'image occupe toute la largeur de son conteneur */
  height: 100%; /* L'image occupera la hauteur définie pour le conteneur */
  object-fit: cover; /* Cette propriété permet de garder l'image proportionnelle tout en la couvrant entièrement */
}

.report-card p {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.view-all {
  margin-top: 20px;
  text-align: right;
  margin-right: 20px;
}

.view-all a {
  font-size: 14px;
  color: #fff;
  background-color: #ff9800;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 5px;
  display: inline-flex;
  align-items: center;
  transition: background-color 0.3s ease;
}

.view-all a i {
  margin-left: 5px;
}

.view-all a:hover {
  background-color: #e68900;
  text-decoration: none;
}

a {
  text-decoration: none;
}
</style>
