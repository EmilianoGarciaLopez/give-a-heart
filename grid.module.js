import client from "./sanity-client.js";
import imageUrlBuilder from "@sanity/image-url";

const query = `*[_type == "Hearts"] {
  name,
  image,
  bio,
}`;

const gridElement = document.getElementById("gridContainer");

const builder = imageUrlBuilder(client);

function urlFor(source) {
  return builder.image(source);
}

client.fetch(query).then((heart) => {
  heart.forEach((heart) => {
    let imageNode = document.createElement("img");
    imageNode.src = urlFor(heart.image).width(300).height(300).url();
    gridElement.appendChild(imageNode);

    imageNode.addEventListener("click", () => {
      let popupNode = document.createElement("div");
      popupNode.classList.add("popup");
      let nameNode = document.createElement("h2");
      nameNode.innerHTML = heart.name;
      let bioNode = document.createElement("p");
      bioNode.innerHTML = heart.bio;
      let popupImage = document.createElement("img");
      popupImage.src = urlFor(heart.image).width(500).height(500).url();
      document.body.appendChild(popupNode);
      popupNode.appendChild(popupImage, nameNode, bioNode);
    });
  });
});
