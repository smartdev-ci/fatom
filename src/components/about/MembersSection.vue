<template>
  <div class="members-section">
    <h2>Les membres</h2>
    <p class="intro">
      La FATOM mobilise le secteur privé pour améliorer les services sociaux et
      culturels, se concentrant sur la santé, l'éducation, la culture et
      l'environnement, au bénéfice des populations vulnérables, surtout les
      femmes.
    </p>
    <hr class="separator" />
    <div class="members-cards">
      <MemberCard
        v-if="president"
        :name="president.name"
        :title="president.title"
        :image="president.image"
        :message="president.message"
      />
      <MemberCard
        v-if="secretaire"
        :name="secretaire.name"
        :title="secretaire.title"
        :image="secretaire.image"
        :message="secretaire.message"
      />
      <MemberCard
        v-if="tresorier"
        :name="tresorier.name"
        :title="tresorier.title"
        :image="tresorier.image"
        :message="tresorier.message"
      />
    </div>
  </div>
</template>

<script>
import MemberCard from "./MemberCard.vue";
import he from "he";

export default {
  components: {
    MemberCard,
  },

  data() {
    return {
      president: null,
      secretaire: null,
      tresorier: null,
    };
  },

  async mounted() {
    await this.fetchPresident();
    await this.fetchSecretaire();
    await this.fetchTresorier();
  },

  methods: {
    async fetchPresident() {
      try {
        const response = await fetch(
          "https://reseau.fatom.org/wp-json/wp/v2/posts?categories=27&per_page=10",
        );

        if (!response.ok) {
          throw new Error("Erreur API WordPress");
        }

        const posts = await response.json();

        // On cherche le post dont le titre est "Direction"
        const directionPost = posts.find(
          (post) => post.title.rendered.trim() === "La présidente",
        );

        if (!directionPost) return;

        // Récupération image si existe
        let image = null;

        if (directionPost.featured_media) {
          const mediaRes = await fetch(
            `https://reseau.fatom.org/wp-json/wp/v2/media/${directionPost.featured_media}`,
          );

          if (mediaRes.ok) {
            const media = await mediaRes.json();
            image = media.source_url;
          }
        }

        this.president = {
          name: "Mme Zanouba OMAIS", // ou dynamique si tu veux aussi le gérer via WP
          title: "Présidente",
          image: image || "img/presidente.png",
          message: he.decode(directionPost.excerpt.rendered.replace(/<[^>]+>/g, "")),
        };
      } catch (error) {
        console.error(error);
      }
    },
    async fetchSecretaire() {
      try {
        const response = await fetch(
          "https://reseau.fatom.org/wp-json/wp/v2/posts?categories=27&per_page=10"
        );

        if (!response.ok) {
          throw new Error("Erreur API WordPress");
        }

        const posts = await response.json();

        // On cherche le post dont le titre est "Secrétaire"
        const secretairePost = posts.find(
          (post) => post.title.rendered.trim() === "Secrétaire Général"
        );

        if (!secretairePost) return;

        // Récupération image si existe
        let image = null;

        if (secretairePost.featured_media) {
          const mediaRes = await fetch(
            `https://reseau.fatom.org/wp-json/wp/v2/media/${secretairePost.featured_media}`
          );

          if (mediaRes.ok) {
            const media = await mediaRes.json();
            image = media.source_url;
          }
        }

        this.secretaire = {
          name: "M. Ramzi OMAIS", // ou dynamique si tu veux aussi le gérer via WP
          title: "Secrétaire Générale",
          image: image || "img/sg.jpg",
          message: he.decode(secretairePost.excerpt.rendered.replace(/<[^>]+>/g, "")),
        };
      } catch (error) {
        console.error(error);
      }
    },
    async fetchTresorier() {
      try {
        const response = await fetch(
          "https://reseau.fatom.org/wp-json/wp/v2/posts?categories=27&per_page=10"
        );

        if (!response.ok) {
          throw new Error("Erreur API WordPress");
        }

        const posts = await response.json();

        // On cherche le post dont le titre est "Trésorier"
        const tresorierPost = posts.find(
          (post) => post.title.rendered.trim() === "Le trésorier"
        );

        if (!tresorierPost) return;

        // Récupération image si existe
        let image = null;

        if (tresorierPost.featured_media) {
          const mediaRes = await fetch(
            `https://reseau.fatom.org/wp-json/wp/v2/media/${tresorierPost.featured_media}`
          );

          if (mediaRes.ok) {
            const media = await mediaRes.json();
            image = media.source_url;
          }
        }

        this.tresorier = {
          name: "M. Ahmed OMAIS",
          title: "Trésorier Général Adjoint",
          image: image || "img/tga.jpg",
          message: he.decode(tresorierPost.excerpt.rendered.replace(/<[^>]+>/g, "")),
        };
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
.members-section {
  text-align: center;
  margin: 20px;
}

.intro {
  font-size: 16px;
  color: #555;
  margin: 10px auto;
  max-width: 600px;
}

.separator {
  width: 50px;
  border: none;
  border-top: 2px solid #d9534f;
  margin: 20px auto;
}

.members-cards {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap; /* Permet d'afficher les cartes sur plusieurs lignes */
  margin-top: 20px;
}

@media (max-width: 768px) {
  .members-cards {
    display: flex;
    flex-direction: column; /* Changer la direction en colonne sur petit écran */
    align-items: center; /* Centrer les cartes */
  }

  .members-cards > * {
    width: 80%; /* Largeur des cartes sur petits écrans */
    margin-bottom: 20px; /* Espacement entre les cartes */
  }
}
</style>
