import * as Yup from 'yup'

export default Yup.object().shape({
  name: Yup.string()
    .max(255, 'Maksimum 255 huruf')
    .required('Harus diisi'),
  email: Yup.string()
    .email('Alamat email belum benar')
    .required('Harus diisi'),
  phone: Yup.string()
    .required('Harus diisi'),
  items: Yup.array()
    .of(
      Yup.object().shape({
        type: Yup.string().required('Harus diisi'),
        name: Yup.string().required('Harus diisi'),
        amount: Yup.string().required('Harus diisi')
      })
    )
    .required('Harus ada barang yang didonasikan')
})
