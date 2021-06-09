import React, { memo, useRef, useState } from "react";
import Swal from "sweetalert2";
import Mheader from "../header/mheader";
import UploadImage from "../service/uploadImage";
import styles from "./profile.module.css";

const uploadImage = new UploadImage();
const Profile = memo(({ user, profile, SubmitProfileHandle }) => {
  const [image, setImage] = useState(profile[user.uid]);
  const [loading, setLoading] = useState();
  const ref = useRef();
  const nameRef = useRef();

  if (!profile && !user) {
    return "로딩...";
  }

  const { name, email, imageURL } = profile[user.uid];

  const onClick = (e) => {
    e.preventDefault();
    ref.current.click();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "저장할까요?",
      showCancelButton: true,
      cancelButtonText: "아니요!",
      cancelButtonColor: "#ddd",
      confirmButtonText: "네!",
      confirmButtonColor: "#EEC7C6",
    }).then((result) => {
      if (result.value) {
        SubmitProfileHandle({
          uid: user.uid,
          name: nameRef.current.value || name,
          email: user.email,
          imageURL: image.imageURL || "",
        });
      }
    });
  };

  const onChange = async (e) => {
    e.preventDefault();
    setLoading(true);
    const file = e.target.files[0];

    const uploaded = await uploadImage.upload(file, "profile");
    setImage({
      name: uploaded.original_filename,
      imageURL: uploaded.secure_url,
    });
    setLoading(false);
  };

  return (
    <>
      <Mheader page="프로필" />
      <div className={styles.profile}>
        <div className={styles.form}>
          <div className={styles.title}>이메일</div>
          <div className={styles.text}>{email}</div>
          <div className={styles.title}>닉네임 변경</div>
          <span className={styles.text}>
            현재 닉네임 : {name}　{">"}
          </span>
          <input
            className={styles.inputName}
            ref={nameRef}
            type="text"
            placeholder="변경할 닉네임"
          />
          <div className={styles.title}>프로필 이미지</div>
          {!loading && (
            <img
              className={styles.image}
              src={image.imageURL || imageURL || ""}
              onClick={onClick}
              alt="profile"
            />
          )}
          {loading && <div className={styles.loading} />}
          <input
            className={styles.imageInput}
            ref={ref}
            type="file"
            accept="image/*"
            onChange={onChange}
          />
          <button className={styles.Btn} onClick={onClick}>
            이미지 업로드
          </button>
          <button className={styles.Btn} onClick={onSubmit}>
            저장하기
          </button>
        </div>
      </div>
    </>
  );
});

export default Profile;
