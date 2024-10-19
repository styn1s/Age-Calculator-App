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

    const setError = (id, message) => {
      document.getElementById(id).innerHTML = message;
      isValidDate = false;
    };

    if (!day || day > lastdDayMonth || day <= 0) {
      setError(
        "day-error",
        day ? "Must be a valid day" : "This field is required"
      );
    }

    if (!month || month < 1 || month > 12) {
      setError(
        "month-error",
        month ? "Must be a valid month" : "This field is required"
      );
    }

    if (!year) {
      setError("year-error", "This field is required");
    } else if (year < 100) {
      setError("year-error", "Must be a valid year");
    } else if (year > currentYear) {
      setError("year-error", "Must be in the past");
    }

    return isValidDate;
  }

  function toggleError(isError) {
    let inputs = document.querySelectorAll(".form__input");
    let labels = document.querySelectorAll(".form__label");

    inputs.forEach((input) => {
      input.classList.toggle("form__input--error", isError);
    });

    labels.forEach((label) => {
      label.classList.toggle("form__label--error", isError);
    });
  }

  function showError() {
    toggleError(true);
  }

  function resetError() {
    toggleError(false);

    document.querySelectorAll(".input__error-text").forEach((text) => {
      text.innerHTML = "";
    });
  }
});
