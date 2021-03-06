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
          value: member.id
        })
        subMemberData[member.id] = []
        member.sub_member.filter(sub => {
          subMemberData[member.id].push({
            label: sub.name,
            value: sub.id
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
        if (unitData[area.name][unit.membership_id] === undefined) {
          unitData[area.name][unit.membership_id] = []
        }
        unitData[area.name][unit.membership_id].push({
          label: unit.name,
          value: unit.id
        })
      })
    })
    this.setState({ cityData, unitData })
  }

	render () {
    const { setFieldValue, errors, values } = this.props.formik
		return (
      <Wizard.Page>
				<FormSectionTitle text='Keanggotaan' style={{marginTop: 0}} />
        <FormSelect
          onChange={val => {
            setFieldValue('parentMember', val)
            setFieldValue('subMember', '')
            this.setState({ subMemberOptions: this.state.subMemberData[val] })
          }}
          placeholder='Pilih Jenis Anggota'
          options={this.state.membershipData}
          name='parentMember'
        />
        <FormSelect
          options={this.state.subMemberOptions}
          placeholder='Pilih Sub Jenis Anggota'
          name='subMember'
        />


				<FormSectionTitle text='Unit PMI Kab-Kota' />
        <FormSelect
          placeholder='Pilih Kabupaten/Kota'
          onChange={val => {
            setFieldValue('unitCity', val)
            let unitOptions = values.subMember === ''
            ? this.state.unitData[val][values.parentMember]
            : this.state.unitData[val][values.subMember]
            if (unitOptions === undefined) {
              unitOptions = []
            }
            this.setState({ unitOptions })
          }}
          options={this.state.cityData}
          name='unitCity'
        />
        <FormSelect
          placeholder='Pilih Unit'
          options={this.state.unitOptions}
          name='unit_id'
        />

				<FormSectionTitle text='Pengalaman' />
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
