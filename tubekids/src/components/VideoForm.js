import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createVideo, updateVideo } from '../services/VideosCRUDFunctions';

class VideoForm extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            type: 'Youtube Video',
            url: '',
            file: '',
            id: 0,
            errors: {}
        };
        this.fileInput = React.createRef();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleChecked = this.handleChecked.bind(this);
        this.setActionToList = this.setActionToList.bind(this);
    }

    static propTypes = {
        setAction: PropTypes.func.isRequired,
        currentAction: PropTypes.oneOf(['create', 'update']).isRequired,
        video: PropTypes.object
    }

    componentWillMount() {
        if (this.props.video) {
            this.setState({
                name: this.props.video.name,
                type: this.props.video.type,
                url: this.props.video.url,
                id: this.props.video.id
            });
        }
    }

    setActionToList() {
        this.props.setAction('list')
    }

    handleInputChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();

        console.log(
            this.fileInput.current.files[0]
        );

        if (this.props.currentAction === 'create') {
            this.create();
        } else if (this.props.currentAction === 'update') {
            this.update();
        }
    }

    handleChecked(e) {
        this.setState({ type: e.target.value });
    }

    create() {
        let video = {
            name: this.state.name,
            type: this.state.type
        }

        if (video.type === 'Youtube Video') {
            video.url = this.state.url
        } else {
            video.file = this.fileInput.current.files[0]
        }

        createVideo(video).then(res => {
            if (res.errors) {
                this.setState({errors: res.errors});
            } else {
                this.setActionToList();
            }
        });
    }

    update() {
        let video = {
            name: this.state.name,
            type: this.state.type,
            id: this.state.id
        }

        if (video.type === 'Youtube Video') {
            video.url = this.state.url
        } else {
            video.file = this.fileInput.current.files[0]
        }

        updateVideo(video).then(res => {
            if (res.errors) {
                this.setState({errors: res.errors});
            } else {
                this.setActionToList();
            }
        });
    }

    render() {
        return (
        <form className="w-75 mx-auto mt-4" onSubmit={this.handleSubmit}>
            <div className="form-group">
                <legend>{this.props.currentAction === 'create' ? 'Add' : 'Update'} video</legend>
                <label htmlFor="name">Name <span className="text-danger">*</span></label>
                <input required type="text" name="name" className="form-control" value={this.state.name} onChange={this.handleInputChange} />
                <small className="text-danger">{this.state.errors.name && this.state.errors.name[0]}</small>
            </div>
            <div className="form-group">
                <label>Type <span className="text-danger">*</span></label>
                <div className="custom-control custom-radio">
                    <input type="radio" name="typeYoutube" value="Youtube Video" onChange={this.handleChecked} checked={this.state.type === 'Youtube Video'} className="form-check-input" />
                    <label className="form-check-label" htmlFor="typeYoutube">Video from Youtube</label>
                </div>
                <div className="custom-control custom-radio">
                    <input type="radio" name="typeFile" value="Uploaded Video" onChange={this.handleChecked} checked={this.state.type === 'Uploaded Video'} className="form-check-input" />
                    <label className="form-check-label" htmlFor="typeFile">Upload video</label>
                </div>
                <small className="text-danger">{this.state.errors.type && this.state.errors.type[0]}</small>
            </div>
            <div className="form-group">
                <label htmlFor="url"><i className="fab fa-youtube"></i> URL</label>
                <input type="url" name="url" className="form-control" value={this.state.url} onChange={this.handleInputChange} />
                <small className="text-danger">{this.state.errors.url && this.state.errors.url[0]}</small>
            </div>
            <div className="form-group">
                <label htmlFor="file"><i className="fas fa-file-video"></i> File</label>
                <input type="file" accept="video/*" name="file" className="form-control-file" ref={this.fileInput} />
            </div>
            <div className="form-row">
                <div className="col-12 text-right">
                    <button type="submit" className="btn btn-primary mr-2"><i className="fas fa-save"></i> Save</button>
                    <button type="button" className="btn btn-secondary" onClick={this.setActionToList}><i className="fas fa-times"></i> Cancel</button>
                </div>
            </div>
        </form>
        );
    }
}

export default VideoForm;
