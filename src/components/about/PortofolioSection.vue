<template>
    <section id="fh5co-portfolio">
      <div class="container">
        <div class="row">
          <div class="col-md-6 col-md-offset-3 text-center heading-section animate-box">
            <h3>Activités récentes</h3>
          </div>
        </div>
        <div class="row row-bottom-padded-md">
          <div class="col-md-12">
            <ul id="fh5co-portfolio-list">
              <li class="two-third animate-box" data-animate-effect="fadeIn" :style="{ backgroundImage: 'url(images/lycee.jpg)' }">
                <a href="#" class="color-3">
                  <div class="case-studies-summary">
                    <span>ÉDUCATION/SANTÉ</span>
                    <h2>Journée de sensibilisation au Lycée vert de Godiabré</h2>
                  </div>
                </a>
              </li>
              <!-- Répétez pour les autres activités -->
            </ul>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    name: 'Portfolio'
  };
  </script>
  
  <style scoped>
  /* Ajouter les styles spécifiques pour le composant Portfolio */
  </style>
  