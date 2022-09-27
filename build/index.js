"use strict";
var ratingCard = document.querySelector(".rating-card");
var starIcon = document.querySelector(".rating-card__star");
var submitButton = document.querySelector(".rating-card__button");
var scores = document.querySelector(".rating-card__scores");
var feedbackScore = 1;
var activeFeedbackOption;
var resultCard = document.querySelector(".result-card");
var changeDecisionButton = document.querySelector(".result-card__button");
var conclusionText = document.querySelector(".result-card__conclusion");
for (var _i = 0, _a = Array.from(scores.children); _i < _a.length; _i++) {
    var element = _a[_i];
    element.addEventListener("click", function (e) {
        feedbackScore = +e.target.innerHTML;
        if (activeFeedbackOption !== undefined) {
            activeFeedbackOption.classList.remove("score--active");
        }
        if (activeFeedbackOption !== e.target) {
            e.target.classList.add("score--active");
            submitButton.removeAttribute("disabled");
            activeFeedbackOption = e.target;
        }
        else {
            activeFeedbackOption = undefined;
            submitButton.setAttribute("disabled", "");
        }
    });
}
submitButton.addEventListener("click", function () {
    conclusionText.innerHTML = "You selected ".concat(feedbackScore, " out of 5");
    ratingCard.style.animation = "move-center-to-left .5s forwards";
    resultCard.style.animation = "move-right-to-center .5s forwards";
    ratingCard.addEventListener("animationend", function () {
        ratingCard.classList.add("page--no-display");
        resultCard.classList.remove("page--no-display");
    }, { once: true });
});
changeDecisionButton.addEventListener("click", function () {
    resultCard.style.animation = "move-center-to-right .5s forwards";
    ratingCard.style.animation = "move-left-to-center .5s forwards";
    resultCard.addEventListener("animationend", function () {
        resultCard.classList.add("page--no-display");
        ratingCard.classList.remove("page--no-display");
    }, { once: true });
});
starIcon.addEventListener("click", function () {
    starIcon.classList.add("rating-card__star--animation");
    starIcon.addEventListener("animationend", function () {
        starIcon.classList.remove("rating-card__star--animation");
    });
});
document.addEventListener("keydown", function (e) {
    switch (e.key) {
        case "Enter":
            if (!Array.from(ratingCard.classList).includes("page--no-display")) {
                submitButton.focus();
                submitButton.dispatchEvent(new Event("click"));
            }
            if (!Array.from(resultCard.classList).includes("page--no-display")) {
                changeDecisionButton.focus();
                changeDecisionButton.dispatchEvent(new Event("click"));
            }
    }
});
