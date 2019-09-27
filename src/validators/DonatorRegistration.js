import * as Yup from "yup"
import localeID from './setLocaleID.js'
Yup.setLocale(localeID)

export default Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  phone: Yup.string().required(),
  password: Yup.string().required(),
  password_confirmation: Yup.string().required(),
  dob: Yup.string().required(),
  address: Yup.string().required(),
  province: Yup.string().required(),
  city: Yup.string().required(),
  subdistrict: Yup.string().required(),
  subdivision: Yup.string().required(),
  postal_code: Yup.string().required(),
  gender: Yup.string().required(),
})