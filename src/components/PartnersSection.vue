<template>
  <section class="partners-section">
    <h2>LES PARTENAIRES DE LA FATOM</h2>

    <!-- Affichage du Swiper sur les écrans larges -->
    <swiper
      v-if="!isMobile && partners.length > 0"
      :slides-per-view="6"
      space-between="20"
      :loop="true"
      :autoplay="{ delay: 3000, disableOnInteraction: false }"
      class="partners-swiper"
    >
      <swiper-slide v-for="partner in partners" :key="partner.id" class="partner-slide">
        <div class="partner-card">
          <a :href="partner.url" target="_blank" rel="noopener noreferrer">
            <img :src="partner.image" :alt="partner.alt" class="partner-image" />
          </a>
          <span class="partner-name">{{ partner.name }}</span>
        </div>
      </swiper-slide>
    </swiper>

    <!-- Swiper pour les petits écrans -->
    <swiper
      v-else-if="isMobile && partners.length > 0"
      :slides-per-view="2"
      space-between="10"
      :loop="true"
      :autoplay="{ delay: 3000, disableOnInteraction: false }"
      class="partners-swiper-mobile"
    >
      <swiper-slide v-for="partner in partners" :key="partner.id" class="partner-slide">
        <div class="partner-card">
          <a :href="partner.url" target="_blank" rel="noopener noreferrer">
            <img :src="partner.image" :alt="partner.alt" class="partner-image" />
          </a>
        </div>
      </swiper-slide>
    </swiper>

    <div class="view-all">
      <router-link to="/partners" class="nav-link" exact-active-class="active-link">TOUS LES PARTENAIRES  <i class="fas fa-arrow-right"></i></router-link>
    </div>
  </section>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';
import { mapState } from 'vuex';

export default {
  components: {
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      isMobile: false
    };
  },
  computed: {
    ...mapState(['partners'])
  },
  mounted() {
    this.checkScreenSize();
    window.addEventListener('resize', this.checkScreenSize);
    this.$store.dispatch('fetchPartners');
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkScreenSize);
  },
  methods: {
    checkScreenSize() {
      this.isMobile = window.innerWidth <= 768;
    }
  }
};
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

.partners-swiper,
.partners-swiper-mobile {
  padding: 20px 0;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.partner-slide {
  display: flex;
  justify-content: center;
  align-items: center;
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
  width: 100%;
  height: auto;
  border-radius: 8px;
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

/* Styles spécifiques aux petits écrans */
.partners-swiper-mobile {
  padding: 20px 0;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .partners-swiper-mobile .partner-card {
    width: 120px;
    height: 80px;
  }

  .view-all a {
    font-size: 16px;
    color: white;
  }
}
</style>