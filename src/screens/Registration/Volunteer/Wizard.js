import React from 'react'
import { TouchableOpacity } from 'react-native'
import { View, Text, Button } from 'native-base'
import { Formik } from 'formik'
import Color from 'src/constants/Color'
import { RedButton } from 'src/components'
import * as Yup from "yup"

class Wizard extends React.Component {
	static Page = ({ children }) => children;

	constructor(props) {
		super(props)
		this.state = {
			page: 0,
			values: props.initialValues,
		}
	}

	next = values =>
		this.setState(state => ({
			page: Math.min(state.page + 1, this.props.children.length - 1),
			values,
		}))

	previous = () =>
		this.setState(state => ({
			page: Math.max(state.page - 1, 0),
		}))

	validate = values => {
		const activePage = React.Children.toArray(this.props.children)[
			this.state.page
		]
		return activePage.props.validate ? activePage.props.validate(values) : {}
  }
  
  Step1Schema = Yup.object().shape({
    parentMember: Yup.string().required("Parent Member Is Required"),
    subMember: Yup.string().required("Sub Member Is Required"),
  })
  Step2Schema = Yup.object().shape({
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

  schemaArray = [this.Step1Schema, this.Step2Schema]

	handleSubmit = (values, bag) => {
		const { children, onSubmit } = this.props
		const { page } = this.state
		const isLastPage = page === React.Children.count(children) - 1
		if (isLastPage) {
			return onSubmit(values, bag)
		} else {
			bag.setTouched({})
			bag.setSubmitting(false)
			this.next(values)
		}
	}

	render() {
		const { children } = this.props
		const { page, values } = this.state
		const activePage = React.Children.toArray(children)[page]
		const isLastPage = page === React.Children.count(children) - 1
		return (
			<Formik
				initialValues={values}
				validate={this.validate}
        onSubmit={this.handleSubmit}
        enableReinitialize
        validationSchema={this.schemaArray[page]}
				render={({ values, handleSubmit, isSubmitting, handleReset }) => (
					<>
						<View style={{ alignSelf: 'center', color: Color.lightGray, paddingBottom: 25 }}>
							<Text>Langkah {page + 1} dari {React.Children.count(this.props.children)}</Text>
						</View>
						{activePage}
						<View style={{ marginBottom: 45 }}>
							{!isLastPage && <RedButton text='Lanjutkan' onPress={handleSubmit} style={{ marginTop: 30, marginBottom: 10 }} /> }
							{isLastPage && (
								<>
									<Button
										bordered
										rounded
										style={{ borderColor: Color.red, marginTop: 10, textAlign: 'center', width: '100%' }}
										onPress={handleSubmit}
									>
										<Text style={{ color: Color.red, width: '100%', textAlign: 'center' }}>Nanti Saja</Text>
									</Button>
									<RedButton
										text='Upload Foto'
										onPress={handleSubmit}
										disabled={isSubmitting}
										style={{ marginTop: 20, marginBottom: 20 }}
									/>
								</>
							)}
							{page > 0 && (
                <TouchableOpacity onPress={this.previous} style={{ alignSelf: 'center' }}>
									<Text style={{ color: Color.darkGray, fontSize: 13 }}>Sebelumnya</Text>
								</TouchableOpacity>
              )}
						</View>
					</>
				)}
			/>
		);
	}
}

export default Wizard