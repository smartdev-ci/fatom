<template>
  <section class="description-text">
    <h3 class="title-hub"> LA FONDATION ATEF OMAIS </h3>
    <p class="description">
      La Fondation ATEF OMAÏS (FATOM) est une association apolitique, non
      confessionnelle et à but non lucratif qui soutient le développement humain
      durable en reversant tous les produits et bénéfices de la mobilisation des
      ressources financières dans des actions au profit des populations
      vulnérables. Ces actions au développement sont :
    </p>

    <ol class="description-list">
      <li>
        L'appui aux renforcements des services sociaux de base (santé,
        éducation, environnement : hygiène et assainissement) et de la
        gouvernance économique par une participation plus accrue du secteur
        privé,
      </li>
      <li>La promotion de la culture, de l'art et du patrimoine ivoirien,</li>
      <li>
        Le renforcement des capacités des investisseurs, partenaires et de
        leur personnel pour une meilleure connaissance des cadres
        institutionnels et opérationnels d'intervention dans les domaines du
        développement social et de l'urgence humanitaire. Les ONGs nationales
        et internationales qui interviennent en Côte d'Ivoire dans les
        domaines d'intervention de la FATOM peuvent envoyer les appels à
        proposition selon le canevas à télécharger sur le site.
      </li>
    </ol>
  </section>
</template>

<script>
export default {};
</script>

<style scoped>

@font-face {
  font-family: 'Resolve Sans';
  src: url('@/assets/fonts/Resolve-Light.otf') format('otf');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

.description-text {
  /* max-width: 800px; */
  margin: 0 auto 4rem;
  padding: 5%;
  background-color: white;
  color: black;
  font-family: 'Resolve Sans', sans-serif;
}

p.description {
  text-align: center;
  letter-spacing: .2px;
  margin: 0 0 1.5rem;
  font-size: 1.15rem;
  line-height: 1.5;
}

.description-list {
  text-align: left;
  letter-spacing: .2px;
  font-size: 1.15rem;
  line-height: 1.5;
  margin: 0;
  padding-left: 1.4rem;
}

.description-list li {
  margin-bottom: 1rem;
}

.description-list li:last-child {
  margin-bottom: 0;
}

h3.title-hub {
  font-family: 'Resolve Sans', sans-serif;
    max-width: 80rem;
    color: #004488;
   
    text-align: center;
    margin: 0 auto 2rem;
    padding: 0 2rem;
    font-size: 4rem;
    font-weight: 700;
    line-height: 1.4;
}

</style>