import * as Yup from "yup"

export default Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().required(),
  phone: Yup.string().required(),
  password: Yup.string(),
  password_confirmation: Yup.string(),
  dob: Yup.string().required(),
  address: Yup.string().required(),
  province: Yup.string().required(),
  city: Yup.string().required(),
  subdistrict: Yup.string().required(),
  subdivision: Yup.string().required(),
  postal_code: Yup.string().required(),
  gender: Yup.string().required(),
})