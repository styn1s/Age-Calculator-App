document.addEventListener("DOMContentLoaded", function () {
  const ageForm = document.getElementById("ageForm");
  ageForm.addEventListener("submit", onFormSubmit);

  function onFormSubmit(event) {
    event.preventDefault();

    resetError();

    const year = document.getElementById("year").value;
    const month = document.getElementById("month").value;
    const day = document.getElementById("day").value;

    if (checkBirthDate(year, month, day)) {
      calculateAge(year, month, day);
    } else {
      showError();
    }
  }

  function calculateAge(year, month, day) {
    const currentDate = new Date();
    const birthDate = new Date(year, month - 1, day);

    let ageYears = currentDate.getFullYear() - birthDate.getFullYear();
    let ageMonths = currentDate.getMonth() - birthDate.getMonth();
    let ageDays = currentDate.getDate() - birthDate.getDate();

    if (ageMonths < 0) {
      ageYears--;
      ageMonths += 12;
    }

    if (ageDays < 0) {
      ageMonths--;
      const lastMonthDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        0
      );
      ageDays += lastMonthDate.getDate();

      if (ageMonths < 0) {
        ageYears--;
        ageMonths += 12;
      }
    }

    document.getElementById("year-span").innerHTML = ageYears;
    document.getElementById("month-span").innerHTML = ageMonths;
    document.getElementById("day-span").innerHTML = ageDays;
  }

  function checkBirthDate(year, month, day) {
    let isValidDate = true;
    let currentYear = new Date().getFullYear();
    let lastdDayMonth = new Date(year, month, 0).getDate();

    if (day > lastdDayMonth) {
      document.getElementById("day-error").innerHTML = 
        "Must be a valid day";
        isValidDate = false;
    }

    if (year > currentYear) {
      document.getElementById("year-error").innerHTML = 
        "Must be in the past";
        isValidDate = false;
    }

    if (month < 1 || month > 12) {
      document.getElementById("month-error").innerHTML =
        "Must be a valid month";
        isValidDate = false;
    }

    if (year === "") {
      document.getElementById("year-error").innerHTML =
        "This field is required";
      isValidDate = false;
    }

    if (month === "") {
      document.getElementById("month-error").innerHTML =
        "This field is required";
        isValidDate = false;
    }

    if (day === "") {
      document.getElementById("day-error").innerHTML =
        "This field is required";
      isValidDate = false;
    }

    return isValidDate;
  }

  function showError() {
    let inputs = document.querySelectorAll(".form__input");
    let labels = document.querySelectorAll(".form__label");
    inputs.forEach((input) => {
      input.classList.add("form__input--error");
    });
    labels.forEach((label) => {
      label.classList.add("form__label--error");
    });
  }

  function resetError() {
    let inputs = document.querySelectorAll(".form__input");
    let labels = document.querySelectorAll(".form__label");
    let errorTexts = document.querySelectorAll(".input__error-text");

    inputs.forEach((input) => {
      input.classList.remove("form__input--error");
    });
    labels.forEach((label) => {
      label.classList.remove("form__label--error");
    });
    errorTexts.forEach((text) => {
      text.innerHTML = "";
    });
  }
});
