import React from 'react'
import Marquee from 'react-fast-marquee'
import { useTranslation } from 'react-i18next'

const Marquees = () => {
  const { t } = useTranslation();
  return (
    <Marquee>
         {t("marquee_header")}
    </Marquee>
  )
}

export default Marquees