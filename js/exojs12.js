"use strict";
(function() {
  class Slideshow {
    constructor(nb_images = 0, width, height, speed) {
      console.log('Dans le constructeur');
      this.nb_images = nb_images;
      this.images = [];
      this.width = width;
      this.height = height;
      this.speed = speed;
      this.count = 0;

      // remplissage des images
      this.feedSs();

      // rendu du slideshow
      this.ss_wrapper = this.render();

      // animation du slideshow
      this.animateSs();
    }
    animateSs = () => {
      setTimeout(() => {
        if(this.count == this.images.length) {
          this.count = 0;
        }
        const img = document.querySelector("img");
        this.ss_wrapper.removeChild(img);
        this.ss_wrapper.appendChild(this.images[this.count]);
        this.count ++;
        this.animateSs();
      }, this.speed);
    }
    render = function(){
      const ss_wrapper = this.createCustomElement("section", document.body, "", {"id": "ss1"});
      ss_wrapper.appendChild(this.images[0]);
      return ss_wrapper;
    }
    createCustomElement = function(tagname, tagparent, tagtext = "", tagattributes = {}) {
      // création d'un élément du dom
      const elt = document.createElement(tagname);
      // insertion de elt comme dernier fils de tagparent
      tagparent.appendChild(elt);
      if(tagtext != "") {
        elt.textContent = tagtext;
      }
      
      for(let key in tagattributes) {
        elt.setAttribute(key, tagattributes[key]);
      }
      return elt;
    }
    feedSs = function() {
      // remplissage du slideshow via la propriété this.images
      for(let i =0; i < this.nb_images; i++) {
        const new_image = this.createImage();
        // on ajoute l'image au tableau this.images[]
        this.images.push(new_image);
      }
      console.log('dans feedSs, this.images : ', this.images);
    }
    createImage = function() {
      // création d'une image
      const img = document.createElement("img");
      img.setAttribute("src",`https://picsum.photos/${this.width}/${this.height}?id=${Math.random()*1000}`);
  
      return img;
    }
  }
  
  const ss = new Slideshow(12, 600, 400, 500);
})();
/* 
class Slideshow {
    constructor(nb_images = 0, width, height, speed) {
      console.log('Dans le constructeur');
      this.nb_images = nb_images;
      this.images = [];
      this.width = width;
      this.height = height;
      this.speed = speed;

      // remplissage des images
      this.feedSs();

      // rendu du slideshow
      this.ss_wrapper = this.render();

      // animation du slideshow
      this.animateSs();
    }
    animateSs = function() {
      let first_img = document.querySelector("#ss > img");
      setTimeout(() => {
        this.ss_wrapper.appendChild(first_img);
        this.animateSs();// appel récurssif
      }, this.speed);
      
      
    }
    render = function() {
      console.log('Dans le render');
      // Rendu du conteneur du slideshow
      const ss_wrapper = this.createCustomElement("section", document.body, "", {"id": "ss"});
      ss_wrapper.style.width = `${this.width}px`;
      ss_wrapper.style.height = `${this.height}px`;
      ss_wrapper.style.overflow = "hidden";

      // Ajout de toutes les images dans le conteneur du slideshow
      for(let image of this.images) {
        ss_wrapper.appendChild(image);
      }
      return ss_wrapper;
    }

    feedSs = function() {
      for(let i = 0; i < this.nb_images; i++) {
        const dom_img = this.createImage();
        this.images.push(dom_img);
      } 
      console.log('images', this.images[0]);
    }
    createImage = function(src) {
      // création d'une image
      const img = document.createElement("img");
      img.setAttribute("src", `https://picsum.photos/${this.width}/${this.height}?id=` + (Math.random()*1000));
      
      return img;
    }
    createCustomElement = function(tagname, tagparent, tagtext = "", tagattributes = {}) {
      // création d'un élément du dom
      const elt = document.createElement(tagname);
      // insertion de elt comme dernier fils de tagparent
      tagparent.appendChild(elt);
      if(tagtext != "") {
        elt.textContent = tagtext;
      }
      
      for(let key in tagattributes) {
        elt.setAttribute(key, tagattributes[key]);
      }
      return elt;
    }
  }
  const ss = new Slideshow(4,400,300,3000);
*/

