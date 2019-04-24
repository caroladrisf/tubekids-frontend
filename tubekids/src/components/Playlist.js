import React, { Component } from 'react';
import VideosList from './VideosList';
import VideoForm from './VideoForm';
import VideoCard from './VideoCard';

class Playlist extends Component {
    constructor() {
        super();
        this.state = {
            action: 'list',
            playlist: {
                name: 'General'
            },
            video: {
                id: 0
            },
            message: '',
            error: ''
        }
        this.setAction = this.setAction.bind(this);
    }

    setAction(action, video = null) {
        if (video) {
            this.setState({ video });
        }
        this.setState({
            action: action
        });
    }

    handleCRUDViews() {
        if (this.state.action === 'list') {
            return <VideosList setAction={this.setAction} />
        } else if (this.state.action === 'create') {
            return <VideoForm setAction={this.setAction} currentAction={this.state.action} />
        } else if (this.state.action === 'update') {
            return <VideoForm setAction={this.setAction} currentAction={this.state.action} video={this.state.video} />
        } else if (this.state.action === 'show') {
            return <VideoCard setAction={this.setAction} video={this.state.video} />
        }
    }

  render() {
    return (
      <div className="row">
        <div className="col-sm-8 mx-auto">
            <h1 className="text-center">Playlist {this.state.playlist.name}</h1>
            { this.handleCRUDViews() }
        </div>
      </div>
    );
  }
}

export default Playlist;
