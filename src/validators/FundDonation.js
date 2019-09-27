import * as yup from 'yup'
import localeID from 'src/validators/setLocaleID.js'
Yup.setLocale(localeID)

export default yup.object().shape({
	name: yup
		.string()
		.required(),
	email: yup
		.string()
		.email()
		.required(),
	phone: yup
		.string()
		.required(),
	amount: yup
		.number()
		.required(),
})