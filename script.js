document.addEventListener("DOMContentLoaded", function () {
  window.addEventListener("load", () => {
    const spinner = document.getElementById("page-spinner");
    setTimeout(() => {
      spinner.classList.add("fade-out");
    }, 1000); // 1 seconds delay
  });

  window.addEventListener("scroll", function () {
    const header = document.querySelector("header");
    const navbarBrandImg = document.querySelector(".navbar-brand img");

    if (window.scrollY > 50) {
      header.classList.add("scrolled");
      navbarBrandImg.src = "./assets/logo2.webp";
    } else {
      header.classList.remove("scrolled");
      navbarBrandImg.src = "./assets/logo.png";
    }
  });

  //Fetching the current date for Reservation form
  const dateInput = document.getElementById("date");
  if (dateInput) {
    dateInput.value = new Date().toISOString().split("T")[0];
  }

  //Adding Countdown Timer for Event Cards
  const eventCards = document.querySelectorAll(".event-card");

  eventCards.forEach((card) => {
    const timeBoxes = card.querySelectorAll(".time-box h1");
    if (!timeBoxes || timeBoxes.length < 4) return;

    let targetDate;
    const ds = card.getAttribute("data-date");

    if (ds) {
      const parsed = new Date(ds);
      if (isNaN(parsed.getTime())) {
        targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + 25);
      } else {
        targetDate = parsed;
      }
    }

    if (!targetDate) {
      targetDate = new Date();
      targetDate.setDate(targetDate.getDate() + 25);
    }

    const pad = (n) => String(n).padStart(2, "0");

    function updateCountdown() {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        //when countdown is over
        timeBoxes.forEach((box) => {
          box.textContent = "00";
        });
        return;
      }

      //Time Calculations
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      //Update the DOM
      timeBoxes[0].textContent = days;
      timeBoxes[1].textContent = pad(hours);
      timeBoxes[2].textContent = pad(minutes);
      timeBoxes[3].textContent = pad(seconds);
    }

    // Run immediately and every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
  });

  /* Making Blog-detail Page Dynamic */

  // Step 1: Blog data
  const blogs = [
    {
      id: 1,
      title: "Cooking recipe Delicious",
      date: "June 28, 2025",
      img: "./assets/blog-05.jpg",
      category: "Cooking, Food",
      comment: 8,
      content: `
        <p>Discover the secret behind creating a mouth-watering homemade meal that blends flavor, aroma, and simplicity. From selecting the freshest ingredients to perfecting each step, this recipe transforms everyday cooking into a delightful culinary adventure. Enjoy every bite with our chef's easy guide to delicious, heart-warming dishes made with love.</p>
      `,
    },
    {
      id: 2,
      title: "Pizza is prepared fresh",
      date: "July 20, 2025",
      img: "./assets/blog-06.jpg",
      category: "Cooking, Food",
      comments: 5,
      content: `
        <p>From kneading the perfect dough to melting golden cheese, this guide reveals how to create pizza that’s crispy, flavorful, and irresistibly fresh. Learn expert tips and easy methods to prepare authentic pizzeria-style pizza at home and bring joy to every slice you share with family and friends.</p>
      `,
    },
    {
      id: 3,
      title: "Style the Wedding Party",
      date: "August 16, 2025",
      img: "./assets/blog-04.jpg",
      category: "Event, Style",
      comment: 10,
      content: `
        <p>Make your wedding unforgettable with our curated styling guide. From elegant table setups to menu pairings, discover creative ways to design a memorable event filled with charm and flavor. Perfect for couples who want to celebrate love through food, décor, and timeless style.</p>
      `,
    },
    {
      id: 4,
      title: "Best Places for Wine",
      date: "September 15, 2025",
      img: "./assets/blog-10.jpg",
      category: "Travel, Wine",
      comment: 3,
      content: `
        <p>Explore the world's most exquisite wine destinations where taste, scenery, and tradition unite. From lush vineyards to cozy cellars, uncover hidden gems perfect for every wine enthusiast. Experience unforgettable sips and stories that celebrate the passion behind every bottle.</p>
      `,
    },
    {
      id: 5,
      title: "Eggs and Cheese",
      date: "February 12, 2025",
      img: "./assets/blog-07.jpg",
      category: "Cooking, Breakfast",
      comment: 7,
      content: `
        <p>Indulge your sweet tooth with this collection of irresistible desserts. From creamy cheesecakes to warm pastries, learn how to make bakery-style treats effortlessly. Each recipe is crafted to balance taste, texture, and presentation for pure dessert bliss.</p>
      `,
    },
  ];

  // Step 2: Save selected blog in localStorage when clicked
  const blogLinks = document.querySelectorAll(".blog-link");

  blogLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const id = e.target.closest(".blog-link").dataset.id;
      const blog = blogs.find((b) => b.id == id);
      if (blog) {
        localStorage.setItem("selectedBlog", JSON.stringify(blog));
      }
    });
  });

  // Step 3: On blog-detail.html, load the selected blog
  if (window.location.pathname.includes("blog-detail.html")) {
    const blog = JSON.parse(localStorage.getItem("selectedBlog"));
    if (blog) {
      const divider = document.querySelector(".divider");
      if (blog) {
        divider.innerHTML = `
        <h4>
            <a href="./index.html">HOME</a> / <a href="./blog.html">BLOG</a> / <span>${blog.title}</span>
        </h4>
        `;
      }

      const blogContainer = document.querySelector(".blog-left");

      blogContainer.innerHTML = `
        <div class="blog-card w-100">
          <div class="img-box">
            <img class="img-fluid" src="${blog.img}" alt="${blog.title}">
            <div class="date-banner">
              <h2>${new Date(blog.date).getDate()}</h2>
              <h5>${new Date(blog.date).toLocaleString("default", {
                month: "long",
              })}, ${new Date(blog.date).getFullYear()}</h5>
            </div>
          </div>
          <div class="blog-content">
            <a href="#" class="blog-title">${blog.title}</a>
            <h6>by Admin | ${blog.date} | ${blog.category} | ${
        blog.comment
      } Comments</h6>
            ${blog.content}
          </div>
        </div>

        <div class="comment-box w-100">
          <form>
            <h1>Leave a Comment</h1>
            <div class="form-text">Your email address will not be published. Required fields are marked *</div>

            <div class="mb-3">
              <textarea class="form-control" placeholder="Comment..."></textarea>
            </div>

            <div class="mb-3">
              <input type="text" class="form-control" placeholder="Name *" required>
            </div>

            <div class="mb-3">
              <input type="email" class="form-control" placeholder="Email *" required>
            </div>

            <div class="mb-3">
              <input type="text" class="form-control" placeholder="Website">
            </div>

            <button type="submit" class="btn">POST COMMENT</button>
          </form>
        </div>
      `;
    }
  }

  // Image Popup Script
  const modalImg = document.getElementById("modalImg");
  const modal = new bootstrap.Modal(document.getElementById("imgModal"));

  // Listen for clicks on gallery images
  document.querySelectorAll(".gallery-img .icon").forEach((icon) => {
    icon.addEventListener("click", (e) => {
      e.preventDefault();
      const imgSrc = icon.getAttribute("href");
      modalImg.src = imgSrc;
      modal.show();
    });
  });
});
