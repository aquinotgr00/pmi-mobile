import * as yup from 'yup'

export default yup.object().shape({
	name: yup
		.string()
		.required('Nama tidak boleh kosong'),
	email: yup
		.string()
		.email('Email tidak valid')
		.required('Email tidak boleh kosong'),
	phone: yup
		.string()
		.required('Nomor HP tidak boleh kosong'),
	amount: yup
		.number('Hanya boleh memasukan angka')
		.required('Kolom tidak boleh kosong'),
})