import * as Yup from 'yup'
import localeID from 'src/validators/setLocaleID.js'
Yup.setLocale(localeID)

export default Yup.object().shape({
  name: Yup.string()
    .max(255, 'Maksimum 255 huruf')
    .required(),
  email: Yup.string()
    .email('Email tidak valid')
    .required(),
  phone: Yup.string()
    .required(),
  items: Yup.array()
    .of(
      Yup.object().shape({
        type: Yup.string().required(),
        name: Yup.string().required(),
        amount: Yup.string().required(),
      })
    )
    .required()
})
