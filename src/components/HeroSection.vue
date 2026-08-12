<template>
  <section class="hero" :style="heroBackground">
    <div class="overlay">
      <div class="hero-content">
        <hr class="cta-btn">
        <h1>{{ heroTitle }}</h1>
        <p>{{ heroDescription }}</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "HeroSection",
  props: {
    backgroundImage: {
      type: String,
      required: true,
    },
  },
  computed: {
    heroBackground() {
      return {
        backgroundImage: `url(${this.backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      };
    },
    heroTitle() {
      switch (this.$route.name) {
        case "home":
          return "POUR LE BIEN-ÊTRE DES POPULATIONS VULNÉRABLES";
        case "about":
          return "QUI SOMMES-NOUS ?";
        case "contacts":
          return "CONTACTEZ-NOUS";
        case "partners":
          return "NOS PARTENAIRES";
        case "rapports":
          return "RAPPORTS D'ACTIVITES";
        case "activities":
          return "NOS ACTIVITÉS";
        default:
          return "BIENVENUE";
      }
    },
    heroDescription() {
      switch (this.$route.name) {
        case "home":
          return "Nous mettons tout en œuvre pour améliorer la qualité de vie des populations vulnérables à travers divers programmes de soutien.";
        case "about":
          return "Découvrez qui nous sommes, nos valeurs et notre engagement envers les populations vulnérables.";
        case "contacts":
          return "N'hésitez pas à nous contacter pour toute question ou demande d'information. Nous sommes là pour vous aider.";
        case "partners":
          return "Nos partenaires jouent un rôle essentiel dans la réalisation de nos projets. Découvrez-les.";
        case "activities":
          return "Nos activités sont diverses et axées sur le développement durable, l'éducation et la santé.";
        case "rapports":
          return "Consultez et téléchargez nos rapports détaillés pour découvrir l'impact de nos actions et initiatives sur le terrain.";
        default:
          return "Nous vous invitons à découvrir notre mission et nos initiatives pour un avenir meilleur.";
      }
    },
  },
};
</script>

<style scoped>
.hero {
  margin-top:9%;
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.overlay {
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-content {
  text-align: center;
  color: #fff;
}

.hero-content h1 {
  font-size: 48px;
  margin-bottom: 20px;
  line-height: 1.2;
}

.hero-content p {
  font-size: 18px;
  margin-top: 20px;
}

.cta-btn {
  text-decoration: none;
  border: none;
  width: 15%;
  height: 5px;
  margin: 0 auto;
  background-color: #ff9800;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.cta-btn:hover {
  background-color: #e68900;
}
</style>
