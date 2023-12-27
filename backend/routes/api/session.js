const express = require('express')
const { multiplePublicFileUpload, multipleMulterUpload } = require('../../awsS3');
const { Photo } = require('../../db/models');
const watermark = require('jimp-watermark');

const router = express.Router();

router.post('/', multipleMulterUpload('files'), async (req, res) => {
    const photosUrls = await multiplePublicFileUpload(req.files);
    const photos = [];
    for (const photoURL of photosUrls) {
        const newPhoto = await Photo.create({
            eventId: req.body.eventId,
            photoURL
        });
        await newPhoto.save();
        // photos.push({ ...newPhoto, photoURL: watermark.embedWatermarkWithCb(photoURL, {
        //     'image': 'https://i.etsystatic.com/19903187/r/il/e07edf/3734601231/il_570xN.3734601231_kbjg.jpg'
        // }) });
        photos.push(newPhoto);
    };
    return res.json(photos);
});

router.get('/', async (req, res) => {
    const photos = await Photo.findAll();
    const watermarkedPhotos = [];
    for (const photo of photos) {
        const watermarkedPhotoURL = await watermark.addWatermark(photo.photoURL, 'https://i.etsystatic.com/19903187/r/il/e07edf/3734601231/il_570xN.3734601231_kbjg.jpg');
        watermarkedPhotos.push({ ...photo.dataValues, photoURL: watermarkedPhotoURL });
    };
    // const watermarkedPhotos = photos.map(photo => ({
    //     ...photo.dataValues,
    //     photoURL: watermark.addWatermark(photo.photoURL, 'https://i.etsystatic.com/19903187/r/il/e07edf/3734601231/il_570xN.3734601231_kbjg.jpg')
    // }));
    // return res.json(watermarkedPhotos);
    console.log(watermarkedPhotos);
    return res.json(photos);
});

module.exports = router;
