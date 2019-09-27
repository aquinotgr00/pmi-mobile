import * as Yup from 'yup'

export default Yup.object().shape({
  name: Yup.string()
    .max(255, 'Maksimum 255 huruf')
    .required('Nama tidak boleh kosong'),
  email: Yup.string()
    .email('Email tidak valid')
    .required('Email tidak boleh kosong'),
  phone: Yup.string()
    .required('Nomor HP tidak boleh kosong'),
  items: Yup.array()
    .of(
      Yup.object().shape({
        type: Yup.string().required('Tipe tidak boleh kosong'),
        name: Yup.string().required('Nama barang tidak boleh kosong'),
        amount: Yup.string().required('Jumlah barang tidak boleh kosong')
      })
    )
    .required('Harus ada barang yang didonasikan')
})
