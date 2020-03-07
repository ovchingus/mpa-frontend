import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Input, Select } from 'semantic-ui-react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import * as patientThunks from '../../redux/thunks/patient';

const genderOptions = [
    { key: 'm', text: 'Male', value: 'male' },
    { key: 'f', text: 'Female', value: 'female' }
];

function NewPatientFormContainer (props) {
    const [state, setState] = useState({
        nameVal: '',
        genderVal: undefined,
        birthDayVal: null,

        nameChanged: false,
        genderChanged: false,
        birthDayChanged: false

    });

    const [isNotValid, setValid] = useState({
        name: false,
        gender: false,
        birthDate: false
    });

    function changeValidate (value, attr, validate) {
        let isValid;
        switch (attr) {
        case 'name': {
            if (value.trim() === '') {
                validate[attr] = true;
                isValid = false;
            } else {
                validate[attr] = false;
                isValid = true;
            }
            break;
        }
        case 'gender': {
            if (value === undefined) {
                validate[attr] = true;
                isValid = false;
            } else {
                validate[attr] = false;
                isValid = true;
            }
            break;
        }
        case 'birthDate': {
            if (value === null) {
                validate[attr] = true;
                isValid = false;
            } else {
                validate[attr] = false;
                isValid = true;
            }
            break;
        }
        default:
            break;
        }
        setValid(validate);
        return isValid;
    }

    function savePatient (event) {
        event.preventDefault();
        const validate = { ...isNotValid };
        const isValindName = changeValidate(state.nameVal, 'name', validate);
        const isValidGender = changeValidate(state.genderVal, 'gender', validate);
        const isValidBirthDate = changeValidate(state.birthDayVal, 'birthDate', validate);
        const stateCopy = { ...state, nameVal: state.nameVal.trim(), nameChanged: true, genderChanged: true, birthDayChanged: true };
        setState(stateCopy);
        if (isValindName && isValidGender && isValidBirthDate) {
            const patientData = {
                name: stateCopy.nameVal,
                birthDate: stateCopy.birthDayVal.toISOString().substring(0, 10),
                gender: stateCopy.genderVal,
                diseaseId: 1,
                doctorId: 1
            };
            console.log(patientData);
            props.create(patientData);
            alert('Pacient successfully created!');
        } else {
            alert('Please, fill all fields!');
        }
    };

    function handleOnChange (value, attr) {
        const validate = { ...isNotValid };
        changeValidate(value, attr, validate);
        switch (attr) {
        case 'name': {
            setState({ ...state, nameVal: value, nameChanged: true });
            break;
        }
        case 'gender': {
            setState({ ...state, genderVal: value, genderChanged: true });
            break;
        }
        case 'birthDate': {
            setState({ ...state, birthDayVal: value, birthDayChanged: true });
            break;
        }
        default:
            break;
        }
    }

    return (
        <section className={'NewPatientForm'}>
            <h2>Создать нового пациента</h2>
            <Form>
                <Form.Field
                    id='field-name'
                    error={isNotValid.name && state.nameChanged}
                    label="Name"
                    type="text"
                    control={Input}
                    value={state.nameVal}
                    onChange={(event) => handleOnChange(event.target.value, 'name')} />
                <Form.Field
                    id='field-gender'
                    error={isNotValid.gender && state.genderChanged}
                    label="Gender"
                    control={Select}
                    options={genderOptions}
                    onChange={(event) => handleOnChange(event.target.innerText, 'gender')} />
                <Form.Field
                    id='field-date'
                    error={isNotValid.birthDate && state.birthDayChanged}
                >
                    <label>Age</label>
                    <SemanticDatepicker
                        onDateChange={(date) => handleOnChange(date, 'birthDate')}
                    />
                </Form.Field>
                < Button
                    positive
                    icon='checkmark'
                    content="Save"
                    type='submit'
                    onClick={savePatient}
                />
            </Form>

        </section>
    );
}

export const NewPatientForm = connect(
    null,
    {
        create: patientThunks.create
    }
)(NewPatientFormContainer);
