import React, { RefObject } from "react";
import { tts } from "./util";

interface PropTypes {}

interface StateTypes {
  url: string,
  resolve: Function | null
}

class TTS extends React.Component<PropTypes, StateTypes> {
  constructor (props: PropTypes) {
    super(props);
    this.state = {
      url: "",
      resolve: null
    };
    this.ref = React.createRef();
    this.handleAutoPlay = this.handleAutoPlay.bind(this);
    this.handleEnded = this.handleEnded.bind(this);
  }

  ref: RefObject<HTMLAudioElement>;

  speak (tex: string): Promise<undefined> {
    if (!tex) return Promise.resolve(undefined);
    tts(tex).then((url: string) => this.setState({ url })).catch((message) => console.info(message));
    return new Promise((resolve) => this.setState({ resolve }));
  }

  handleAutoPlay () {
    const audioElement = this.ref.current;
    if (audioElement) audioElement.play().catch(() => 0);
  }

  handleEnded () {
    const { resolve } = this.state;
    if (resolve) resolve();
    this.setState({ url: "", resolve: null });
  }

  render () {
    const { url } = this.state;
    if (url === "") return null;
    return <audio src={url} ref={this.ref} onCanPlay={this.handleAutoPlay} onEnded={this.handleEnded} />;
  }
}

export default TTS;
