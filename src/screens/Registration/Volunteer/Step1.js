import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { FormSectionTitle, FormField, FormInput, FormSelect } from 'src/components'
import { Icon, Text } from 'native-base'
import Color from 'src/constants/Color'

import Wizard from './Wizard'

function Step1 () {
	const [ achievementFields, setAchievementFields ] = useState([{ value: null }])
	const [ assignmentFields, setAssignmentFields ] = useState([{ value: null }])
	const [ trainingFields, setTrainingFields ] = useState([{ value: null }])

	function handleAdd(type) {
		let values = null
		switch (type) {
			case 1:
				values = [...achievementFields]
				values.push({ value: null });
				setAchievementFields(values);
				break
			
			case 2:
				values = [...assignmentFields]
				values.push({ value: null });
				setAssignmentFields(values);
				break
		
			default:
				values = [...trainingFields]
				values.push({ value: null });
				setTrainingFields(values);
				break;
		}
	}

  function handleRemove(type, i) {
		let values = null
		switch (type) {
			case 1:
				values = [...achievementFields];
				values.splice(i, 1);
				setAchievementFields(values);
				break
			
			case 2:
				values = [...assignmentFields]
				values.splice(i, 1);
				setAssignmentFields(values);
				break
		
			default:
				values = [...trainingFields]
				values.splice(i, 1);
				setTrainingFields(values);
				break;
		}
	}
	
	function handlePressed (i, type) {
		if (i === 0) {
			return handleAdd(type)
		}
		return handleRemove(type, i)
	}

  return (
    <Wizard.Page>
			<FormSectionTitle text='Keanggotaan' />
			{/* <FormField label='Pilih Jenis Anggota'> */}
				<FormSelect
					options={[
						{ value: 'palang merah remaja', label: 'Palang Merah Remaja' },
						{ value: 'korps sukarela', label: 'Korps Sukarela' },
						{ value: 'tenaga sukarela', label: 'Tenaga Sukarela' },
						{ value: 'pengurus', label: 'Pengurus' }
					]}
					name='parentMember'
				/>
			{/* </FormField> */}
			{/* <FormField label='Pilih Sub Jenis Anggota'> */}
				<FormSelect
					options={[
						{ value: 'mula', label: 'Mula' },
						{ value: 'madya', label: 'Madya' },
						{ value: 'wira', label: 'Wira' },
					]}
					name='subMember'
				/>
			{/* </FormField> */}


			<FormSectionTitle text='Unit PMI Kab-Kota' />
			{/* <FormField label='Kabupaten/Kota'> */}
				<FormSelect
					options={[
						{ value: 'Jakarta Barat', label: 'Jakarta Barat' },
						{ value: 'Jakarta Pusat', label: 'Jakarta Pusat' },
						{ value: 'Jakarta Selatan', label: 'Jakarta Selatan' },
						{ value: 'Jakarta Timur', label: 'Jakarta Timur' },
						{ value: 'Jakarta Utara', label: 'Jakarta Utara' },
						{ value: 'Kepulauan Seribu', label: 'Kepulauan Seribu' },
					]}
					name='city'
				/>
			{/* </FormField> */}
			{/* <FormField label='Unit'> */}
				<FormSelect
					options={[
						{ value: 'SDN 1 JKT', label: 'SDN 1 JKT' },
						{ value: 'madya', label: 'Madya' },
						{ value: 'wira', label: 'Wira' },
					]}
					name='unit'
				/>
			{/* </FormField> */}


			<FormSectionTitle text='Pengalaman' />
			{/* {achievementFields.map((field, idx) => {
				return (
					<FormField key={`${field}-${idx}`} label='Penghargaan' name={`achievements[${idx}]`}>
						<FormInput name={`achievements[${idx}]`} />
						<TouchableOpacity onPress={() => handlePressed(idx, 1)}>
							<Icon
								name={idx === 0 ? 'md-add':'md-close'}
								style={{ color: idx === 0 ? Color.green:Color.red }}
							/>
						</TouchableOpacity>
					</FormField>
				)
			})}
			{assignmentFields.map((field, idx) => {
				return (
					<FormField key={`${field}-${idx}`} label='Penugasan' name={`assignments[${idx}]`}>
						<FormInput name={`assignments[${idx}]`} />
						<TouchableOpacity onPress={() => handlePressed(idx, 2)}>
							<Icon
								name={idx === 0 ? 'md-add':'md-close'}
								style={{ color: idx === 0 ? Color.green:Color.red }}
							/>
						</TouchableOpacity>
					</FormField>
				)
			})}
			{trainingFields.map((field, idx) => {
				return (
					<FormField key={`${field}-${idx}`} label='Pelatihan' name={`trainings[${idx}]`}>
						<FormInput name={`trainings[${idx}]`} />
						<TouchableOpacity onPress={() => handlePressed(idx, 3)}>
							<Icon
								name={idx === 0 ? 'md-add':'md-close'}
								style={{ color: idx === 0 ? Color.green:Color.red }}
							/>
						</TouchableOpacity>
					</FormField>
				)
			})} */}
			{/* <FormField label='Spesialisasi' name='specialization'> */}
				<FormInput name='specialization' />
			{/* </FormField> */}
			{/* <FormField label='Keterampilan Khusus' name='skill'> */}
				<FormInput name='skill' />
			{/* </FormField> */}
    </Wizard.Page>
  )
}

export default Step1
