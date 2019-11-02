import React from 'react';
import { connect } from 'react-redux';

class CurrentStateContainer extends React.PureComponent {
    render () {
        const { status } = this.props.patient;
        const { state } = status;
        return (
            <section className="CurrentState">
                <h2>Текущее состояние</h2>
                <h3>{state.name}</h3>
                <div>
                    <h4>Описание</h4>
                    <p>{state.description}</p>
                </div>
                <div>
                    <h4>Анализы</h4>
                    <ul>
                        {status.attributes.length ? status.attributes.map(attr =>
                            <li key={attr.name}>
                                <b>Название:</b> {attr.name}
                                <br/>
                                <b>Результат:</b> {attr.value}
                            </li>)
                            : 'ничего не назначено'}
                    </ul>
                </div>
                <div>
                    <h4>Лекарства</h4>
                    <ul>
                        {status.medicines.length ? status.medicines.map(attr =>
                            <li key={attr.name}>
                                <b>Название:</b> {attr.name}
                                <br/>
                                <b>Доза:</b> {attr.value}
                            </li>)
                            : 'ничего не прописано'}
                    </ul>
                </div>
            </section>);
    }
};

export const CurrentState = connect(
    store => ({
        patient: store.patient
    })
)(CurrentStateContainer);
