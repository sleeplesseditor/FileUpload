import React, { Component } from 'react';

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            imageURL: '',
        };

        this.handleUploadImage = this.handleUploadImage.bind(this);
    }

    handleUploadImage(e) {
        e.preventDefault();

        const data = new FormData();
        data.append('file', this.uploadInput.files[0]);
        data.append('filename', this.fileName.value);

        fetch('http://localhost:8000/upload', {
            method: 'POST',
            body: data,
        }).then((response) => {
            response.json().then((body) => {
                this.setState({ imageURL: `http://localhost:8000/${body.file}` });
            });
        });
    }

    render() {
        return (
            <form onSubmit={this.handleUploadImage}>
                <div>
                    <input 
                        ref={(ref) => { this.uploadInput = ref; }} 
                        type='file' 
                    />
                </div>
                <br />
                <div>
                    <input 
                        ref={(ref) => { this.fileName = ref; }} 
                        type='text' placeholder='Enter the file name' 
                    />
                </div>
                <br />
                <div>
                    <button 
                        type="button submit" 
                        className="btn btn-secondary"
                    >
                        Upload
                    </button>
                </div>
                <br />
                <img src={this.state.imageURL} alt='img' />
            </form>
        );
    }
}

export default Main;