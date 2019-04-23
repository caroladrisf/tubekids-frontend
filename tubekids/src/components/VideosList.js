import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getPlaylist, deleteVideo, searchByName } from '../services/VideosCRUDFunctions';

class VideosList extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            videos: []
        }
        this.setActionToCreate = this.setActionToCreate.bind(this);
        this.setActionToUpdate = this.setActionToUpdate.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.searchVideos = this.searchVideos.bind(this);
        this.delete = this.delete.bind(this);
    }

    static propTypes = {
        setAction: PropTypes.func.isRequired
    }

    componentWillMount() {
        this.listVideos()
    }

    setActionToCreate() {
        this.props.setAction('create')
    }

    setActionToUpdate(e) {
        const i = e.target.attributes['index'].value;
        this.props.setAction('update', this.state.videos[i]);
    }

    setActionToShow(e) {
        const i = e.target.attributes['index'].value;
        this.props.setAction('show', this.state.videos[i]);
    }

    handleInputChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    listVideos() {
        getPlaylist().then(res => {
            if (res.error) {
                console.log(res)
            } else if (res.playlist) {
                this.setState({videos: res.playlist.videos})
            }
        });
    }

    searchVideos(e) {
        e.preventDefault();

        const name = this.state.name;
        searchByName(name).then(res => {
            if (res.error) {
                console.log(res)
            } else if (res.playlist) {
                this.setState({videos: res.playlist.videos})
            }
        });
    }

    delete(e) {
        const id = e.target.attributes['data-id'].value;
        deleteVideo(id).then(res => {
            if (res) {
                this.listVideos()
            } else {
                console.log('Could not delete the video')
            }
        });
    }

    render() {
        const videos = this.state.videos.map((video, index) => 
            <tr key={video.id}>
                <td>{video.name}</td>
                <td>{video.type}</td>
                <td>
                    <div className="text-right">
                        <button className="btn btn-primary btn-sm" title="Play" index={index} onClick={this.setActionToShow}>
                            <i className="fas fa-play" index={index}></i>
                        </button>
                        <button className="btn btn-secondary btn-sm" title="Edit" index={index} onClick={this.setActionToUpdate}>
                            <i className="fas fa-pen" index={index}></i>
                        </button>
                        <button className="btn btn-danger btn-sm" title="Delete" data-id={video.id} onClick={this.delete}>
                            <i className="fas fa-trash" data-id={video.id}></i>
                        </button>
                    </div>
                </td>
            </tr>
        );

        return (
        <div>
            <div className="row mb-2 mt-4">
                <div className="col-auto col-sm-5 col-lg-8">
                    <button type="button" className="btn btn-primary" onClick={this.setActionToCreate}>
                        <i className="fas fa-plus"></i> Add video
                    </button>
                </div>
                <div className="col-auto col-sm-7 col-lg-4">
                    <form onSubmit={this.searchVideos}>
                        <div className="input-group">
                            <input type="text" name="name" onChange={this.handleInputChange} className="form-control" placeholder="Search by name" />
                            <div className="input-group-append">
                                <button type="submit" className="btn btn-secondary"><i className="fas fa-search"></i></button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Type</th>
                        <th scope="col" className="text-right">Options</th>
                    </tr>
                </thead>
                <tbody>
                    {videos}
                </tbody>
            </table>
        </div>
        );
    }
}

export default VideosList;
