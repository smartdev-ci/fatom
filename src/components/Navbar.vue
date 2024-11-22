<!-- src/components/Navbar.vue -->
<template>
    <nav class="navbar">
      <div class="logo">
        <span>FONDATION ATEF OMAIS</span>
      </div>
      <ul class="nav-links">
        <li><a href="#">ACCUEIL</a></li>
        <li><a href="#">À PROPOS</a></li>
        <li><a href="#">ACTIVITÉS</a></li>
        <li><a href="#">PARTENAIRES</a></li>
        <li><a href="#">CONTACTS</a></li>
      </ul>
      <div class="social-icons">
        <a href="#" class="social-icon"><i class="fab fa-facebook-f"></i></a>
        <a href="#" class="social-icon"><i class="fab fa-twitter"></i></a>
        <a href="#" class="social-icon"><i class="fab fa-linkedin-in"></i></a>
      </div>
    </nav>
  </template>
  
  <script>
  export default {};
  </script>
  
  <style scoped>
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    padding: 15px 20px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  .logo span {
    font-size: 24px;
    font-weight: bold;
    color: #333;
  }
  
  .nav-links {
    list-style: none;
    display: flex;
    gap: 20px;
  }
  
  .nav-links li {
    margin: 0;
  }
  
  .nav-links a {
    text-decoration: none;
    color: #333;
    font-size: 16px;
  }
  
  .nav-links a:hover {
    text-decoration: underline;
  }
  
  .social-icons {
    display: flex;
    gap: 15px;
  }
  
  .social-icon {
    text-decoration: none;
    color: #333;
    font-size: 18px;
  }
  
  .social-icon:hover {
    color: #007bff;
  }
  </style>
  