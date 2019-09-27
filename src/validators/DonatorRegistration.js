import * as Yup from "yup"

export default Yup.object().shape({
  name: Yup.string().required('Nama tidak boleh kosong'),
  email: Yup.string().email('Email tidak valid').required('Email tidak boleh kosong'),
  phone: Yup.string().required('Nomor HP tidak boleh kosong'),
  password: Yup.string().required('Password tidak boleh kosong'),
  password_confirmation: Yup.string().required('Mohon konfirmasi Password'),
  dob: Yup.string().required('Mohon memasukan tanggal lahir'),
  address: Yup.string().required('Alamat tidak boleh kosong'),
  province: Yup.string().required('Provinsi tidak boleh kosong'),
  city: Yup.string().required('Kabupaten/Kota tidak boleh kosong'),
  subdistrict: Yup.string().required('Kecamatan tidak boleh kosong'),
  subdivision: Yup.string().required('Kelurahan/Desa tidak boleh kosong'),
  postal_code: Yup.string().required('Kode Pos tidak boleh kosong'),
  gender: Yup.string().required('Silahkan memilih Gender'),
})