<template>
  <section class="recent-activities">
    <h3>LES ACTIVITÉS RÉCENTES DE LA FATOM</h3>
    <div class="activities-wrapper">
      <div class="activity-card" v-for="activity in recentActivities" :key="activity.id">
        <img
          :src="activity.featuredImage"
          alt="Image de l'activité"
          class="activity-image"
          @click="goToActivity(activity.id)"
        />
        <div class="activity-info">
          <h4 class="no-link">  <router-link :to="`/post/${activity.id}`">{{ decodeHtmlEntities(activity.title).toUpperCase() }} </router-link></h4>
          <!-- <p>{{ activity.date }}</p> -->
          <p class="activity-title"> {{ decodeHtmlEntities(activity.excerpt) }} </p>
          <!-- <p class="category">Catégorie : {{ activity.categoryName }}</p>6 -->
        </div>
      </div>
    </div>
    <div class="view-all">
      <router-link
        to="/activities"
        class="nav-link"
        exact-active-class="active-link"
        >TOUTES NOS ACTIVITES <i class="fas fa-arrow-right"></i
      ></router-link>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      recentActivities: (state) => state.recentActivities
    }),
  },
  methods: {
    decodeHtmlEntities(text) {
      const doc = new DOMParser().parseFromString(text, "text/html");
      return doc.documentElement.textContent;
    },
    goToActivity(activityId) {
      this.$router.push(`/post/${activityId}`);
    }
  },
  created() {
    this.$store.dispatch("fetchRecentActivities");
  }
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

h4.no-link {
  a {
    text-decoration: none;
    color: #004488;
  }
  
}

p.activity-title {
  text-align: justify;
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
  cursor: pointer;
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

.category {
  font-size: 13px;
  font-weight: bold;
  color: #444;
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
