<template>
  <div>
    <!-- Afficher le preloader tant que la page est en cours de chargement -->
    <div v-if="isLoading" class="loadingScreen">
      <h3 class="loadingScreen__text">
        <span class="loadingScreen__text__span">F</span>
        <span class="loadingScreen__text__span">A</span>
        <span class="loadingScreen__text__span">T</span>
        <span class="loadingScreen__text__span">O</span>
        <span class="loadingScreen__text__span">M</span>
      </h3>
    </div>

    <HeaderSection />
    <HeroSection :backgroundImage="'https://zupimages.net/up/24/43/68dg.jpg'"/>
    <DescriptionSection />
    <BureauSection />
    <ActivitiesSection />
    <PartnersSection />
    <AwardsSection />
    <ReportsSection />
    <FooterSection />
  </div>
</template>

<script>
import HeaderSection from "../components/HeaderSection.vue";
import HeroSection from "../components/HeroSection.vue";
import BureauSection from "../components/BureauSection.vue";
import ActivitiesSection from "../components/ActivitiesSection.vue";
import FooterSection from "../components/FooterSection.vue";
import ReportsSection from "@/components/ReportsSection.vue";
import AwardsSection from "@/components/AwardsSection.vue";
import PartnersSection from "@/components/PartnersSection.vue";
import DescriptionSection from "@/components/descriptionSection.vue";
import { mapState } from "vuex";

export default {
  components: {
    HeaderSection,
    HeroSection,
    BureauSection,
    ActivitiesSection,
    AwardsSection,
    ReportsSection,
    PartnersSection,
    FooterSection,
    DescriptionSection,
  },
  computed: {
    ...mapState({
      reports: state => state.reports,
      recentActivities: state => state.recentActivities
    })
  },
  data() {
    return {
      isLoading: true
    };
  },
  watch: {
    reports() {
      this.checkLoading();
    },
    recentActivities() {
      this.checkLoading();
    }
  },
  created() {
    this.$store.dispatch("fetchReports");
    this.$store.dispatch("fetchRecentActivities");
  },
  methods: {
    checkLoading() {
      // Si les rapports et les activités sont chargés, on arrête le loader
      if (this.reports.length > 0 && this.recentActivities.length > 0) {
        this.isLoading = false;
      }
    }
  }
};
</script>

<style scoped>

 body {
  font-family: 'Open Sans', sans-serif;
  font-weight: 800;
}

/* =========================================
 LoadingScreen
 =========================================*/

.loadingScreen {
  position: fixed;
  height: 100%;
  width: 100%;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 900000;
  overflow: hidden;
  background: #fff;
}

.loadingScreen__text {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  text-align: center;
  width: auto;
  height: 100px;
  color: #ddd;
  text-transform: uppercase;
  font-size: 30px;
}

.loadingScreen__text__span {
  display: inline-block;
  padding: 5px;
  vertical-align: middle;
  animation-name: charColor;
  animation-iteration-count: infinite;
  animation-duration: 1s;
  animation-delay: 100ms;
  animation-timing-function: ease;
  animation-fill-mode: both;
  backface-visibility: hidden;
}

@keyframes charColor {
  0% {
    color: #cccccc; /* Lighten the color */
  }
  50% {
    color: #5c5c5c; /* Main feature color */
  }
  100% {
    color: #cccccc; /* Lighten the color */
  }
}

/* To add delays to each span */
.loadingScreen__text__span:nth-child(1) {
  animation-delay: 100ms;
}
.loadingScreen__text__span:nth-child(2) {
  animation-delay: 200ms;
}
.loadingScreen__text__span:nth-child(3) {
  animation-delay: 300ms;
}
.loadingScreen__text__span:nth-child(4) {
  animation-delay: 400ms;
}
.loadingScreen__text__span:nth-child(5) {
  animation-delay: 500ms;
}
.loadingScreen__text__span:nth-child(6) {
  animation-delay: 600ms;
}
.loadingScreen__text__span:nth-child(7) {
  animation-delay: 700ms;
}
.loadingScreen__text__span:nth-child(8) {
  animation-delay: 800ms;
}
.loadingScreen__text__span:nth-child(9) {
  animation-delay: 900ms;
}
</style>
