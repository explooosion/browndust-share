import React, { Component } from 'react';
import './Toolbar.scss';

import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { MdRefresh, MdGetApp } from 'react-icons/md';
import { FaLink } from 'react-icons/fa';
import { GiPerspectiveDiceSixFacesRandom, GiPerspectiveDiceOne } from 'react-icons/gi';
import { Checkbox, Radio } from 'pretty-checkbox-react';
import { toPng } from 'html-to-image';
import moment from 'moment';
import Clipboard from 'clipboard';
import { updateDataset } from '../actions';
import { resizeImageURL } from '../utils';

class Toolbar extends Component {
  constructor(props) {
    super(props);
    this.dispatch = props.dispatch;
    this.t = props.t;
    this.state = {
      downloadSizeSelected: 2,
      downloadSizeCustom: 0,
    };
  }

  componentDidMount() {
    // eslint-disable-next-line no-new
    new Clipboard('.tool-copylink');
  }

  static getDerivedStateFromProps({ t }, state) {
    return {
      ...state,
      downloadSize: [
        { value: 1, name: 700 },
        { value: 2, name: 520 },
        { value: 3, name: 420 },
        { value: 4, name: t('image-width-custom') },
      ],
    }
  }

  onUpdateOptions(payload) {
    const options = { ...this.options, ...payload };
    this.dispatch(updateDataset({ options }));
  }

  onQueueClick(queueMode) {
    let payload = {};
    if (queueMode) {
      // turn off queue mode
      payload = { queueMode: !queueMode, queue: [] };
    } else {
      // turn on queue mode
      const formation = this.formation.map(f => ({ ...f, queue: 0 }));
      payload = { formation, queueMode: !queueMode };
    }
    this.dispatch(updateDataset(payload));
  }

  onDownloadClick() {
    const size = this.state.downloadSizeSelected !== 4 ? this.state.downloadSize
      .find(d => d.value === this.state.downloadSizeSelected).name
      : Number(this.state.downloadSizeCustom);

    if (Number(size) <= 0) return;
    toPng(this.props.dataset.ref.current)
      .then(async dataUrl => {
        const newDataUri = await resizeImageURL(dataUrl, size);
        const a = document.createElement('a');
        a.href = newDataUri;
        a.download = `output-${moment().format('YYYYMMDDTHmmss')}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      });
  }

  onResetClick() {
    const formation = this.formation.map(f => ({ ...f, type: 0, backgroundImage: null, uniqueCode: 0, dragOver: false, queue: 0, level: 0 }));
    this.dispatch(updateDataset({ formation, queueMode: false, queue: [] }));
  }

  render() {
    this.formation = this.props.dataset.formation;
    const queueLen = this.formation.filter(f => f.queue > 0).length;
    this.options = this.props.dataset.options;
    const { queueMode } = this.props.dataset;
    return (
      <div className='toolbar'>
        <div className='options'>
          <span className='option-title'>{this.t('show-content')}：</span>
          <Checkbox
            shape='round'
            color='info'
            animation='jelly'
            icon={<i className="mdi mdi-check" />}
            checked={this.options.type}
            onChange={e => this.onUpdateOptions({ type: e.target.checked })}
          >
            {this.t('mercenary-type')}
          </Checkbox>
          <Checkbox
            shape='round'
            color='info'
            animation='jelly'
            icon={<i className="mdi mdi-check" />}
            checked={this.options.queue}
            onChange={e => this.onUpdateOptions({ queue: e.target.checked })}
          >
            {this.t('mercenary-queue')}
          </Checkbox>
          <Checkbox
            shape='round'
            color='info'
            animation='jelly'
            icon={<i className="mdi mdi-check" />}
            checked={this.options.backcolor}
            onChange={e => this.onUpdateOptions({ backcolor: e.target.checked })}
          >
            {this.t('background-color')}
          </Checkbox>
          <Checkbox
            shape='round'
            color='info'
            animation='jelly'
            icon={<i className="mdi mdi-check" />}
            checked={this.options.backimage}
            onChange={e => this.onUpdateOptions({ backimage: e.target.checked })}
          >
            {this.t('background-grid')}
          </Checkbox>
          <Checkbox
            shape='round'
            color='info'
            animation='jelly'
            icon={<i className="mdi mdi-check" />}
            checked={this.options.reverse}
            onChange={e => this.onUpdateOptions({ reverse: e.target.checked })}
          >
            {this.t('reverse')}
          </Checkbox>
        </div>

        <div className='options'>
          <span className='option-title'>{this.t('image-width')}：</span>
          {
            this.state.downloadSize.map(({ value, name }, index) => {
              return (
                <Radio
                  key={`download-szie-${value}`}
                  name='download-size'
                  shape='round'
                  color='info'
                  animation='jelly'
                  icon={<i className="mdi mdi-check" />}
                  value={value}
                  checked={value === this.state.downloadSizeSelected}
                  onChange={() => this.setState({ downloadSizeSelected: value })}
                >
                  {value !== 4 ? `${name}px` : name}
                </Radio>
              );
            })
          }
          <input
            type='number'
            min={0}
            max={2000}
            className='download-size-custom'
            value={this.state.downloadSizeCustom}
            onChange={(e) => this.setState({ downloadSizeCustom: e.target.value.replace(/\D/, '') })}
            onFocus={() => this.setState({ downloadSizeSelected: 4 })}
          /> px
        </div>

        <div className='commands'>
          <button
            type='button'
            className='tool tool-reset'
            onClick={() => this.onResetClick()}
          >
            <MdRefresh size='2em' color='#fff' />
            <span>{this.t('reset')}</span>
          </button>
          <button
            type='button'
            className={`tool tool-queue ${queueMode ? 'tool-queue-on' : ''}`}
            onClick={() => this.onQueueClick(queueMode)}
          >
            {
              queueMode
                ? <div><GiPerspectiveDiceOne size='2em' color='#fff' /><span>{this.t('queue')}({queueLen})</span></div>
                : <div><GiPerspectiveDiceSixFacesRandom size='2em' color='#fff' /><span>{this.t('queue')}({queueLen})</span></div>
            }
          </button>
          <button
            type='button'
            className='tool tool-download'
            onClick={() => this.onDownloadClick()}
          >
            <MdGetApp size='2em' color='#fff' />
            <span>{this.t('download')}</span>
          </button>
        </div>
        <div className='commands' style={{ marginBottom: 0 }}>
          <input id="tool-copylink-text" className='tool-copylink-text' value={window.location.href} readOnly />
          <button
            type='button'
            className='tool tool-copylink'
            data-clipboard-target='#tool-copylink-text'
          >
            <FaLink size='1.5em' color='#fff' />
            <span>{this.t('copylink')}</span>
          </button>
        </div>
      </div>
    );
  }
}

Toolbar.propTypes = {}

const mapStateToProps = state => {
  return {
    dataset: state.dataset,
  }
}

export default withTranslation()(connect(mapStateToProps)(Toolbar));
