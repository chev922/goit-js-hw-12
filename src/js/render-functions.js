import { lightbox } from "../main";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

export const card = document.querySelector(".gallery");

export function renderImages(arr) {
    const markup = arr.map((image) => {
        return `<li class="item-image"><a class="photos-list-link" href="${image.largeImageURL}">
  <img class="photo" loading="lazy" src="${image.webformatURL}" alt="${image.tags}"/>
  </a>
  <ul class="photo-information-container">
  <li class="item-photo-information-container"><p><span class="accent">Likes</span>${image.likes}</p></li>
  <li class="item-photo-information-container"><p><span class="accent">Views</span>${image.views}</p></li>
  <li class="item-photo-information-container"><p><span class="accent">Comments</span>${image.comments}</p></li>
  <li class="item-photo-information-container"><p><span class="accent">Downloads</span>${image.downloads}</p></li>
  </ul>
  </li>`;
    }).join("");
    card.insertAdjacentHTML("beforeend", markup);
    lightbox.refresh();
};