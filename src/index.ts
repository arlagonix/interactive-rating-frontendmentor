// Rating Card

const ratingCard: Element | null = document.querySelector(".rating-card");
const starIcon: Element | null = document.querySelector(".rating-card__star");
const submitButton: Element | null = document.querySelector(".rating-card__button");
const scores: Element | null = document.querySelector(".rating-card__scores");

let feedbackScore: number = 1;
let activeFeedbackOption: Element | undefined;

// Result Card

const resultCard: Element | null = document.querySelector(".result-card");
const changeDecisionButton: Element | null = document.querySelector(".result-card__button");
const conclusionText: Element | null = document.querySelector(".result-card__conclusion");

// Choose between options and enable/disable the submit button
for (let element of Array.from(scores!.children)) {
  element.addEventListener("click", (e: Event) => {
    feedbackScore = +(e.target as Element).innerHTML;

    // If there is an active option, make it inactive
    if (activeFeedbackOption !== undefined) {
      activeFeedbackOption.classList.remove("score--active");
    }

    // If we choose another option, make the button active
    if (activeFeedbackOption !== e.target) {
      (e.target as Element).classList.add("score--active");
      submitButton!.removeAttribute("disabled");
      activeFeedbackOption = e.target as Element;
    }

    // If we choose the same option, disable the button
    else {
      activeFeedbackOption = undefined;
      submitButton!.setAttribute("disabled", "");
    }
  });
}

// Hides the rating card, shows the result card
submitButton!.addEventListener("click", () => {
  conclusionText!.innerHTML = `You selected ${feedbackScore} out of 5`;

  (ratingCard as HTMLElement).style.animation = "move-center-to-left .5s forwards";
  (resultCard as HTMLElement).style.animation = "move-right-to-center .5s forwards";

  ratingCard!.addEventListener(
    "animationend",
    () => {
      ratingCard!.classList.add("page--no-display");
      resultCard!.classList.remove("page--no-display");
    },
    { once: true } // The absense of this little boy caused me so much trouble!
  );
});

// Hides the result card, shows the rating card, allows to change the feedback option
changeDecisionButton!.addEventListener("click", () => {
  (resultCard as HTMLElement).style.animation = "move-center-to-right .5s forwards";
  (ratingCard as HTMLElement).style.animation = "move-left-to-center .5s forwards";

  resultCard!.addEventListener(
    "animationend",
    () => {
      resultCard!.classList.add("page--no-display");
      ratingCard!.classList.remove("page--no-display");
    },
    { once: true }
  );
});

// Adds nice little animation on a star icon
starIcon!.addEventListener("click", () => {
  starIcon!.classList.add("rating-card__star--animation");
  starIcon!.addEventListener("animationend", () => {
    starIcon!.classList.remove("rating-card__star--animation");
  });
});

// Allows to submit the feedback on "Enter"
document.addEventListener("keydown", (e: KeyboardEvent) => {
  switch (e.key) {
    case "Enter":
      if (!Array.from(ratingCard!.classList).includes("page--no-display")) {
        (submitButton as HTMLElement).focus();
        submitButton!.dispatchEvent(new Event("click"));
      }
      if (!Array.from(resultCard!.classList).includes("page--no-display")) {
        (changeDecisionButton as HTMLElement).focus();
        changeDecisionButton!.dispatchEvent(new Event("click"));
      }
  }
});
