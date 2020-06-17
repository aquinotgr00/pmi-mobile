import * as Yup from "yup"
import localeID from 'src/validators/setLocaleID.js'
Yup.setLocale(localeID)

export const Step1Schema = Yup.object().shape({
  parentMember: Yup.string().required(),
  subMember: Yup.string().required(),
  unitCity: Yup.string().required(),
  unit_id: Yup.number().required()
})

export const Step2Schema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  phone: Yup.string().required(),
  password: Yup.string().required(),
  password_confirmation:
    Yup.string()
    .required(),
  birthplace: Yup.string().required(),
  dob: Yup.date().required(),
  gender: Yup.string().required(),
  blood_type: Yup.string().required(),
  religion: Yup.string().required(),
  address: Yup.string().required(),
  city: Yup.string().required(),
  subdistrict: Yup.string().required(),
  subdivision: Yup.string().required(),
  postal_code: Yup.number().required(),
})