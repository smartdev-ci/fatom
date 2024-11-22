<!-- src/components/ReportsSection.vue -->
<template>
  <section class="reports-section">
    <h2>LES RAPPORTS DE LA FATOM</h2>
    <div class="reports-grid">
      <div class="report-card">
        <div class="report-image"></div>
        <p>2024</p>
      </div>
      <div class="report-card">
        <div class="report-image"></div>
        <p>2023</p>
      </div>
      <div class="report-card">
        <div class="report-image"></div>
        <p>2022</p>
      </div>
    </div>
    <div class="view-all">
      <a href="#">Voir tous les rapports <i class="fas fa-arrow-right"></i></a>
    </div>
  </section>
</template>

<script>
export default {};
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
  height: 150px;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 10px;
}

.report-image {
  width: 100%;
  height: 100px;
  background-color: #ccc;
  border-radius: 8px;
  margin-bottom: 10px;
}

.report-card p {
  font-size: 16px;
  font-weight: bold;
  color: #333;
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
