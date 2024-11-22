<!-- src/components/HeroSection.vue -->
<template>
  <section class="hero">
    <div class="overlay">
      <div class="hero-content">
        <h1>POUR LE BIEN-ÊTRE DES POPULATIONS VULNÉRABLES</h1>
        <p class="description">
          La Fondation ATEF OMAIS (FATOM) est une association apolitique, non confessionnelle et à but non lucratif qui soutient le développement humain durable à travers nos projets et programmes de bienfaisance.
        </p>
        <a href="#" class="cta-btn">En savoir plus</a>
      </div>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style scoped>
.hero {
  height: 600px;
  background-image: url('children_which_smile.jpg'); /* Mettre ici le chemin vers l'image */
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.overlay {
  background-color: rgba(0, 0, 0, 0.5); /* Pour l'effet foncé */
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-content {
  text-align: center;
  color: #fff;
  max-width: 800px;
  padding: 20px;
}

.hero-content h1 {
  font-size: 48px;
  margin-bottom: 20px;
  line-height: 1.2;
}

.hero-content .description {
  font-size: 18px;
  margin-bottom: 30px;
}

.cta-btn {
  text-decoration: none;
  padding: 10px 20px;
  background-color: #ff9800;
  color: #fff;
  font-size: 16px;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.cta-btn:hover {
  background-color: #e68900;
}
</style>
