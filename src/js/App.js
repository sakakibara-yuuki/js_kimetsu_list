/*
 * App.js
 * Copyright (C) 2024 sakakibara <sakakibara@organon>
 *
 * Distributed under terms of the MIT license.
 */

export class App {

  #baseUrl = new URL(`https://ihatov08.github.io`);

  constructor() {
    window.addEventListener("load", async () => {
      this.showCard("all");
      this.showLoading();
    });
    const charactors = [
      ".charactor__all",
      ".charactor__kisatsutai",
      ".charactor__hashira",
      ".charactor__oni",
    ];
    charactors.forEach((charactor) => {
      const charactorButton = document.querySelector(charactor);
      const charactorKind = charactor.split("__")[1];
      charactorButton.addEventListener("click", async () => {
        const showCardRef = () => this.showCard(charactorKind);
        setTimeout(showCardRef, 500);
        this.showLoading();
      });
    });
  }

  showLoading() {
    const loadingImages = this.createGallery(".main__gallery_template_loading");
    this.changeGallery(loadingImages);
  }

  async showCard(charactorKind) {
    await fetch(this.#baseUrl + `/kimetsu_api/api` + `/${charactorKind}.json`)
      .then((response) => response.json())
      .then((data) => {

        const charactorImages = this.createGallery(".main__gallery_template");

        data.forEach((charactor) => {
          this.createCharactorCard(charactor, charactorImages);
        });

        this.changeGallery(charactorImages);
      })
      .catch((error) => console.error(error));
  }

  createGallery(templateSelector) {
    const template = document.querySelector(templateSelector);
    const clone = template.content.cloneNode(true);
    const galleryImages = clone.querySelector(".main__gallery-images");
    return galleryImages;
  }

  changeGallery(galleryImages) {
    const gallery = document.querySelector(".main__gallery");
    const oldGalleryImages = gallery.querySelector(".main__gallery-images");
    if (oldGalleryImages) {
      gallery.replaceChild(galleryImages, oldGalleryImages);
    } else {
      gallery.append(galleryImages);
    }
  }

  async createCharactorCard(charactor, charactorImages) {

    const template = document.querySelector(".charactor-card_template");
    const clone = template.content.cloneNode(true);
    const charactorCard = clone.querySelector(".charactor-card");

    const response = await fetch(this.#baseUrl + charactor.image)
      .then((response) => response.blob())
      .then((blob) => {
        const charactorImage = charactorCard.querySelector("img");
        charactorImage.src = URL.createObjectURL(blob);
        charactorImage.alt = charactor.name;

        const charactorName = charactorCard.querySelector(".charactor-card__name");
        charactorName.querySelector("p").textContent = charactor.name;

        const charactorCategory = charactorCard.querySelector(".charactor-card__category");
        charactorCategory.querySelector("p").textContent = charactor.category;

        charactorImages.append(charactorCard);

      })
      .catch((error) => console.error(error));
  }
}
