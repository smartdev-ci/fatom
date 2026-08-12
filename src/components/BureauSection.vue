<template>
  <section class="bureau-fatom">
    <h3>BUREAU FATOM</h3>
    <div class="countries">
      <div
        v-for="country in countries"
        :key="country.id"
        class="country-card"
        @click="goToCategoryPosts(country.id)"
      >
        <img
          :src="country.flag"
          :alt="`Drapeau de ${country.name}`"
          class="flag"
        />
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
        // { id: 15, name: "France", flag: "/assets/flags/france.png", url: "https://example.com/france" },
        { id: 17, name: "Bénin", flag: "/assets/flags/benin.png", url: "https://example.com/benin" },
        { id: 18, name: "Niger", flag: "/assets/flags/niger.jpg", url: "https://example.com/niger" },
        // { id: 30, name: "Guinée", flag: "/assets/flags/guinee.png", url: "https://example.com/guinee" },
        { id: 16, name: "Burkina Faso", flag: "/assets/flags/burkina-faso.jpg", url: "https://example.com/burkina-faso" },
        { id: 19, name: "Mali", flag: "/assets/flags/mali.png", url: "https://example.com/mali" },
      ],
    };
  },
  methods: {
    goToCategoryPosts(categoryId) {
      this.$router.push({
        name: "PostByCategoryView",
        params: { categoryId: categoryId },
      });
    },
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
  cursor: pointer;
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
