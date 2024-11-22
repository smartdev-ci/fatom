<!-- src/components/RecentActivities.vue -->
<template>
  <section class="recent-activities">
    <h3>LES ACTIVITÉS RÉCENTES DE LA FATOM</h3>
    <div class="activities-wrapper">
      <div class="activity-card" v-for="activity in activities" :key="activity.id">
        <img :src="activity.image" alt="Image de l'activité" class="activity-image" />
        <div class="activity-info">
          <h4>{{ activity.title }}</h4>
          <p>{{ activity.date }}</p>
          <p>{{ activity.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      activities: [
        {
          id: 1,
          title: "Santé",
          date: "12 Octobre 2023",
          description: "Cérémonie d'ouverture d'un nouveau centre de santé en Côte d'Ivoire.",
          image: "path_to_image1.jpg",
        },
        {
          id: 2,
          title: "Éducation",
          date: "20 Septembre 2023",
          description: "Distribution de fournitures scolaires aux élèves dans les zones rurales.",
          image: "path_to_image2.jpg",
        },
        {
          id: 3,
          title: "Culture",
          date: "5 Août 2023",
          description: "Organisation d'un festival culturel à Abidjan.",
          image: "path_to_image3.jpg",
        },
      ],
    };
  },
};
</script>

<style scoped>
.recent-activities {
  background-color: #ffffff;
  padding: 40px;
  text-align: center;
}

.recent-activities h3 {
  font-size: 28px;
  color: #004488;
  margin-bottom: 30px;
  font-weight: bold;
}

.activities-wrapper {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

.activity-card {
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.activity-card:hover {
  transform: translateY(-10px);
}

.activity-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 10px 10px 0 0;
}

.activity-info {
  text-align: left;
  padding: 15px;
}

.activity-info h4 {
  font-size: 20px;
  color: #004488;
  margin-bottom: 10px;
}

.activity-info p {
  font-size: 14px;
  color: #666666;
  margin: 5px 0;
}
</style>
