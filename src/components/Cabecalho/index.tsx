import React from "react";
import Image from "next/image";
import styles from "../../styles/cabecalho.module.scss";
import foto from "../../../public/Logomark.png";

export const Header = () => {
  const currentDate = new Date();
  const formattedDate = new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(currentDate);

  return (
    <div className={styles.cabecalho}>
      
      <div className={styles.boxImagem}>
        <Image src={foto} alt="Logo" width={50} height={50} />
        <div>
          <h3>FocalPoint</h3>
        </div>
      </div>

      <div className={styles.text}>
        <h1>Bem-vindo de volta, Marcus</h1>
      </div>

      <div className={styles.subtext}>
        <p>{formattedDate}</p>
      </div>
    </div>
  );
};
