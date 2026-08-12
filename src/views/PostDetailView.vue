<template>
  <div>
    <LoaderComponent :isLoading="isLoading" text="FATOM" />
    <HeaderSection />
    <div class="header-section">
      <h2>ÉDUCATION</h2>
    </div>

    <!-- Main content -->
    <div v-if="!isLoading" class="main-content">
      <h1
        class="title"
        :class="{
          'blue-background': post.categories && post.categories.includes(2),
          'orange-background': post.categories && post.categories.includes(3),
          'red-background': post.categories && post.categories.includes(4),
          'green-background': post.categories && post.categories.includes(5),
        }"
      >
        {{ decodeHtmlEntities(post.title.rendered) }}
      </h1>

      <!-- Image mise en avant -->
      <div v-if="post.featuredImage" class="featured-image-container">
        <img
          :src="post.featuredImage"
          alt="Image mise en avant"
          class="image-font"
        />
      </div>

      <div class="description">
        <div v-html="cleanedContent"></div>
      </div>

      <!-- Images extraites avec pagination -->
      <div class="content-images" v-if="paginatedImages.length">
        <h3>Images du contenu :</h3>
        <div class="image-gallery">
          <img
            v-for="(image, index) in paginatedImages"
            :key="index"
            :src="image"
            alt="Image intégrée"
            class="content-image"
            @click="zoomImage(image)"
          />
        </div>
        <!-- Pagination -->
        <div class="pagination" v-if="images.length > imagesPerPage">
          <button :disabled="currentPage === 1" @click="prevPage">
            Précédent
          </button>
          <span>Page {{ currentPage }} / {{ totalPages }}</span>
          <button :disabled="currentPage === totalPages" @click="nextPage">
            Suivant
          </button>
        </div>
      </div>

      <!-- Modal pour zoom sur l'image -->
      <div v-if="isModalOpen" class="image-modal-overlay" @click="closeModal">
        <div class="image-modal-content" @click.stop>
          <img :src="zoomedImage" alt="Zoomed Image" class="zoomed-image" />
          <button class="close-button" @click="closeModal">Fermer</button>
        </div>
      </div>
    </div>

    <div v-else>
      <p>Le post n'a pas été trouvé.</p>
    </div>

    <FooterSection />
  </div>
</template>

<script>
import FooterSection from "@/components/FooterSection.vue";
import HeaderSection from "@/components/HeaderSection.vue";
import LoaderComponent from "@/components/LoaderComponent.vue";

export default {
  components: {
    HeaderSection,
    FooterSection,
    LoaderComponent,
  },
  data() {
    return {
      id: "",
      post: null,
      isLoading: true,
      images: [],
      cleanedContent: "",
      isModalOpen: false,
      zoomedImage: "",
      currentPage: 1,
      imagesPerPage: 6,
    };
  },

  computed: {
    totalPages() {
      return Math.ceil(this.images.length / this.imagesPerPage);
    },
    paginatedImages() {
      const start = (this.currentPage - 1) * this.imagesPerPage;
      const end = start + this.imagesPerPage;
      return this.images.slice(start, end);
    },
  },

  methods: {
    decodeHtmlEntities(text) {
      const doc = new DOMParser().parseFromString(text, "text/html");
      return doc.documentElement.textContent;
    },

    async fetchPostById(postId) {
      this.isLoading = true;
      try {
        const response = await fetch(
          `https://reseau.fatom.org/wp-json/wp/v2/posts/${postId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch the post");
        }

        const postData = await response.json();

        if (postData.featured_media) {
          const mediaResponse = await fetch(
            `https://reseau.fatom.org/wp-json/wp/v2/media/${postData.featured_media}`
          );
          const mediaData = await mediaResponse.json();
          postData.featuredImage = mediaData.source_url;
        }

        if (postData.categories) {
          postData.categories = postData.categories;
        }

        const parser = new DOMParser();
        const doc = parser.parseFromString(
          postData.content.rendered,
          "text/html"
        );
        const images = doc.querySelectorAll("img");

        this.images = Array.from(images).map((img) => img.src);

        images.forEach((img) => img.remove());
        this.cleanedContent = doc.body.innerHTML;

        this.post = postData;
      } catch (error) {
        console.error("Erreur lors de la récupération du post:", error);
        this.post = null;
      } finally {
        this.isLoading = false;
      }
    },

    getPostId() {
      this.id = this.$route.params.id;
    },

    zoomImage(imageUrl) {
      this.zoomedImage = imageUrl;
      this.isModalOpen = true;
    },

    closeModal() {
      this.isModalOpen = false;
      this.zoomedImage = "";
    },

    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },

    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
  },

  mounted() {
    this.getPostId();
    this.fetchPostById(this.id);
  },
};
</script>

<style scoped>
.header-section {
  background-color: #fbb03b;
  padding: 20px;
  text-align: center;
}

.header-section h2 {
  color: white;
  font-size: 24px;
  margin: 0;
}

.main-content {
  padding: 20px;
  text-align: center;
  margin-top: 2%;
}


.title {
  font-size: 32px;
  margin-bottom: 20px;
}

.blue-background {
  background-color: #77b5fe;
  color: white;
  padding: 10px;
  border-radius: 5px;
}

.orange-background {
  background-color: orange;
  color: white;
  padding: 10px;
  border-radius: 5px;
}

.red-background {
  background-color: red;
  color: white;
  padding: 10px;
  border-radius: 5px;
}

.green-background {
  background-color: green;
  color: white;
  padding: 10px;
  border-radius: 5px;
}

.featured-image-container {
  margin-bottom: 20px;
}

.image-font {
  margin: 0 auto;
  width: 70%;
  height: 80%;
  border-radius: 20px;
}

.description {
  font-size: 16px;
  text-align: justify;
  line-height: 1.5;
  margin: 0 auto;
  max-width: 800px;
}

.content-images {
  margin-top: 30px;
}

.image-gallery {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
}

.content-image {
  width: 200px;
  height: 120px;
  object-fit: cover;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.content-image:hover {
  transform: scale(1.05);
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 10px;
}

.pagination button {
  padding: 8px 16px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.pagination button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.image-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; 
}

.image-modal-content {
  width: 400px;
  height: 400px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.zoomed-image {
  width: 380px; 
  height: 380px;
  object-fit: contain;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  z-index: 10;
}

.close-button:hover {
  background-color: darkred;
}
</style>
