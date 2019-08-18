import React, { Component } from 'react';
import './Toolbar.scss';

import { connect } from 'react-redux';
import { MdRefresh, MdGetApp } from 'react-icons/md';
import { GiPerspectiveDiceSixFacesRandom, GiPerspectiveDiceOne } from 'react-icons/gi';
import { Checkbox, Radio } from 'pretty-checkbox-react';
import { toPng } from 'html-to-image';

import { updateDataset } from '../actions';
import { resizeImageURL } from '../utils';

class Toolbar extends Component {
  constructor(props) {
    super(props);
    this.dispatch = props.dispatch;
    this.state = {
      downloadSizeSelected: 2,
      downloadSizeCustom: 0,
      downloadSize: [
        { value: 1, name: 700 },
        { value: 2, name: 520 },
        { value: 3, name: 420 },
        { value: 4, name: '自訂寬度：' },
      ],
    };
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
      payload = { queueMode: !queueMode };
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
        a.download = 'html-output.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      });
  }

  render() {
    this.formation = this.props.dataset.formation;
    this.options = this.props.dataset.options;
    const { queueMode, queue } = this.props.dataset;
    return (
      <div className='toolbar'>
        <div className='options'>
          顯示內容：
          <Checkbox
            shape='round'
            color='info'
            animation='jelly'
            icon={<i className="mdi mdi-check" />}
            checked={this.options.type}
            onChange={e => this.onUpdateOptions({ type: e.target.checked })}
          >
            傭兵類型
          </Checkbox>
          <Checkbox
            shape='round'
            color='info'
            animation='jelly'
            icon={<i className="mdi mdi-check" />}
            checked={this.options.queue}
            onChange={e => this.onUpdateOptions({ queue: e.target.checked })}
          >
            出手順序
          </Checkbox>
          <Checkbox
            shape='round'
            color='info'
            animation='jelly'
            icon={<i className="mdi mdi-check" />}
            checked={this.options.backcolor}
            onChange={e => this.onUpdateOptions({ backcolor: e.target.checked })}
          >
            背景顏色
          </Checkbox>
          <Checkbox
            shape='round'
            color='info'
            animation='jelly'
            icon={<i className="mdi mdi-check" />}
            checked={this.options.backimage}
            onChange={e => this.onUpdateOptions({ backimage: e.target.checked })}
          >
            背景方格
          </Checkbox>
        </div>

        <div className='options'>
          圖片寬度：
          {
            this.state.downloadSize.map(({ value, name }) => {
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
            onClick={() => {
              const formation = this.formation.map(f => ({ ...f, type: 0, backgroundImage: null, code: null, dragOver: false }));
              this.dispatch(updateDataset({ formation, queueMode: false, queue: [] }));
            }}
          >
            <MdRefresh size='2em' color='#fff' />
            <span>重置</span>
          </button>
          <button
            type='button'
            className={`tool tool-queue ${queueMode ? 'tool-queue-on' : ''}`}
            onClick={() => this.onQueueClick(queueMode)}
          >
            {
              queueMode
                ? <div><GiPerspectiveDiceOne size='2em' color='#fff' /><span>順序({queue.length})</span></div>
                : <div><GiPerspectiveDiceSixFacesRandom size='2em' color='#fff' /><span>順序({queue.length})</span></div>
            }
          </button>
          <button
            type='button'
            className='tool tool-download'
            onClick={() => this.onDownloadClick()}
          >
            <MdGetApp size='2em' color='#fff' />
            <span>下載</span>
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

export default connect(mapStateToProps)(Toolbar);