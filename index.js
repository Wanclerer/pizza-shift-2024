const app = document.getElementById("root");

const init = async () => {
  const baseUrl = "https://shift-backend.onrender.com";

  try {
    const response = await fetch(`${baseUrl}/pizza/catalog`);
    if (!response.ok) {
      throw new Error(`Ошибка HTTP! Статус: ${response.status}`);
    }
    
    const data = await response.json();
    const pizzas = data.catalog;

    const pizzasContainer = document.createElement("div");
    pizzasContainer.className = "pizzas_container";

    for (let i = 0; i < pizzas.length; i++) {
      const pizza = pizzas[i];
      const pizzaContainer = document.createElement("div");
      pizzaContainer.className = "pizza";
      pizzaContainer.addEventListener("click", () => openPizzaModal(pizza));

      const name = document.createElement("h2");
      name.innerHTML = pizza.name;
      pizzaContainer.appendChild(name);

      const img = document.createElement("img");
      img.src = `${baseUrl}${pizza.img}`;
      img.alt = pizza.name;
      img.classList.add("pizza-image");
      pizzaContainer.appendChild(img);

      const description = document.createElement("p");
      description.innerHTML = pizza.description;
      pizzaContainer.appendChild(description);

      pizzasContainer.appendChild(pizzaContainer);
    }

    app.appendChild(pizzasContainer);
  } catch (error) {
    console.error("Ошибка при загрузке каталога пицц:", error);
    const errorMessage = document.createElement("p");
    errorMessage.innerHTML = "Не удалось загрузить каталог пицц. Пожалуйста, попробуйте позже.";
    app.appendChild(errorMessage);
  }
};

const openPizzaModal = (pizza) => {
  const modal = document.createElement("div");
  modal.className = "modal";

  const closeModalButton = document.createElement("span");
  closeModalButton.innerHTML = "&times;";
  closeModalButton.className = "close";
  closeModalButton.addEventListener("click", () => {
    modal.remove();
  });

  const modalContent = document.createElement("div");
  modalContent.className = "modal-content";

  const name = document.createElement("h2");
  name.innerHTML = pizza.name;
  modalContent.appendChild(name);

  const img = document.createElement("img");
  img.src = `https://shift-backend.onrender.com${pizza.img}`;
  img.alt = pizza.name;
  img.classList.add("pizza-image");
  modalContent.appendChild(img);

  const description = document.createElement("p");
  description.innerHTML = pizza.description;
  modalContent.appendChild(description);

  const calories = document.createElement("p");
  calories.innerHTML = `Калории: ${pizza.calories}`;
  modalContent.appendChild(calories);

  const protein = document.createElement("p");
  protein.innerHTML = `Белки: ${pizza.protein}`;
  modalContent.appendChild(protein);

  const totalFat = document.createElement("p");
  totalFat.innerHTML = `Жиры: ${pizza.totalFat}`;
  modalContent.appendChild(totalFat);

  const carbohydrates = document.createElement("p");
  carbohydrates.innerHTML = `Углеводы: ${pizza.carbohydrates}`;
  modalContent.appendChild(carbohydrates);

  const closeContainer = document.createElement("div");
  closeContainer.className = "close-container";
  closeContainer.appendChild(closeModalButton);
  modalContent.appendChild(closeContainer);

  modal.appendChild(modalContent);
  document.body.appendChild(modal);
};

document.addEventListener("DOMContentLoaded", () => {
  init().catch(error => console.error("Инициализация не удалась:", error));
});
