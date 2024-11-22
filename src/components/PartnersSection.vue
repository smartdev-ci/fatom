<template>
  <section class="partners-section">
    <h2>LES PARTENAIRES DE LA FATOM</h2>
    <div class="partners-grid">
      <div class="partner-card">
        <div class="partner-image"></div>
      </div>
      <div class="partner-card">
        <div class="partner-image"></div>
      </div>
      <div class="partner-card">
        <div class="partner-image"></div>
      </div>
      <div class="partner-card">
        <div class="partner-image"></div>
      </div>
      <div class="partner-card">
        <div class="partner-image"></div>
      </div>
      <div class="partner-card">
        <div class="partner-image"></div>
      </div>
    </div>
    <div class="view-all">
      <a href="#">Voir tous les partenaires <i class="fas fa-arrow-right"></i></a>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style scoped>
.partners-section {
  padding: 40px 0;
  text-align: center;
  background-color: #f8f8f8;
  color: #333;
}

.partners-section h2 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.partners-grid {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

.partner-card {
  width: 150px;
  height: 100px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.partner-image {
  width: 80%;
  height: 80%;
  background-color: #ccc; /* Placeholder for partner logos */
  border-radius: 8px;
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
</style>
