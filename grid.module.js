import imageUrlBuilder from "@sanity/image-url";
import client from "./sanity-client";
import closeImage from "./images/close.svg";

const query = `*[_type == "Hearts"] | order(_createdAt asc) {
  name,
  image,
  bio,
}`;

const gridElement = document.getElementById("gridContainer");

const builder = imageUrlBuilder(client);

function urlFor(source) {
  return builder.image(source);
}

let count = 0;

async function main() {
  await client.fetch(query).then((heart) => {
    heart.forEach((item) => {
      const imageNode = document.createElement("img");
      imageNode.src = urlFor(item.image).width(300).height(300).url();
      imageNode.alt = `heart image by ${item.name}`;
      gridElement.appendChild(imageNode);
      count++;

      imageNode.addEventListener("click", () => {
        const popupNode = document.createElement("div");
        popupNode.classList.add("popup-content");
        const textNode = document.createElement("div");
        textNode.classList.add("popup-text");
        const nameNode = document.createElement("h2");
        nameNode.innerHTML = item.name || "";
        const bioNode = document.createElement("p");
        bioNode.innerHTML = item.bio || "";
        const popupImage = document.createElement("img");
        popupImage.src = urlFor(item.image).width(500).height(500).url();
        popupImage.alt = `heart image by ${item.name}`;
        const exitNode = document.createElement("img");
        exitNode.src = closeImage;
        exitNode.classList.add("exit");
        popupNode.append(popupImage);
        textNode.append(nameNode, bioNode);
        popupNode.append(textNode, exitNode);
        document.getElementById("popupContainer").appendChild(popupNode);
        document.getElementById("popupContainer").style.display = "flex";
        document.body.style.overflowY = "hidden";

        exitNode.addEventListener("click", () => {
          document.getElementById("popupContainer").removeChild(popupNode);
          document.getElementById("popupContainer").style.display = "none";
          document.body.style.overflowY = "scroll";
        });
      });
    });
  });
}

main().then(() => {
  document.getElementById("counter-id").innerHTML = `All Sold Out`;
});
