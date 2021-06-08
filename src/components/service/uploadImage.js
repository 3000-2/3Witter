class UploadImage {
  async upload(file, preset) {
    const data = new FormData();
    data.append("file", file);

    if (preset === "profile") {
      data.append("upload_preset", process.env.REACT_APP_UPLOAD_PROFILE_PRESET);
    } else {
      data.append("upload_preset", process.env.REACT_APP_UPLOAD_IMAGES_PRESET);
    }

    const result = await fetch(process.env.REACT_APP_CLOUD_DB, {
      method: "POST",
      body: data,
    });

    return await result.json();
  }
}

export default UploadImage;
