<!-- components/Loader.vue -->
<template>
  <div v-if="isLoading" class="loadingScreen">
    <h3 class="loadingScreen__text">
      <span
        class="loadingScreen__text__span"
        v-for="(letter, index) in text"
        :key="index"
        :style="{ animationDelay: `${index * 100}ms` }"
      >
        {{ letter }}
      </span>
    </h3>
  </div>
</template>

<script>
export default {
  props: {
    isLoading: {
      type: Boolean,
      required: true,
    },
    text: {
      type: String,
      default: "FATOM",
    },
  },
};
</script>

<style scoped>
.loadingScreen {
  position: fixed;
  height: 100%;
  width: 100%;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 900000;
  overflow: hidden;
  background: #fff;
}

.loadingScreen__text {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  text-align: center;
  width: auto;
  height: 100px;
  color: #ddd;
  text-transform: uppercase;
  font-size: 30px;
}

.loadingScreen__text__span {
  display: inline-block;
  padding: 5px;
  vertical-align: middle;
  animation-name: charColor;
  animation-iteration-count: infinite;
  animation-duration: 1s;
  animation-delay: 100ms;
  animation-timing-function: ease;
  animation-fill-mode: both;
  backface-visibility: hidden;
}

@keyframes charColor {
  0% {
    color: #cccccc; /* Lighten the color */
  }
  50% {
    color: #5c5c5c; /* Main feature color */
  }
  100% {
    color: #cccccc; /* Lighten the color */
  }
}

/* To add delays to each span */
.loadingScreen__text__span:nth-child(1) {
  animation-delay: 100ms;
}
.loadingScreen__text__span:nth-child(2) {
  animation-delay: 200ms;
}
.loadingScreen__text__span:nth-child(3) {
  animation-delay: 300ms;
}
.loadingScreen__text__span:nth-child(4) {
  animation-delay: 400ms;
}
.loadingScreen__text__span:nth-child(5) {
  animation-delay: 500ms;
}
.loadingScreen__text__span:nth-child(6) {
  animation-delay: 600ms;
}
.loadingScreen__text__span:nth-child(7) {
  animation-delay: 700ms;
}
.loadingScreen__text__span:nth-child(8) {
  animation-delay: 800ms;
}
.loadingScreen__text__span:nth-child(9) {
  animation-delay: 900ms;
}
</style>
