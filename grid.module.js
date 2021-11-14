import client from '../sanity-client';

const query = ``;
const params = {};

client.fetch(query, params).then((heart) => {
    picture.forEach((heart) => {
      console.log(`author:${heart.name} \n bio:${heart.bio}`)
    })
  })