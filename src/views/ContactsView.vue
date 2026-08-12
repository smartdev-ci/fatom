<template>
  <div>
    <HeaderSection />
    <HeroSection :backgroundImage="'https://zupimages.net/up/24/43/68dg.jpg'" />
    <div class="header">
      <div class="info-block" v-for="(info, index) in contactInfo" :key="index">
        <span class="icon">{{ info.icon }}</span>
        <h3>{{ info.title }}</h3>
        <p v-for="(line, lineIndex) in info.details" :key="lineIndex">
          {{ line }}
        </p>
      </div>
    </div>

    <div class="form-map">
      <!-- Contact form -->
      <div class="contact-form">
        <form @submit.prevent="submitForm">
          <div class="form-field">
            <label for="email">Email</label>
            <input
              type="email"
              v-model="email"
              required
              placeholder="Saisir votre adresse e-mail"
            />
            <input v-model="website" type="text" style="display:none" />
          </div>
          <div class="form-field">
            <label for="name">Nom complet</label>
            <input
              type="text"
              v-model="name"
              required
              placeholder="Saisir votre nom"
            />
          </div>
          <div class="form-field">
            <label for="message">Message</label>
            <textarea
              v-model="message"
              required
              placeholder="Laissez-nous un message..."
            ></textarea>
          </div>
          <button type="submit" :disabled="loading">
            <span v-if="loading" class="spinner"></span>
            <span v-if="!loading">Envoyer</span>
          </button>
        </form>
      </div>
    </div>
    <FooterSection />
  </div>
</template>

<script>
import HeaderSection from "../components/HeaderSection.vue";
import HeroSection from "../components/HeroSection.vue";
import FooterSection from "../components/FooterSection.vue";

export default {
  components: {
    HeaderSection,
    HeroSection,
    FooterSection,
  },

  data() {
    return {
      email: "",
      name: "",
      message: "",
      loading: false,
      contactInfo: [
        {
          icon: "📍",
          title: "Localisation",
          details: ["Abidjan-Côte d'Ivoire, Hôtel Tiama"],
        },
        {
          icon: "📞",
          title: "Contacts",
          details: ["(+225) 27 20 31 39 54"],
        },
        {
          icon: "📠",
          title: "Boite Postale",
          details: ["04 BP 643 Abidjan"],
        },
        {
          icon: "✉️",
          title: "EMAIL",
          details: ["fondation@fatom.org"],
        },
      ],
    };
  },
  methods: {
    async submitForm() {
      if (!this.email || !this.name || !this.message) {
        alert("Veuillez remplir tous les champs.");
        return;
      }

      this.loading = true;

      try {
        const response = await fetch(
          "https://reseau.fatom.org/wp-json/fatom/v1/contact",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: this.email,
              name: this.name,
              message: this.message,
            }),
          },
        );

        const data = await response.json();

        if (response.ok && data.success) {
          alert("Message envoyé avec succès !");
          this.clearForm();
        } else {
          alert(data.message || "Erreur lors de l'envoi");
        }
      } catch (error) {
        alert("Erreur réseau. Veuillez réessayer.");
      } finally {
        this.loading = false;
      }
    },
    clearForm() {
      this.email = "";
      this.name = "";
      this.message = "";
    },
  },
};
</script>

<style scoped>
/* Container for contact section */
.contact-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-image: url("/path-to-background.jpg"); /* Optionally add a background image */
  background-size: cover;
}

/* Header styling for contact details */
.header {
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1200px;
  margin-bottom: 20px;
}

.info-block {
  text-align: center;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin: 10px;
  flex: 1;
  min-width: 250px;

  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.info-block:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.icon {
  font-size: 30px;
  margin-bottom: 10px;
}

.form-map {
  display: flex;
  justify-content: center;
  padding: 20px;
}

.icon {
  font-size: 30px;
  margin-bottom: 10px;
}

/* Styling for contact form */
.contact-form {
  background-color: #000;
  color: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 100%;
  max-width: 600px;
  margin-bottom: 20px;
}

.form-field {
  margin-bottom: 15px;
}

.form-field input,
.form-field textarea {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: none;
  border-radius: 5px;
  outline: none;
}

button {
  padding: 10px 20px;
  background-color: #fff;
  color: #000;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #f3f3f3;
}

/* Google Maps iframe container */
.map {
  width: 100%;
  max-width: 1200px;
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid #ccc;
  border-top: 2px solid #000;
  border-radius: 50%;
  display: inline-block;
  animation: spin 0.8s linear infinite;
  margin-right: 8px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
