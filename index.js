///// variables

const navList = document.querySelector(".navlist");
allSections = document.querySelectorAll("section");
const testimonial = document.querySelector(".testimonials");
const slidesTestimonials = document.querySelectorAll(
  ".testimonial-content-inner"
);
const clientImage = document.querySelectorAll(".client-image");
const btnLeft = document.querySelector(".btn-left");
const btnRight = document.querySelector(".btn-right");
const menuButton = document.querySelector(".menu-bar");
const hideMenu = document.querySelector(".hide-menu-bar");
const form = document.querySelector(".contact-form");
const username = document.querySelector("#username");
const number = document.querySelector("#number");

const email = document.querySelector("#email");
const filterItem = document.querySelector(".portfolio-buttons");
const projectItem = document.querySelectorAll(".portfolio-img");

//////////////////////////////////////////////////////
/////////////////// sticky navbar  ///////////////////
//////////////////////////////////////////////////////

function windowScroll() {
  const navbar = document.querySelector(".navbar");
  if (
    document.body.scrollTop >= 50 ||
    document.documentElement.scrollTop >= 50
  ) {
    navbar.classList.add("nav-sticky");
  } else {
    navbar.classList.remove("nav-sticky");
  }
}

window.addEventListener("scroll", (ev) => {
  ev.preventDefault();
  windowScroll();
});

//////////////////////////////////////////////////////
///////////////////smooth scrolling //////////////////
//////////////////////////////////////////////////////

navList.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.classList.contains("nav-link")) {
    const href = e.target.getAttribute("href");
    document.querySelector(href).scrollIntoView({ behavior: "smooth" });

    if (navList.classList.contains("nav-open")) {
      navList.classList.remove("nav-open");
      hideMenu.style.display = "none";
    }
  }
});

const menuLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  const scrollPosition = window.scrollY;
  document.querySelectorAll(".main-section").forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (
      scrollPosition >= sectionTop - 100 &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      const sectionId = section.getAttribute("id");

      menuLinks.forEach((link) => {
        link.classList.remove("active");
      });

      const activeLink = document.querySelector(
        `nav ul li a[href="#${sectionId}"]`
      );
      if (activeLink) {
        activeLink.classList.add("active");
      }
    }
  });
});

/////////////////////////////////////////
//*********** Testimonials  ***********
/////////////////////////////////////////

let curSlide = 0;
let maxSlide = slidesTestimonials.length;

const goToSlide = (slideIndex) => {
  slidesTestimonials.forEach((slide, index) => {
    slide.style.transform = `translateX(${100 * (index - slideIndex)}%)`;
    clientImage.forEach((image) => {
      image.classList.remove("active-testimonial");
    });

    const activeImage = clientImage[slideIndex];
    activeImage.classList.add("active-testimonial");
  });
};
goToSlide(1);

clientImage.forEach((image) => {
  image.addEventListener("click", (e) => {
    const index = Array.from(clientImage).indexOf(e.target);
    goToSlide(index);
  });
});

const nextSlide = () => {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  goToSlide(curSlide);
};
const previousSlide = () => {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  goToSlide(curSlide);
};
btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", previousSlide);
document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowLeft") previousSlide();
  if (e.key === "ArrowRight") nextSlide();
});

let interval = setInterval(nextSlide, 5000);
testimonial.addEventListener("mouseenter", () => {
  clearInterval(interval);
});
testimonial.addEventListener("mouseleave", () => {
  interval = setInterval(nextSlide, 5000);
});

/////////////////////////////////////////
//********* mobile navigation ***********
/////////////////////////////////////////

menuButton.addEventListener("click", () => {
  navList.classList.add("nav-open");
  hideMenu.style.display = "block";
});

hideMenu.addEventListener("click", () => {
  navList.classList.remove("nav-open");
  hideMenu.style.display = "none";
});

/////////////////////////////////////////
//********* portfolio  ***********
/////////////////////////////////////////

filterItem.addEventListener("click", (e) => {
  if (e.target.classList.contains("portfolio-btn")) {
    filterItem.querySelectorAll(".portfolio-btn").forEach((item) => {
      item.classList.remove("active-btn");
    });

    e.target.classList.add("active-btn");

    let filterName = e.target.getAttribute("data-type");
    projectItem.forEach((item) => {
      let filtered = item.getAttribute("data-type");
      item.classList.remove("show");
      if (filterName === "all" || filtered.includes(filterName)) {
        item.classList.add("show");
        item.classList.remove("hidden");
      } else {
        item.classList.add("hidden");
      }
    });
  }
});
/////////////////////////////////////////
//********* form validation  ***********
/////////////////////////////////////////

function isemail(email) {
  return /^[a-z0-9][a-z0-9-_\.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/.test(
    email
  );
}

const validate = {
  username: (value) => {
    if (!value) {
      return "Required !";
    }
    return null;
  },

  email: (value) => {
    if (!value) {
      return "Required !";
    }
    if (!isemail(value)) {
      return "invalid email !";
    }
    return null;
  },

  number: (value) => {
    if (!value) {
      return "required !";
    }
    return null;
  },
};

const setError = (selector, key) => {
  const span = document.querySelector(`#${selector}`);
  span.previousElementSibling.innerText = validate[selector](key);
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let tempObj = {
    username: username.value,
    number: number.value,
    email: email.value,
  };

  let hasError = false;

  Object.keys(validate).forEach((item) => {
    setError(item, tempObj[item]);
    if (validate[item](tempObj[item])) {
      hasError = true;
    }
  });

  Object.keys(tempObj).forEach((key) => {
    const node = document.querySelector(`#${key}`);
    node.addEventListener("change", (e) => {
      setError(key, e.target.value);
    });
  });

  if (!hasError) {
    form.reset();
    alert("form submitted");
  }
});
