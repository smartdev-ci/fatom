<template>
  <section class="bureau-fatom">
    <h3>BUREAU FATOM</h3>
    <div class="countries">
      <div v-for="country in countries" :key="country.name" class="country-card">
        <img :src="country.flag" :alt="`Drapeau de ${country.name}`" class="flag" />
        <div class="country-name">{{ country.name }}</div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      countries: [
        { name: "Côte d'Ivoire", flag: "/assets/flags/cote-divoire.png" },
        { name: "France", flag: "/assets/flags/france.png" },
        { name: "Bénin", flag: "/assets/flags/benin.png" },
        { name: "Niger", flag: "/assets/flags/niger.jpg" },
        { name: "Guinée", flag: "/assets/flags/guinee.svg" },
        { name: "Burkina Faso", flag: "/assets/flags/burkina-faso.jpg" },
        { name: "Mali", flag: "/assets/flags/mali.png" },
      ],
    };
  },
};
</script>

<style scoped>
.bureau-fatom {
  padding: 40px;
  background-color: #f5f5f5;
  text-align: center;
}

.bureau-fatom h3 {
  font-size: 28px;
  color: #004488;
  margin-bottom: 20px;
}

.countries {
  display: flex;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
}

.country-card {
  text-align: center;
  padding: 15px;
  border-radius: 5px;
  transition: transform 0.3s ease;
}

.flag {
  width: 100px; /* Taille du drapeau */
  height: auto;
  border-radius: 5px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);
}

.country-name {
  margin-top: 10px;
  font-size: 16px;
  font-weight: 600;
  color: #004488;
}

.country-card:hover {
  transform: scale(1.05);
}
</style>
