import people from "./data.js";
// console.log(people);

// ! set const
const container = document.querySelector(".slide-container");
const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");

// ! set slides
container.innerHTML = people
  .map((person, slideIndex) => {
    //   console.table(person);

    const { img, name, job, text } = person;

    // ! set position
    let position = "next";

    if (slideIndex === 0) {
      position = "active";
    }
    if (slideIndex === people.length - 1) {
      position = "last";
    }

    return `<article class="slide ${position}">
    <img src="${img}" class="img" alt="${name}">
    <h4>${name}</h4>
    <p class="title">${job}</p>
    <p class="text">${text}</p>
    <div class="quote-icon">
        <div class="fas fa-quote-right"></div>
    </div>
    </article>`;
  })
  .join("");

const displaySlide = (type) => {
  //   console.log("hello world");
  //   console.log(type);

  //   ! get items
  const active = document.querySelector(".active");

  let next;
  //   ***** when only have two slides, there won't be .next
  const nextNum = document.querySelectorAll(".next").length;
  //   console.log(nextNum);
  // ***** when there are more than two slides, set next to .active's next sibling
  if (nextNum !== 0) {
    next = active.nextElementSibling;
    // console.log(next);
  }

  const last = document.querySelector(".last");

  // ***** if run out of next silde, reset next to the first slide in the container
  if (!next) {
    next = container.firstElementChild;
    // console.log(next);
  }

  active.classList.remove("active");
  next.classList.remove("next");
  last.classList.remove("last");

  // ***** for prevBtn
  if (type === "prev") {
    active.classList.add("next");

    next = last.previousSibling;
    // ***** if run out of next silde, reset next to the last slide in the container
    if (!next) {
      next = container.lastElementChild;
    }
    next.classList.remove("next");
    next.classList.add("last");

    last.classList.add("active");
    //   ***** prevent the next three lines of code been executed
    return;
  }

  // ***** for nextBtn
  // ***** when only have two slides
  if (nextNum === 0) {
    active.classList.add("last");
    last.classList.add("active");
    // ***** when more than two slides
  } else {
    active.classList.add("last");
    next.classList.add("active");
    last.classList.add("next");
  }
};

nextBtn.addEventListener("click", () => {
  displaySlide();
});
prevBtn.addEventListener("click", () => {
  displaySlide("prev");
});
