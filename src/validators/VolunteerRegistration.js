import * as Yup from "yup"

export const Step1Schema = Yup.object().shape({
  parentMember: Yup.string().required('Mohon mengisi Jenis Anggota'),
  unitCity: Yup.string().required('Mohon memilih Kabupaten/Kota'),
  unit_id: Yup.number().required('Mohon memilih Unit')
})

export const Step2Schema = Yup.object().shape({
  name: Yup.string().required('Nama tidak boleh kosong'),
  email: Yup.string().email('Email tidak valid').required('Email tidak boleh kosong'),
  phone: Yup.string().required('Nomor HP tidak boleh kosong'),
  password: Yup.string().required('Password tidak boleh kosong'),
  password_confirmation:
    Yup.string()
    .required('Mohon konfirmasi Password'),
  birthplace: Yup.string().required('Tempat lahir tidak boleh kosong'),
  dob: Yup.string().required('Mohon memasukan tanggal lahir'),
  gender: Yup.string().required('Mohon untuk memilih Gender'),
  blood_type: Yup.string().required('Golongan darah tidak boleh kosong'),
  religion: Yup.string().required('Mohon memilih Agama'),
  address: Yup.string().required('Alamat tidak boleh kosong'),
  city: Yup.string().required('Kabupaten/Kota tidak boleh kosong'),
  subdistrict: Yup.string().required('Kecamatan tidak boleh kosong'),
  subdivision: Yup.string().required('Kelurahan/Desa tidak boleh kosong'),
  postal_code: Yup.number().required('Kode Pos tidak boleh kosong'),
})