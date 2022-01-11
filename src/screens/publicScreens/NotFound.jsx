import React from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

export default function NotFound() {
  const { t } = useTranslation();
  return (
    <div className=" text-center mt-5">
      <Helmet>
        <title>404 | {t("not-found")}! </title>
      </Helmet>
      <h3>404</h3>
      <h3>{t("not-found")}!</h3>
    </div>
  );
}
