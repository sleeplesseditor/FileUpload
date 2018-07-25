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
            res.json().then((body) => {
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
                <div>
                    <input 
                        ref={(ref) => { this.fileName = ref; }} 
                        type='text' placeholder='Enter the name of the specified file' 
                    />
                </div>
                <br />
                <div>
                    <button>Upload</button>
                </div>
                <img src={this.state.imageURL} alt='img' />
            </form>
        );
    }
}

export default Main;