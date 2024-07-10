/*
 * App.js
 * Copyright (C) 2024 sakakibara <sakakibara@organon>
 *
 * Distributed under terms of the MIT license.
 */

export class App {

  #baseUrl = `https://ihatov08.github.io`;

  constructor() {
    window.addEventListener("load", () => {
      this.showCard("all");
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
      charactorElement.addEventListener("click", () => {
        const charactorList = this.showCard(charactorKind);
      });
    });
  }

  async showCard(charactorKind) {
    const res = await fetch(this.#baseUrl + `/kimetsu_api/api` + `/${charactorKind}.json`)
      .then((response) => response.json())
      .then((data) => {
        const template = document.querySelector(".main__gallery_template");
        const clone = template.content.cloneNode(true);
        const charactorList = clone.querySelector(".charactor__list");

        // すべて履行されるまで待つ
        data.forEach((charactor) => {
          const charactorCard = this.createCharactorCard(charactor);
          // const charactorCard = await this.createCharactorCard(charactor);
          charactorList.append(charactorCard);
        });

        const gallery = document.querySelector(".main__gallery");
        const child = gallery.querySelector(".charactor__list");
        if (child) {
          gallery.replaceChild(clone, child);
        } else {
          gallery.append(clone);
        }
      })
      .catch((error) => console.error(error));

    console.log(res);
    console.log('hello');
  }

  createCharactorCard(charactor) {
    const charactorCard = document.createElement("div");
    const charactorImage = document.createElement("img");
    charactorImage.src = this.#baseUrl + charactor.image;
    charactorImage.alt = charactor.name;
    charactorImage.decoding = "async";
    const charactorName = document.createElement("p");
    charactorName.textContent = charactor.name;
    const charactorCategory = document.createElement("p");
    charactorCategory.textContent = charactor.category;
    [charactorName, charactorImage, charactorCategory].forEach((element) => {
      charactorCard.append(element);
    });
    return charactorCard;
  }
}
