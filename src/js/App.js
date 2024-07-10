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
      const charactorList = this.showCard("all");
      this.showLoading();
    });
    const charactors = [
      ".charactor__all",
      ".charactor__kisatsutai",
      ".charactor__hashira",
      ".charactor__oni",
    ];
    charactors.forEach((charactor) => {
      const charactorElement = document.querySelector(charactor);
      const charactorKind = charactor.split("__")[1];
      charactorElement.addEventListener("click", async () => {
        const charactorList = this.showCard(charactorKind);
        this.showLoading();
      });
    });
  }

  changeGallery(element) {
    const gallery = document.querySelector(".main__gallery");
    const child = gallery.querySelector(".gallery__list");
    if (child) {
      gallery.replaceChild(element, child);
    } else {
      gallery.append(element);
    }
  }

  showLoading() {
    const template = document.querySelector(".main__gallery_template_loading");
    const clone = template.content.cloneNode(true);
    const loading = clone.querySelector("img");
    this.changeGallery(loading);
  }

  async showCard(charactorKind) {
    await fetch(this.#baseUrl + `/kimetsu_api/api` + `/${charactorKind}.json`)
      .then((response) => response.json())
      .then((data) => {
        const template = document.querySelector(".main__gallery_template");
        const clone = template.content.cloneNode(true);
        const charactorList = clone.querySelector(".gallery__list");

        data.forEach((charactor) => {
          const charactorCard = this.createCharactorCard(charactor, charactorList);
          // charactorList.append(charactorCard);
        });
        this.changeGallery(clone);
        return charactorList;
      })
      .catch((error) => console.error(error));
  }

  async createCharactorCard(charactor, charactorList) {
    const charactorCard = document.createElement("div");
    const charactorImage = new Image();
    const response = await fetch(this.#baseUrl + charactor.image);
    const blob = await response.blob();
    charactorImage.src = URL.createObjectURL(blob);
    charactorImage.alt = charactor.name;

    const charactorName = document.createElement("p");
    charactorName.textContent = charactor.name;
    const charactorCategory = document.createElement("p");
    charactorCategory.textContent = charactor.category;
    [charactorName, charactorImage, charactorCategory].forEach((element) => {
      charactorCard.append(element);
    });
    charactorList.append(charactorCard);
    return charactorCard;
  }
}
