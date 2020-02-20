import React, { Component } from 'react';
import { Button, Form, Modal, Select } from 'semantic-ui-react';
import './Predictions.css';
import { post } from 'axios';

export class Prediction extends Component {
    constructor (props) {
        super(props);
        this.state = {
            isModalOpen: false,
            isAnalysisModalOpen: false,
            file: '',
            fileName: ''
        };
        this.state = { result: '' };
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.fileUpload = this.fileUpload.bind(this);
    }

    closeModal = () => {
        this.setState({ isModalOpen: false });
    };
    closeAnalysisModal = () => {
        this.setState({ isAnalysisModalOpen: false });
    };

    fileUpload (file) {
        const url = 'http://51.15.100.12:8080/predictions';
        // const formData = new FormData();
        // formData.append('files', file);
        const formData = {
            file: this.state.fileName
        };
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        };
        // 'content-type': 'multipart/form-data'
        return post(url, formData, config);
    }
    onChange (e) {
        this.setState({
            file: e.target.files[0],
            fileName: e.target.files[0].name
        });
    }
    onFormSubmit (e) {
        this.fileUpload(this.state.fileName)
            .then((response) => {
                for (let [key, value] of Object.entries(response.data)) {
                    this.setState({ result: `${key} : ${value}` });
                }
                console.log(response);
            });
        e.preventDefault();
    }

    render () {
        const { result } = this.state;
        return (
            <div>
                <Modal className="Data-Input-Modal"
                    trigger={
                        <Button
                            primary
                            onClick={() => {
                                this.setState({ isModalOpen: true });
                            }}
                        >
                               Загрузить данные о проведенных процедурах
                        </Button>
                    }
                    open={this.state.isModalOpen}
                    onClose={this.closeModal}
                >
                    <h3>Данные о проведенных процедурах</h3>
                    <p>Выберите тип процедуры:</p>
                    <Select
                        options={[
                            { value: 'ПЭТ', key: 'ПЭТ', text: 'ПЭТ' },
                            { value: 'МРТ', key: 'МРТ', text: 'МРТ' }
                        ]}
                    />
                    <Form onSubmit={this.onFormSubmit}>
                        <input className="Input-Field"
                            type="file"
                            onChange={this.onChange}
                        />
                        <Modal className="Analysis-Info"
                            trigger={
                                <Button type="submit" onClick={() => {
                                    this.setState({ isAnalysisModalOpen: true });
                                }}>Загрузить файл</Button>
                            }
                            open={this.state.isAnalysisModalOpen}
                            onClose={this.closeAnalysisModal}
                        >
                            <Form>
                                <p>
                                    {result}
                                </p>
                                <Button type="submit" onClick={() => {
                                    this.setState({ isAnalysisModalOpen: false });
                                }}>Закрыть</Button>
                            </Form>
                        </Modal>
                        <Button type="submit" onClick={() => {
                            this.setState({ isModalOpen: false });
                        }}>Закрыть</Button>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default Prediction;
