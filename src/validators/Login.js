import * as Yup from "yup"
import localeID from 'src/validators/setLocaleID.js'
Yup.setLocale(localeID)

export default Yup.object().shape({
  email: Yup.string().required(),
  password: Yup.string().required(),
})