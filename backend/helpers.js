require('dotenv').config();
const { Storage } = require('@google-cloud/storage');
const { v4 } = require('uuid');

const storage = new Storage();

const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET); // should be your bucket name

/**
 *
 * @param { File } object file object that will be uploaded
 * @description - This function does the following
 * - It uploads a file to the image bucket on Google Cloud
 * - It accepts an object as an argument with the
 *   "originalname" and "buffer" as keys
 */

const uploadImage = (file) => {
  return new Promise((resolve, reject) => {
    const { originalname, buffer } = file;

    let filename = originalname.replace(/ /g, '_');
    const ext = filename.split('.').pop();
    filename = filename.replace(`.${ext}`, '');
    const blob = bucket.file(`${filename}_${v4()}.${ext}`);
    const blobStream = blob.createWriteStream({
      resumable: false,
    });
    blobStream
      .on('finish', () => {
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
        resolve(publicUrl);
      })
      .on('error', (err) => {
        console.log(err);
        reject(`Unable to upload image, something went wrong`);
      })
      .end(buffer);
  });
};

module.exports = uploadImage;
