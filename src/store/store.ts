import axios from "axios";
import { createStore } from "vuex";

export default createStore({
  state: {
    categories: [],
    posts: [],
    all_posts: [],
    reports: [],
    latest_reports: [],
    recentActivities: [],
    rewards: [],
    partners: [],
  },
  getters: {},
  mutations: {
    SET_REWARDS(state, rewards) {
      state.rewards = rewards;
    },
    SET_POSTS(state, posts) {
      state.posts = posts;
    },
    SET_ALL_POSTS(state, all_posts) {
      state.all_posts = all_posts;
    },
    SET_CATEGORIES(state, categories) {
      state.categories = categories
        .filter((category) => [2, 3, 4, 5].includes(Number(category.id)))
        .sort((a, b) => a.id - b.id);
    },
    SET_REPORTS(state, reports) {
      const filteredReports = reports.filter((report) => report.name);
      state.reports = filteredReports.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
    },
    SET_RECENT_ACTIVITIES(state, activities) {
      state.recentActivities = activities;
    },
    SET_LAST_REPORTS(state, latest_reports) {
      state.reports = latest_reports;
    },
    SET_POSTS_BY_CATEGORY(state, posts) {
      state.posts = posts;
    },
    SET_PARTNERS(state, partners) {
      state.partners = partners;
    },
  },
  actions: {
    async fetchAllPosts({ commit }) {
      try {
        // 1️⃣ Définir les catégories à inclure dans la requête
        const categories = [2, 3, 4, 5, 15, 16, 17, 18, 19, 23].join(",");
        const response = await fetch(
          `https://reseau.fatom.org/wp-json/wp/v2/posts?per_page=100&categories=${categories}`,
        );

        if (!response.ok)
          throw new Error("Erreur lors de la récupération des posts");

        const data = await response.json();

        // 2️⃣ Trier les articles par date de publication (du plus récent au plus ancien)
        data.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );

        // 3️⃣ Récupérer les détails des articles
        const postsWithDetails = await Promise.all(
          data.map(async (post) => {
            let featuredImage = null;

            if (post.featured_media) {
              try {
                const mediaResponse = await fetch(
                  `https://reseau.fatom.org/wp-json/wp/v2/media/${post.featured_media}`,
                );
                const mediaData = await mediaResponse.json();
                featuredImage = mediaData.source_url || null;
              } catch (error) {
                console.error(
                  `Erreur lors de la récupération de l'image pour le post ${post.id}:`,
                  error,
                );
              }
            }

            return {
              id: post.id,
              title: post.title.rendered,
              date: new Date(post.date).toLocaleDateString("fr-FR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }),
              excerpt: post.excerpt.rendered.replace(/<[^>]+>/g, ""),
              featuredImage,
            };
          }),
        );

        console.log("Les activités triées par date :", postsWithDetails);

        // 4️⃣ Mettre à jour le store Vuex
        commit("SET_ALL_POSTS", postsWithDetails);
      } catch (error) {
        console.error("Erreur lors de la récupération des posts :", error);
      }
    },

    async fetchCategories({ commit }) {
      try {
        // const authResponse = await axios.post(
        //   "https://reseau.fatom.org/wp-json/jwt-auth/v1/token",
        //   {
        //     username: "adminer",
        //     password: "arioPIGIER#94",
        //   }
        // );
        // const token = authResponse.data.token;
        // localStorage.setItem("jwtToken", token);

        const response = await fetch(
          "https://reseau.fatom.org/wp-json/wp/v2/categories?per_page=50",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        if (!response.ok)
          throw new Error("Erreur de recupération des catalogues");

        const data = await response.json();
        console.log("test des categories", data);
        commit("SET_CATEGORIES", data);
      } catch (error) {
        console.error("Erreur de recupération des catalogues:", error);
      }
    },

    async fetchReports({ commit }) {
      try {
        const response = await fetch(
          "https://reseau.fatom.org/wp-json/wp/v2/posts?categories=7&per_page=50",
        );
        if (!response.ok)
          throw new Error("Échec de la récupération des rapports");

        const data = await response.json();
        console.log("dateTest", data);

        const reportsWithFiles = await Promise.all(
          data.map(async (report) => {
            const pdfUrlMatch =
              report.content.rendered.match(/href="([^"]+\.pdf)"/);
            const pdfUrl = pdfUrlMatch ? pdfUrlMatch[1] : null;

            if (report.featured_media) {
              const mediaResponse = await fetch(
                `https://reseau.fatom.org/wp-json/wp/v2/media/${report.featured_media}`,
              );
              const mediaData = await mediaResponse.json();
              report.featured_media_url = mediaData.source_url;
            }

            return {
              id: report.id,
              name: report.title?.rendered || "Sans titre",
              pdfUrl,
              featuredImage: report.featured_media_url || null,
            };
          }),
        );

        commit("SET_REPORTS", reportsWithFiles);
      } catch (error) {
        console.error("Erreur lors de la récupération des rapports:", error);
      }
    },

    async fetchRecentActivities({ commit }) {
      try {
        const response = await fetch(
          "https://reseau.fatom.org/wp-json/wp/v2/posts?per_page=50",
        );

        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des activités");
        }

        const data = await response.json();

        // Filtrer les articles en excluant certaines catégories
        const filteredActivities = data.filter(
          (activity) =>
            !activity.categories.some(
              (category) =>
                category === 7 ||
                category === 27 ||
                (category >= 15 && category <= 23),
            ),
        );

        // Trier par date de publication (du plus récent au plus ancien)
        filteredActivities.sort(
          (a, b) =>
            new Date(b.post_date_gmt).getTime() -
            new Date(a.post_date_gmt).getTime(),
        );

        // Prendre uniquement les 3 premiers articles après tri
        const recentActivities = filteredActivities.slice(0, 3);

        // Ajouter les images mises en avant et les noms des catégories
        const activitiesWithDetails = await Promise.all(
          recentActivities.map(async (activity) => {
            let featuredImage = null;

            if (activity.featured_media) {
              try {
                const mediaResponse = await fetch(
                  `https://reseau.fatom.org/wp-json/wp/v2/media/${activity.featured_media}`,
                );
                if (mediaResponse.ok) {
                  const mediaData = await mediaResponse.json();
                  featuredImage = mediaData.source_url || null;
                }
              } catch (error) {
                console.error(
                  `Erreur lors de la récupération de l'image pour le post ${activity.id}:`,
                  error,
                );
              }
            }

            let categoryName = "";
            if (activity.categories.length > 0) {
              try {
                const categoryResponse = await fetch(
                  `https://reseau.fatom.org/wp-json/wp/v2/categories/${activity.categories[0]}`,
                );
                if (categoryResponse.ok) {
                  const categoryData = await categoryResponse.json();
                  categoryName = categoryData.name;
                }
              } catch (error) {
                console.error(
                  `Erreur lors de la récupération de la catégorie pour le post ${activity.id}:`,
                  error,
                );
              }
            }

            return {
              id: activity.id,
              title: activity.title.rendered,
              date: new Date(activity.post_date_gmt).toLocaleDateString(
                "fr-FR",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                },
              ),
              excerpt: activity.excerpt.rendered.replace(/<[^>]+>/g, ""),
              featuredImage,
              categoryName,
            };
          }),
        );

        commit("SET_RECENT_ACTIVITIES", activitiesWithDetails);
      } catch (error) {
        console.error("Erreur lors de la récupération des activités:", error);
      }
    },

    async fetchPostsByCategory({ commit }, categoryId) {
      try {
        const response = await fetch(
          `https://reseau.fatom.org/wp-json/wp/v2/posts?categories=${categoryId}`,
        );
        if (!response.ok)
          throw new Error("Échec de la récupération des posts par catégorie");

        const data = await response.json();

        const postsWithDetails = await Promise.all(
          data.map(async (post) => {
            if (post.featured_media) {
              const mediaResponse = await fetch(
                `https://reseau.fatom.org/wp-json/wp/v2/media/${post.featured_media}`,
              );
              const mediaData = await mediaResponse.json();
              post.featuredImage = mediaData.source_url;
            }
            return {
              id: post.id,
              title: post.title.rendered,
              excerpt: post.excerpt.rendered.replace(/<[^>]+>/g, ""),
              featuredImage: post.featuredImage || null,
            };
          }),
        );

        commit("SET_POSTS_BY_CATEGORY", postsWithDetails);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des posts par catégorie:",
          error,
        );
      }
    },

    async fetchLastReports({ commit }) {
      try {
        const response = await fetch(
          "https://reseau.fatom.org/wp-json/wp/v2/posts?categories=7&per_page=50",
        );
        if (!response.ok)
          throw new Error("Échec de la récupération des derniers rapports");

        const data = await response.json();
        console.log(data);

        const reportsWithFiles = await Promise.all(
          data.map(async (report) => {
            const pdfUrlMatch =
              report.content.rendered.match(/href="([^"]+\.pdf)"/);
            const pdfUrl = pdfUrlMatch ? pdfUrlMatch[1] : null;

            if (report.featured_media) {
              const mediaResponse = await fetch(
                `https://reseau.fatom.org/wp-json/wp/v2/media/${report.featured_media}`,
              );
              const mediaData = await mediaResponse.json();
              report.featured_media_url = mediaData.source_url;
            }
            return {
              id: report.id,
              name: report.title?.rendered || "Sans titre",
              pdfUrl,
              featuredImage: report.featured_media_url || null,
              date: new Date(report.date),
            };
          }),
        );

        const sortedReports = reportsWithFiles.sort((a, b) => {
          const nameA = a.name.toLowerCase();
          const nameB = b.name.toLowerCase();
          return nameA > nameB ? -1 : nameA < nameB ? 1 : 0;
        });

        commit("SET_LAST_REPORTS", sortedReports);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des derniers rapports:",
          error,
        );
      }
    },

    async fetchRewards({ commit }) {
      // commit("SET_LOADING", true);
      try {
        const response = await fetch(
          "https://reseau.fatom.org/wp-json/wp/v2/posts?categories=22",
        );
        if (!response.ok) {
          throw new Error("Échec de la récupération des récompenses");
        }

        const data = await response.json();

        // Récupérer les informations nécessaires (titre et image)
        const rewards = await Promise.all(
          data.map(async (item) => {
            const reward = {
              id: item.id,
              title: item.title?.rendered || "Sans titre",
              image: null,
            };

            // Récupérer l'image mise en avant, si elle existe
            if (item.featured_media) {
              const mediaResponse = await fetch(
                `https://reseau.fatom.org/wp-json/wp/v2/media/${item.featured_media}`,
              );
              const mediaData = await mediaResponse.json();
              reward.image = mediaData.source_url || null;
            }

            return reward;
          }),
        );

        // Mettre à jour le store
        commit("SET_REWARDS", rewards);
        // commit("SET_ERROR", null);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des récompenses :",
          error,
        );
        // commit("SET_ERROR", error.message);
      }
    },

    async fetchPartners({ commit }) {
      try {
        const response = await fetch(
          "https://reseau.fatom.org/wp-json/monsite/v1/partenaires",
        );

        if (!response.ok)
          throw new Error("Erreur lors de la récupération des partenaires");

        const data = await response.json();

        // On adapte les champs de l'API au format attendu par le composant
        const partners = data.map((p) => ({
          id: p.id,
          image: p.logo.url,
          url: p.site_web || "#",
          name: p.nom,
        }));

        commit("SET_PARTNERS", partners);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des partenaires :",
          error,
        );
      }
    },
  },
  modules: {},
});
