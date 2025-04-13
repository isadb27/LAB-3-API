import { fetchBreeds } from "./dog-api.js";

class DogList extends HTMLElement {
    connectedCallback() {
        this.render()
    }

    async render(){
        const breeds = await fetchBreeds();
        this.innerHTML = `<ul> ${breeds
            .map(
                (breed) =>
                 `<li data-id="${breed.id}">${breed.attributes.name}</li>`
            )
            .join("")}</ul>`;

        this.querySelectorAll("li").forEach((item) => {   
            item.addEventListener("click", () => {
                const id = item.getAttribute("data-id");
                if (id) {
                    document.querySelector('dog-detail')?.setAttribute("breed-id", id);
                }
            });
        });
    
    }

   
}

customElements.define("dog-list", DogList);