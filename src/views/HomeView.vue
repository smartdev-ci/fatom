<template>
  <div>
    <HeaderSection />
    <HeroSection />
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
  },
};
</script>

<style>
/* Ajoute les styles ici ou dans les composants enfants */
</style>