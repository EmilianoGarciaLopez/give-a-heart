import client from './sanity-client.js';
import imageUrlBuilder from '@sanity/image-url'

const query = `*[_type == "Hearts"] {
  name,
  image,
  bio,
}`;

const builder = imageUrlBuilder(client)

function urlFor(source) {
  return builder.image(source)
}

client.fetch(query).then((heart) => {
    heart.forEach((heart) => {
      console.log(`author:${heart.name} \n bio:${heart.bio} \n image:${urlFor(heart.image).url()}`)
    })
  })