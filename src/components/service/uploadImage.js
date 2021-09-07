import axios from "axios";

class UploadImage {
  async upload(file, preset) {
    const data = new FormData();
    data.append("file", file);
    data.append("secure", true);

    if (preset === "profile") {
      data.append("upload_preset", process.env.REACT_APP_UPLOAD_PROFILE_PRESET);
    } else {
      data.append("upload_preset", process.env.REACT_APP_UPLOAD_IMAGES_PRESET);
    }

    const result = await axios({
      method: "post",
      url: process.env.REACT_APP_CLOUD_DB,
      data: data,
    }).then((result) => {
      return result;
    });

    return await result.data;
  }
}

export default UploadImage;
