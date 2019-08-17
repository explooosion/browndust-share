import React, { Component } from 'react';
import './Toolbar.scss';

import { connect } from 'react-redux';
import { MdRefresh } from 'react-icons/md';
import { Checkbox } from 'pretty-checkbox-react';
import { FaEye } from "react-icons/fa";

import { updateDataset } from '../actions';

class Toolbar extends Component {
  constructor(props) {
    super(props);
    this.dispatch = props.dispatch;
  }

  onUpdateOptions(payload) {
    const options = { ...this.options, ...payload };
    this.dispatch(updateDataset({ options }));
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
