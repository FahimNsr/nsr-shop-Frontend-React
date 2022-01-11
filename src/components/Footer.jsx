import React from "react";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <div>
      <footer className="footer mt-3 py-2 bg-dark rounded-top fixed-bottom">
        <div className="container text-center">
          <span className="text-muted">© {t("footer")}</span>
        </div>
      </footer>
    </div>
  );
}
