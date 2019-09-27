import * as Yup from "yup"

export default Yup.object().shape({
  email: Yup.string().required('Email tidak boleh kosong'),
  password: Yup.string().required('Password tidak boleh kosong'),
})