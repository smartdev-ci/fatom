<template>
  <section id="fh5co-feature-product" class="fh5co-section-gray">
    <div class="container">
      <div class="row">
        <div class="col-md-12 text-center heading-section">
          <h3>LA FATOM</h3>
          <div class="text-justify">
            La Fondation ATEF OMAÏS (FATOM) est une organisation apolitique, non
            confessionnelle et à but non lucratif dédiée au soutien du
            développement humain durable. Nous nous engageons à réinvestir
            intégralement tous les produits et bénéfices de nos activités de
            collecte de fonds dans des actions visant à aider les populations
            les plus vulnérables. Nos initiatives de développement incluent :
            <ul>
              <li>
                Soutien aux services sociaux de base tels que la santé,
                l'éducation et l'environnement, avec un accent particulier sur
                l'hygiène et l'assainissement. Nous cherchons également à
                renforcer la gouvernance économique en favorisant une
                participation plus active du secteur privé.
              </li>
              <li>
                Promotion de la culture, de l'art et du riche patrimoine
                ivoirien, contribuant ainsi à préserver et à valoriser
                l'identité culturelle de la région.
              </li>
              <li>
                Renforcement des capacités des investisseurs, des partenaires et
                de leur personnel en leur offrant une meilleure compréhension
                des cadres institutionnels et opérationnels nécessaires pour
                intervenir efficacement dans les domaines du développement
                social et de l'urgence humanitaire. À travers ces actions, nous
                visons à créer un impact positif et durable dans les communautés
                que nous servons, en favorisant leur autonomie et leur
                bien-être.
              </li>
            </ul>
          </div>
          <BureauSection />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import BureauSection from "@/components/BureauSection.vue";
export default {
  name: "FeatureProduct",
  components: {
    BureauSection,
  },
};
</script>

<style scoped>
.text-justify {
  text-align: justify;
}

.container {
  margin: 0 auto;
  padding: 20px;
}
/* Ajouter les styles spécifiques pour le composant FeatureProduct */
</style>
