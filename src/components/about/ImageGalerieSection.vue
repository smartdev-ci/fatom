<template>
    <div class="image-gallery">
      <div class="main-image">
        <img src="/assets/img/lyceevert1.jpg" alt="Lycée vert de Godiabré" />
        <!-- <div class="caption">Lycée vert de Godiabré</div> -->
      </div>
      <div class="secondary-image">
        <img src="/assets/img/lyceevert3.jpg" alt="School Building" />
      </div>
      <div class="secondary-image">
        <img src="/assets/img/lyceevert6.jpg" alt="Classroom" />
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "ImageGallery",
  };
  </script>
  
  <style scoped>
  .image-gallery {
    width: 60%;
    display: grid;
    gap: 20px;
    grid-template-columns: 1fr;
    margin: 0 auto;
    padding-top: 20px;
    padding-bottom: 20px;
  }
  
  .main-image {
    grid-column: 1 / -1; /* Main image spans full width */
    position: relative;
  }
  
  .main-image img {
    width: 100%;
    height: auto;
    border-radius: 8px;
  }
  
  .caption {
    position: absolute;
    bottom: 10px;
    left: 10px;
    background-color: rgba(255, 165, 0, 0.8); /* Semi-transparent orange */
    color: white;
    padding: 5px 10px;
    border-radius: 4px;
    font-weight: bold;
  }
  
  .secondary-image img {
    width: 100%;
    height: auto;
    border-radius: 8px;
  }
  
  @media (min-width: 768px) {
    .image-gallery {
      grid-template-columns: 1fr 1fr; /* Two columns on larger screens */
    }
  
    .main-image {
      grid-column: 1 / -1; /* Main image spans both columns */
    }
  
    .secondary-image {
      grid-column: auto;
    }
  }
  </style>
  