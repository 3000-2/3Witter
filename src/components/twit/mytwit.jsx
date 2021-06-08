import React, { useRef, useState } from "react";
import { Editor } from "react-editor";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import UploadImage from "../service/uploadImage";

import styles from "./mytwit.module.css";

const uploadImage = new UploadImage();

// dayjs 초기화
dayjs.extend(relativeTime);

const Mytwit = ({ user, SubmitTwitHandle }) => {
  const [text, setText] = useState("");
  const [image, setImage] = useState();
  const ref = useRef();
  const imageRef = useRef();
  const { uid } = user;
  const today = dayjs().format("YYYYMMDD");

  const onClick = (e) => {
    e.preventDefault();
    // e.target.reset();
    const date = Date.now();
    const time = today + date;
    const twit = {
      uid,
      time,
      text,
      imageURL: image.imageURL || "",
      favor: {},
    };
    SubmitTwitHandle(twit);
    setText("");
  };

  const onChange = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];

    const uploaded = await uploadImage.upload(file, "image");
    setImage({
      name: uploaded.original_filename,
      imageURL: uploaded.url,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    imageRef.current.click();
  };

  return (
    <div className={styles.twit}>
      <div className={styles.profile}>
        <img className={styles.profileImg} src="/images/logo.png" alt="img" />
      </div>
      <div className={styles.twitForm}>
        {image && image.imageURL && (
          <div className={styles.imgForm}>
            <img src={image.imageURL} alt="image" />
          </div>
        )}
        <Editor
          ref={ref}
          placeholder="오늘은 무슨 일이 있었나요?"
          className={styles.input}
          value={text}
          onChange={setText}
          allowInWebDrop
        />
        <div className={styles.serviceForm}>
          <input
            className={styles.imageInput}
            ref={imageRef}
            type="file"
            accept="image/*"
            onChange={onChange}
          />
          <button className={styles.serviceBtn}>
            <FontAwesomeIcon
              className={styles.icon}
              icon={faImage}
              onClick={onSubmit}
            />
          </button>
          <button className={styles.btn} onClick={onClick}>
            트윗하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Mytwit;
