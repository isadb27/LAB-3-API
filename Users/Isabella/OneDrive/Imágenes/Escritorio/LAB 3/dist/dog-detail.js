import { fetchBreed } from "./dog-api.js";
export class DogDetail extends HTMLElement {
    static get observedAttributes() {
        return ["breed-id"];
    }
    connectedCallback() {
        this.innerHTML = `
      <input type="text" placeholder="Ingresa breed-id" id="input-id" />
      <button id="search-btn">Buscar</button>
      <div id="detail"></div>
    `;
        this.querySelector("#search-btn")?.addEventListener("click", () => {
            const input = this.querySelector("#input-id");
            if (input?.value) {
                this.render(input.value);
            }
        });
        const initialId = this.getAttribute("breed-id");
        if (initialId) {
            this.render(initialId);
        }
    }
    attributeChangedCallback(_, __, newValue) {
        if (newValue) {
            this.render(newValue);
        }
    }
    async render(breedId) {
        const detailContainer = this.querySelector("#detail");
        if (!detailContainer)
            return;
        detailContainer.innerHTML = "<p>Cargando...</p>";
        try {
            const breed = await fetchBreed(breedId);
            detailContainer.innerHTML = `
        <h2>${breed.attributes.name}</h2>
        <p>${breed.attributes.description}</p>
        <ul>
          <li><strong>Life Span:</strong> ${breed.life.min} - ${breed.life.max} years</li>
          <li><strong>Male Weight:</strong> ${breed.male_weight.min} - ${breed.male_weight.max} kg</li>
        </ul>
      `;
        }
        catch (error) {
            detailContainer.innerHTML = `<p style="color:red;">No se pudo cargar la raza con ID: ${breedId}</p>`;
            console.error("Error al obtener raza:", error);
        }
    }
}
customElements.define("dog-detail", DogDetail);
