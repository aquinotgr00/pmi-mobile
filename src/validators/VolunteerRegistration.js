import * as Yup from "yup"

export const Step1Schema = Yup.object().shape({
  parentMember: Yup.string().required("Parent Member Is Required"),
  subMember: Yup.string().required("Sub Member Is Required"),
})

export const Step2Schema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().required("Email is required"),
  phone: Yup.string().required(),
  password: Yup.string().required(),
  password_confirmation:
    Yup.string()
    .required(),
  birthplace: Yup.string().required(),
  dob: Yup.string().required(),
  gender: Yup.string().required(),
  blood_type: Yup.string().required(),
  religion: Yup.string().required(),
  address: Yup.string().required(),
  city: Yup.string().required(),
  subdistrict: Yup.string().required(),
  subdivision: Yup.string().required(),
  postal_code: Yup.number().required(),
})