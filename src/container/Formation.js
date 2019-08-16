/* eslint-disable no-empty */
/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import './Formation.scss';

import { connect } from 'react-redux';

import { get, del } from '../service/Session';
import { getThumbnailUrlByImageName } from '../utils';

class Formation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      positions: [
        { id: 'a1', top: '9px', left: '13px', type: 0, backgroundImage: null, code: null, dragOver: false },
        { id: 'a2', top: '9px', left: '127.5px', type: 0, backgroundImage: null, code: null, dragOver: false },
        { id: 'a3', top: '9px', left: '242px', type: 0, backgroundImage: null, code: null, dragOver: false },
        { id: 'a4', top: '9px', left: '356px', type: 0, backgroundImage: null, code: null, dragOver: false },
        { id: 'a5', top: '9px', left: '471px', type: 0, backgroundImage: null, code: null, dragOver: false },
        { id: 'a6', top: '9px', left: '585.5px', type: 0, backgroundImage: null, code: null, dragOver: false },
        { id: 'b1', top: '122.5px', left: '13px', type: 0, backgroundImage: null, code: null, dragOver: false },
        { id: 'b2', top: '122.5px', left: '127.5px', type: 0, backgroundImage: null, code: null, dragOver: false },
        { id: 'b3', top: '122.5px', left: '242px', type: 0, backgroundImage: null, code: null, dragOver: false },
        { id: 'b4', top: '122.5px', left: '356px', type: 0, backgroundImage: null, code: null, dragOver: false },
        { id: 'b5', top: '122.5px', left: '471px', type: 0, backgroundImage: null, code: null, dragOver: false },
        { id: 'b6', top: '122.5px', left: '585.5px', type: 0, backgroundImage: null, code: null, dragOver: false },
        { id: 'c1', top: '239px', left: '13px', type: 0, backgroundImage: null, code: null, dragOver: false },
        { id: 'c2', top: '239px', left: '127.5px', type: 0, backgroundImage: null, code: null, dragOver: false },
        { id: 'c3', top: '239px', left: '242px', type: 0, backgroundImage: null, code: null, dragOver: false },
        { id: 'c4', top: '239px', left: '356px', type: 0, backgroundImage: null, code: null, dragOver: false },
        { id: 'c5', top: '239px', left: '471px', type: 0, backgroundImage: null, code: null, dragOver: false },
        { id: 'c6', top: '239px', left: '585.5px', type: 0, backgroundImage: null, code: null, dragOver: false },
      ],
    }
  }

  /**
   * 新增圖片
   * @param {*} pid position id 
   * @param {*} cold character code
   */
  onAddImage(pid = null, code = null) {
    // select character by _code
    const c = this.props.characters.find(({ _code }) => _code === code);
    // get positions state
    const positions = this.state.positions;
    if (code || c) {
      // select target position id
      const p = positions.find(({ id }) => id === pid);
      if (!p) return;
      p.backgroundImage = `url(${getThumbnailUrlByImageName(c._uiIconImageName)})`;
      p.type = Number(c._type);
      p.code = code;
      this.setState({ positions });
    }
  }

  /**
   * 刪除圖片
   * @param {*} pid position id 
   * @param {*} cold character code
   */
  onRemoveImage(pid = null, code = null) {
    const c = this.props.characters.find(({ _code }) => _code === code);
    const positions = this.state.positions;
    if (code || c) {
      // Remove image from source
      const p = positions.find(({ id }) => id === pid);
      if (!p) return;
      p.backgroundImage = null;
      p.type = null
      p.code = null;
      p.dragOver = false;
      this.setState({ positions });
    }
  }

  /**
   * Check the target image is exist
   * @param {*} drag drag or click mode
   * @param {*} tid target id
   * @param {*} sid source id
   * @param {*} scode source code
   */
  onCheckExistImage(drag, tid, sid = null, scode) {
    let exist = false;
    if (drag && sid === '0' && this.state.positions.filter(({ code }) => code === scode).length > 0) {
      exist = true;
    } else if (!drag && this.state.positions.filter(({ code }) => code === scode).length > 0) {
      exist = true;
    }

    if (exist) {
      this.onRemoveImage(tid, scode);
      del('_code');
      console.warn('already have!');
      return true;
    }
    return false;
  }

  /**
   * 座標編號
   * @param {*} id 
   */
  onFormationClick(id = null) {
    const code = get('_code');
    if (!code) return;
    if (this.onCheckExistImage(false, id, null, code)) return;
    this.onAddImage(id, code);
    del('_code');
  }

  /**
   * sid source position id
   * scode source position image code
   */
  onDragStart = (ev, scode = null, sid = null) => {
    ev.dataTransfer.setData('scode', scode);
    ev.dataTransfer.setData('sid', sid);
  }

  onDragOver = (ev, tid = null) => {
    ev.preventDefault();
    const positions = this.state.positions;
    const p = positions.find(({ id }) => id === tid);
    p.dragOver = true;
    this.setState({ positions });
  }

  onDragLeave = (ev, tid = null) => {
    ev.preventDefault();
    const positions = this.state.positions;
    const p = positions.find(({ id }) => id === tid);
    p.dragOver = false;
    this.setState({ positions });
  }

  /**
   * tid target position id
   */
  onDrop = (ev, tid = null) => {
    const sid = ev.dataTransfer.getData('sid');
    const scode = ev.dataTransfer.getData('scode');
    const target = this.state.positions.find(({ id }) => id === tid);
    // check is exist
    if (this.onCheckExistImage(true, tid, sid, scode)) return;
    // check moving or exchanging 
    if (target.backgroundImage === null) {
      // moving
      this.onAddImage(tid, scode);
      this.onRemoveImage(sid, scode);
    } else {
      // exchage
      this.onAddImage(sid, target.code);
      this.onAddImage(tid, scode);
    }
  }

  renderFormation() {
    return this.state.positions.map(({ id, top, left, type, backgroundImage, code, dragOver }) => (
      <div
        key={`formation-${id}`}
        className={`box ${dragOver ? 'over' : ''}`}
        data-type={type}
        id={id}
        draggable={code ? true : false}
        style={{ top, left, backgroundImage }}
        onClick={() => this.onFormationClick(id)}
        onDoubleClick={() => this.onRemoveImage(id, code)}
        onDragStart={(e) => this.onDragStart(e, code, id)}
        onDragOver={(e) => this.onDragOver(e, id)}
        onDragLeave={(e) => this.onDragLeave(e, id)}
        onDrop={(e) => { this.onDrop(e, id) }}
      >
      </div>
    ));
  }

  render() {
    return (
      <div className='formation'>
        {this.renderFormation()}
      </div>
    );
  }
}

Formation.propTypes = {}

const mapStateToProps = state => {
  return {
    characters: state.characters,
  }
}

export default connect(mapStateToProps)(Formation);