<template>
  <section class="awards-section">
    <h2>LES RECOMPENSES DE LA FATOM</h2>
    <div class="awards-grid">
      <div class="award-card">
        <div class="award-image"></div>
        <p>Coupe de ruban au groupe scolaire Fadigui par la Présidente de la Fatom</p>
      </div>
      <div class="award-card">
        <div class="award-image"></div>
        <p>Coupe de ruban au groupe scolaire Yagui par la Présidente de la Fatom</p>
      </div>
      <div class="award-card">
        <div class="award-image"></div>
        <p>Coupe de ruban au groupe scolaire Pojoulou par la Présidente de la Fatom</p>
      </div>
    </div>
    <div class="view-all">
      <a href="#">Voir toutes les récompenses <i class="fas fa-arrow-right"></i></a>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style scoped>
.awards-section {
  padding: 40px 0;
  text-align: center;
  background-color: #fff;
  color: #333;
}

.awards-section h2 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

/* Utilisation de Flexbox pour une grille réactive */
.awards-grid {
  display: flex;
  flex-wrap: wrap; /* Permet aux éléments de s'enrouler sur plusieurs lignes */
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
}

.award-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px; /* Largeur fixe pour un bon aspect sur les écrans plus larges */
  height: 150px;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 10px;
  transition: transform 0.2s; /* Effet de transformation pour le survol */
}

.award-card:hover {
  transform: translateY(-5px); /* Élévation légère au survol */
}

.award-image {
  width: 100%;
  height: 80px;
  background-color: #ccc;
  border-radius: 8px;
  margin-bottom: 10px;
}

.award-card p {
  font-size: 14px;
  font-weight: bold;
  color: #333;
  text-align: center;
}

.view-all {
  margin-top: 20px;
}

.view-all a {
  font-size: 14px;
  color: #333;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
}

.view-all a i {
  margin-left: 5px;
}

.view-all a:hover {
  text-decoration: underline;
}

/* Styles Responsifs */
@media (max-width: 768px) {
  .awards-grid {
    justify-content: center; /* Centrer les éléments dans la grille */
    gap: 15px; /* Réduire l'espace entre les cartes */
  }

  .award-card {
    width: 100%; /* Prendre toute la largeur disponible sur les petits écrans */
    max-width: 300px; /* Limiter la largeur pour garder un aspect correct */
  }
}
</style>
