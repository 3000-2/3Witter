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
        <ul>
          <img
            className={styles.logo}
            src="/images/logo.png"
            onClick={GoHome}
          />
          <li className={styles.headerList}>
            <button className={styles.btn} onClick={ChangePageHandle}>
              <FontAwesomeIcon className={styles.icon} icon={faHome} />
              <span className={styles.txt}>홈</span>
            </button>
          </li>
          <li className={styles.headerList}>
            <button className={styles.btn} onClick={ChangePageHandle}>
              <FontAwesomeIcon className={styles.icon} icon={faAddressBook} />
              <span className={styles.txt}>친구</span>
            </button>
          </li>
          <li className={styles.headerList}>
            <button className={styles.btn} onClick={ChangePageHandle}>
              <FontAwesomeIcon className={styles.icon} icon={faHeart} />
              <span className={styles.txt}>좋아요</span>
            </button>
          </li>
          <li className={styles.headerList}>
            <button className={styles.btn} onClick={ChangePageHandle}>
              <FontAwesomeIcon className={styles.icon} icon={faUser} />
              <span className={styles.txt}>프로필</span>
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
