import ImageKit from "@imagekit/nodejs";
import config from "./config.js";

const imagekit = new ImageKit({
    privateKey: config.IMAGEKIT_PRIVATE_KEY
});

export default imagekit;