import React, { Component } from 'react';
import './Toolbar.scss';

import { connect } from 'react-redux';
import { MdRefresh, MdCloudDownload } from 'react-icons/md';
import { Checkbox, Radio } from 'pretty-checkbox-react';
import domtoimage from 'dom-to-image';

import { updateDataset } from '../actions';

class Toolbar extends Component {
  constructor(props) {
    super(props);
    this.dispatch = props.dispatch;
    this.state = {
      downloadSizeSelected: 2,
      downloadSize: [
        { value: 1, name: '720px' },
        { value: 2, name: '520px' },
        { value: 3, name: '320px' },
      ],
    };
  }

  onUpdateOptions(payload) {
    const options = { ...this.options, ...payload };
    this.dispatch(updateDataset({ options }));
  }

  onDownloadClick() {
    const node = document.getElementById('formation');
    domtoimage
      .toPng(node)
      .then(dataUrl => {
        const image = new Image;
        const size = this.state.downloadSize.find(d => d.value === this.state.downloadSizeSelected).name;
        image.src = dataUrl;
        image.setAttribute('width', size);
        document.body.appendChild(image);

        const a = document.createElement('a');
        a.href = image;
        a.download = 'output.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      })
      .catch(error => console.error('oops, something went wrong!', error));
  }

  render() {
    this.options = this.props.dataset.options;
    return (
      <div className='toolbar'>
        <div className='options'>
          顯示：
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
            checked={this.options.order}
            onChange={e => this.onUpdateOptions({ order: e.target.checked })}
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
          尺寸：
          {
            this.state.downloadSize.map(({ value, name }) => {
              return (
                <Radio
                  name='download-size'
                  shape='round'
                  color='info'
                  animation='jelly'
                  icon={<i className="mdi mdi-check" />}
                  value={value}
                  checked={value === this.state.downloadSizeSelected}
                  onChange={() => this.setState({ downloadSizeSelected: value })}
                >
                  {name}
                </Radio>
              );
            })
          }
        </div>

        <div className='commands'>
          <button
            type='button'
            className='tool attacker'
            onClick={() => {
              const formation = this.props.dataset.formation.map(f => ({ ...f, type: 0, backgroundImage: null, code: null, dragOver: false }));
              this.dispatch(updateDataset({ formation }));
            }}
          >
            <MdRefresh size='2em' color='#fff' />
            <span>重置</span>
          </button>
          <button
            type='button'
            className='tool attacker'
            onClick={() => this.onDownloadClick()}
          >
            <MdCloudDownload size='2em' color='#fff' />
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
