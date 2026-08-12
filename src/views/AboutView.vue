<template>
  <div>
    <HeaderSection />
    <HeroSection :backgroundImage="'https://zupimages.net/up/24/44/w78w.jpg'" />
    <div class="main-content">
      <div class="description">
        <FeatureProductSection />
      </div>
      <hr class="cta-btn" />
      <div class="description gallerie">
        <ImageGalerieSection />
      </div>
      <div class="description last-activities">
        <!-- <PortofolioSection /> -->
      </div>
        <hr class="cta-btn" />
        <div class="description members">
          <MembersSection />
        </div>
    </div>
    <FooterSection />
  </div>
</template>

<script>
import HeaderSection from "../components/HeaderSection.vue";
import HeroSection from "../components/HeroSection.vue";
import FooterSection from "../components/FooterSection.vue";
import BureauSection from "@/components/BureauSection.vue";
import FeatureProductSection from "@/components/about/FeatureProductSection.vue";
import PortofolioSection from "@/components/about/PortofolioSection.vue";
import MembersSection from "@/components/about/MembersSection.vue";
import ImageGalerieSection from "@/components/about/ImageGalerieSection.vue";

export default {
  components: {
    HeaderSection,
    HeroSection,
    BureauSection,
    FooterSection,
    FeatureProductSection,
    PortofolioSection,
    MembersSection,
    ImageGalerieSection,
  },
};
</script>

<style>
.cta-btn {
  text-decoration: none;
  border: none;
  width: 15%;
  height: 5px;
  margin: 0 auto;
  background-color: #ff9800;
  border-radius: 5px;
}

.description {
  margin-bottom: 10px;
}
</style>
