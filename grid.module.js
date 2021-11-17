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
    imageNode.src = urlFor(heart.image).width(400).height(400).url();
    gridElement.appendChild(imageNode);
  });
});
