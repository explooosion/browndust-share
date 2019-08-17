/* eslint-disable no-empty */
/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import './Formation.scss';

import { connect } from 'react-redux';

import { get, del } from '../service/Session';
import { getThumbnailUrlByImageName } from '../utils';
import { updateDataset } from '../actions';

class Formation extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.dispatch = props.dispatch;
    this.state = {
      alertID: null,
      alertTimer: null,
    }
  }

  /**
   * 新增圖片
   * @param {*} tid target position id 
   * @param {*} cold character code
   */
  onAddImage(tid = null, code = null) {
    // select character by _code
    const c = this.characters.find(({ _code }) => _code === code);
    // get formation state
    if (code || c) {
      // select target position id
      this.formation = this.formation.map(f =>
        f.id === tid ?
          {
            ...f,
            backgroundImage: `url(${getThumbnailUrlByImageName(c._uiIconImageName)})`,
            type: Number(c._type),
            code: code,
            dragOver: false,
          } : f
      )
      this.dispatch(updateDataset({ formation: this.formation }));
    }
  }

  /**
   * 刪除圖片
   * @param {*} pid position id 
   * @param {*} cold character code
   */
  onRemoveImage(pid = null, code = null) {
    const c = this.characters.find(({ _code }) => _code === code);
    if (code || c) {
      // Remove image from source
      // select target position id
      this.formation = this.formation.map(f =>
        f.id === pid ?
          {
            ...f,
            backgroundImage: null,
            type: null,
            code: null,
            dragOver: false,
          } : f
      )
      this.dispatch(updateDataset({ formation: this.formation }));
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
    const source = this.formation.filter(({ code }) => code === scode);
    if (drag && sid === '0' && source.length > 0) {
      exist = true; // drag mode
    } else if (!drag && source.length > 0) {
      exist = true; // click mode
    }

    if (exist) {
      // add alarm style
      this.setState({ alertID: source[0].id });
      setTimeout(() => { this.setState({ alertID: null }) }, 1000);
      // remove target style
      this.onDragOverStyle(tid, false);
      del('_code');
      console.warn('already have!');
      return true;
    }
    return false;
  }

  /**
   * Dropover style
   * @param {*} tid 
   */
  onDragOverStyle(tid = null, bool = true) {
    this.formation = this.formation.map(f => f.id === tid ? { ...f, dragOver: bool } : f);
    this.dispatch(updateDataset({ formation: this.formation }));

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
    this.onDragOverStyle(tid, true);
  }

  onDragLeave = (ev, tid = null) => {
    ev.preventDefault();
    this.onDragOverStyle(tid, false);
  }

  /**
   * tid target position id
   */
  onDrop = (ev, tid = null) => {
    const sid = ev.dataTransfer.getData('sid');
    const scode = ev.dataTransfer.getData('scode');
    const target = this.formation.find(({ id }) => id === tid);
    // check is exist
    if (this.onCheckExistImage(true, tid, sid, scode)) return;
    // check moving or exchanging 
    if (target.backgroundImage === null) {
      // moving
      // console.log('move');
      this.onAddImage(tid, scode);
      this.onRemoveImage(sid, scode);
    } else {
      // exchage
      // console.log('exchage');
      this.onAddImage(sid, target.code);
      this.onAddImage(tid, scode);
    }
  }

  /**
   * 移動結束
   */
  onDragEnd = (ev, id, code) => {
    ev.preventDefault();
    // Plan: remove by drag to outside
    // console.log(ev.target);
    // console.log(ev.target.getAttribute('id'), id);
    // console.log(ev.target.getAttribute('draggable'));

    // const drag = ev.target.getAttribute('draggable');
    // if (drag) {
    //   console.log('remove')
    //   this.onRemoveImage(id, code)
    // };
  }

  renderFormation() {
    return this.formation.map(({ id, top, left, type, backgroundImage, code, dragOver }) => {
      return (
        <div
          key={`formation-${id}`}
          className={`box ${dragOver ? 'over' : ''} ${this.state.alertID === id ? 'shake-hard shake-constant shake-constant--hover' : ''}`}
          id={id}
          data-type={type}
          draggable={code ? true : false}
          style={{ top, left, backgroundImage }}
          onClick={() => this.onFormationClick(id)}
          onDoubleClick={() => this.onRemoveImage(id, code)}
          onDragStart={(e) => this.onDragStart(e, code, id)}
          onDragOver={(e) => this.onDragOver(e, id)}
          onDragLeave={(e) => this.onDragLeave(e, id)}
          onDrop={(e) => { this.onDrop(e, id) }}
          onDragEnd={(e) => this.onDragEnd(e, id, code)}
        >
          <div className='type' data-type={type}></div>
        </div>
      )
    });
  }

  render() {
    this.formation = this.props.dataset.formation;
    const { type, backcolor, backimage, order } = this.props.dataset.options;
    this.characters = this.props.characters;
    return (
      <div
        id='formation'
        className={
          `formation 
        ${type ? '' : 'no-type'}
        ${backcolor ? '' : 'no-backcolor'}
        ${backimage ? '' : 'no-backimage'}
        ${order ? '' : 'no-order'}
        `
        }
      >
        {this.renderFormation()}
      </div>
    );
  }
}

Formation.propTypes = {}

const mapStateToProps = state => {
  return {
    characters: state.characters,
    dataset: state.dataset,
  }
}

export default connect(mapStateToProps)(Formation);