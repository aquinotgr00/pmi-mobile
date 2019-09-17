import React from 'react'
import { TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { FormSectionTitle, FormField, FormInput, FormSelect } from 'src/components'
import { Icon, Text } from 'native-base'
import Color from 'src/constants/Color'
import { connect } from 'formik'
import Wizard from './Wizard'

class Step1 extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			achievementFields: [{ value: null }],
			assignmentFields: [{ value: null }],
      trainingFields: [{ value: null }],
      membershipData: [],
      subMemberData: [],
      subMemberOptions: [],
      cityData: [],
      unitData: [],
      unitOptions: [],
		}

		this.handleAdd = this.handleAdd.bind(this)
		this.handleRemove = this.handleRemove.bind(this)
		this.handlePressed = this.handlePressed.bind(this)
    this.getParentMemberData = this.getParentMemberData.bind(this)
    this.embbedMembership = this.embbedMembership.bind(this)
    this.embbedCity = this.embbedCity.bind(this)
	}

	componentDidMount () {
		this.getParentMemberData()
	}

	handleAdd (type) {
		let values = null
		switch (type) {
			case 1:
				values = [...this.state.achievementFields]
        values.push({ value: null });
        this.setState({achievementFields: values})
				break
			
			case 2:
				values = [...this.state.assignmentFields]
				values.push({ value: null })
        this.setState({assignmentFields: values})
				break
		
			default:
				values = [...this.state.trainingFields]
				values.push({ value: null })
        this.setState({trainingFields: values})
				break;
		}
	}

	handleRemove (type, i) {
		let values = null
		switch (type) {
			case 1:
				values = [...this.state.achievementFields]
				values.splice(i, 1);
        this.setState({achievementFields: values})
				break
			
			case 2:
				values = [...this.state.assignmentFields]
				values.splice(i, 1);
        this.setState({assignmentFields: values})
				break
		
			default:
				values = [...this.state.trainingFields]
				values.splice(i, 1);
        this.setState({trainingFields: values})
				break;
		}
	}
	
	handlePressed (i, type) {
		if (i === 0) {
			return this.handleAdd(type)
		}
		return this.handleRemove(type, i)
	}

	getParentMemberData = async () => {
		try {
			const memberResponse = await AsyncStorage.getItem('memberships_data')
			const cityResponse = await AsyncStorage.getItem('cities_data')
			this.embbedMembership(JSON.parse(memberResponse))
			this.embbedCity(JSON.parse(cityResponse))
		} catch (err) {
			console.log(err.response)
		}
  }

  embbedMembership (parsedValue) {
    const membershipData = []
    const subMemberData = []
    parsedValue.filter(member => {
      if (member.parent_id === null) {
        membershipData.push({
          label: member.name,
          value: member.name
        })
        subMemberData[member.name] = []
        member.sub_member.filter(sub => {
          subMemberData[member.name].push({
            label: sub.name,
            value: sub.name
          })
        })
      }
    })
    this.setState({ membershipData, subMemberData })
  }

  embbedCity (parsedValue) {
    const cityData = []
    const unitData = []
    parsedValue.filter(area => {
      cityData.push({
        label: area.name,
        value: area.name
      })
      unitData[area.name] = []
      area.units.filter(unit => {
        unitData[area.name].push({
          label: unit.name,
          value: unit.id
        })
      })
    })
    this.setState({ cityData, unitData })
  }

	render () {
    const { setFieldValue, errors } = this.props.formik
		return (
      <Wizard.Page>
				<FormSectionTitle text='Keanggotaan' />
        <FormSelect
          onChange={val => {
            setFieldValue('parentMember', val)
            this.setState({ subMemberOptions: this.state.subMemberData[val] })
          }}
          placeholder='Pilih Jenis Anggota'
          placeholderStyle={{color: errors.parentMember !== undefined ? Color.red : Color.darkGray}}
          style={{ borderBottomWidth: 1, borderBottomColor: Color.lightGray }}
          options={this.state.membershipData}
          iconName={errors.parentMember ? 'alert':'arrow-down'}
          name='parentMember'
        />
        {errors.parentMember && <Text style={{ fontSize: 10, color: 'red' }}>{errors.parentMember}</Text>}
        <FormSelect
          options={this.state.subMemberOptions}
          placeholder='Pilih Sub Jenis Anggota'
          placeholderStyle={{color: errors.subMember !== undefined ? Color.red : Color.darkGray}}
          style={{ borderBottomWidth: 1, borderBottomColor: Color.lightGray }}
          iconName={errors.subMember ? 'alert':'arrow-down'}
          name='subMember'
        />
        {errors.subMember && <Text style={{ fontSize: 10, color: 'red' }}>{errors.subMember}</Text>}


				<FormSectionTitle text='Unit PMI Kab-Kota' style={{marginTop: 40}} />
				<FormField label='Kabupaten/Kota' name='unitCity'>
					<FormSelect
            onChange={val => {
              setFieldValue('unitCity', val)
              this.setState({ unitOptions: this.state.unitData[val] })
            }}
						options={this.state.cityData}
						name='unitCity'
					/>
				</FormField>
				<FormField label='Unit' name='unit_id'>
					<FormSelect
						options={this.state.unitOptions}
						name='unit_id'
					/>
				</FormField>

				<FormSectionTitle text='Pengalaman' style={{marginTop: 40}} />
				{this.state.achievementFields.map((field, idx) => {
					return (
            <FormField key={`${field}-${idx}`} label='Penghargaan' name={`achievements[${idx}]`}>
							<FormInput name={`achievements[${idx}]`} />
							<TouchableOpacity onPress={() => this.handlePressed(idx, 1)}>
								<Icon
									name={idx === 0 ? 'md-add':'md-close'}
									style={{ color: idx === 0 ? Color.green:Color.red }}
								/>
							</TouchableOpacity>
						</FormField>
					)
				})}
				{this.state.assignmentFields.map((field, idx) => {
					return (
						<FormField key={`${field}-${idx}`} label='Penugasan' name={`assignments[${idx}]`}>
							<FormInput name={`assignments[${idx}]`} />
							<TouchableOpacity onPress={() => this.handlePressed(idx, 2)}>
								<Icon
									name={idx === 0 ? 'md-add':'md-close'}
									style={{ color: idx === 0 ? Color.green:Color.red }}
								/>
							</TouchableOpacity>
						</FormField>
					)
				})}
				{this.state.trainingFields.map((field, idx) => {
					return (
						<FormField key={`${field}-${idx}`} label='Pelatihan' name={`trainings[${idx}]`}>
							<FormInput name={`trainings[${idx}]`} />
							<TouchableOpacity onPress={() => this.handlePressed(idx, 3)}>
								<Icon
									name={idx === 0 ? 'md-add':'md-close'}
									style={{ color: idx === 0 ? Color.green:Color.red }}
								/>
							</TouchableOpacity>
						</FormField>
					)
				})}
				<FormField floatingLabel label='Spesialisasi' name='specialization' />
				<FormField floatingLabel label='Keterampilan Khusus' name='skill' />
			</Wizard.Page>
		)
	}
}

export default connect(Step1)
