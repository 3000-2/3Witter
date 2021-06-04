import React from "react";
import {
  faHome,
  faAddressBook,
  faHeart,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./header.module.css";

const Header = ({ user, GoHome, ChangePageHandle, LogoutHandle }) => {
  return (
    <header className={styles.header}>
      <div className={styles.headerWrap}>
        <img className={styles.logo} src="/images/logo.png" onClick={GoHome} />
        <ul>
          <li className={styles.headerList}>
            <button className={styles.btn} onClick={ChangePageHandle}>
              <FontAwesomeIcon className={styles.icon} icon={faHome} />홈
            </button>
          </li>
          <li className={styles.headerList}>
            <button className={styles.btn} onClick={ChangePageHandle}>
              <FontAwesomeIcon className={styles.icon} icon={faAddressBook} />
              친구
            </button>
          </li>
          <li className={styles.headerList}>
            <button className={styles.btn} onClick={ChangePageHandle}>
              <FontAwesomeIcon className={styles.icon} icon={faHeart} />
              좋아요
            </button>
          </li>
          <li className={styles.headerList}>
            <button className={styles.btn} onClick={ChangePageHandle}>
              <FontAwesomeIcon className={styles.icon} icon={faUser} />
              프로필
            </button>
          </li>
        </ul>
        <div className={styles.profile}>
          <img className={styles.profileImg} src="/images/logo.png" />
          <div className={styles.contents}>
            <div className={styles.text}>{user.displayName}</div>
            <div className={styles.text}>{user.email}</div>
          </div>
          <button className={styles.btn} onClick={LogoutHandle}>
            로그아웃
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
