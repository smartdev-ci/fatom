<template>
  <section class="awards-section">
    <h2>LES RÉCOMPENSES DE LA FATOM</h2>
    <swiper
      :slides-per-view="4"
      :space-between="20"
      :breakpoints="breakpoints"
      class="awards-grid"
      :pagination="{ clickable: true }"
    >
      <swiper-slide 
        v-for="(award, index) in rewards" 
        :key="index" 
        class="award-card"
        @click="openModal(award)"
      >
        <div class="award-image" :style="{ backgroundImage: `url(${award.image})` }"></div>
        <div class="award-name" v-html="award.title"></div>
      </swiper-slide>
    </swiper>
    <div class="view-all">
      <!-- <a href="#">Voir toutes les récompenses <i class="fas fa-arrow-right"></i></a> -->
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <img :src="selectedAward.image" alt="Award Image" />
        <button class="close-button" @click="closeModal">Fermer</button>
      </div>
    </div>
  </section>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper-bundle.css";
import { mapState, mapActions } from "vuex";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      showModal: false,
      selectedAward: null,
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        480: {
          slidesPerView: 2,
          spaceBetween: 15,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
      },
    };
  },
  computed: {
    ...mapState(["rewards"]), // Récupération des données depuis Vuex
  },
  methods: {
    // ...mapActions("fetchRewards"), // Action pour charger les données
    openModal(award) {
      this.selectedAward = award;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.selectedAward = null;
    },
  },
  created() {
    // Charger les récompenses lors de l'initialisation
    this.$store.dispatch("fetchRewards");
  },
};
</script>

<style scoped>
/* Styles identiques à votre version précédente */
.awards-section {
  padding: 20px;
  text-align: center;
  background-color: #fff;
  color: #333;
}

.awards-section h2 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

/* Carte des récompenses */
.award-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s;
  padding: 10px;
}

.award-card:hover {
  transform: translateY(-5px);
}

.award-image {
  width: 100%;
  height: 150px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}

.award-name {
  margin-top: 10px;
  font-size: 14px;
  color: #333;
  text-align: center;
  font-weight: bold;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  max-width: 500px;
  width: 90%;
  position: relative;
}

.modal-content img {
  width: 100%;
  height: auto;
  max-height: 300px;
  object-fit: contain;
}

.close-button {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #ff9800;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
}

.close-button:hover {
  background-color: #e67e00;
}
</style>