import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
        this.setActionToList = this.setActionToList.bind(this);
    }

    static propTypes = {
        setAction: PropTypes.func.isRequired,
        video: PropTypes.object.isRequired
    }

    setActionToList() {
        this.props.setAction('list')
    }

    render() {
        return (
        <div className="card my-3">
            <div className="card-body text-center pt-5">
                <h5 className="card-title">{ this.props.video.name }</h5>
                <h5 className="card-text text-muted">{ this.props.video.type }
                    <button className="btn btn-link text-right" onClick={this.setActionToList}>Return to Playlist</button>
                </h5>
            </div>
            <div className="d-flex justify-content-center pb-4">
                <iframe width="420" height="315" src={this.props.video.url} title={this.props.video.url}></iframe>
            </div>
        </div>
        );
    }
}

export default VideoForm;
