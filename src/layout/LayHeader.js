import { Layout } from "antd";
import { Link } from "react-router-dom";
import style from "./style.module.css";
import Logo from "../assets/logo.svg";

const { Header } = Layout;

export default function LayHeader() {
  return (
    <Header className={style.header}>
      <div className={style.logo}>
        <Link to="/">
          <img src={Logo} alt="logo" />
          <h1>React-Antd-Admin</h1>
        </Link>
      </div>
    </Header>
  );
}
