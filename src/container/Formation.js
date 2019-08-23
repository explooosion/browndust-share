/* eslint-disable prefer-numeric-literals */
/* eslint-disable no-empty */
/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import './Formation.scss';

import { connect } from 'react-redux';
import _ from 'lodash';

import { MenuProvider } from 'react-contexify';
import ContextMenu from '../components/ContextMenu';
import { get, del } from '../service/Session';
import { getThumbnailUrlByImageName, getIconUrlByTypeId } from '../utils';
import { updateDataset } from '../actions';
import Dialog from '../components/Dialog';

class Formation extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.dispatch = props.dispatch;
    this.state = {
      alertID: null,
      alertTimer: null,
    }
    this.myRef = React.createRef();
  }

  componentDidMount() {
    this.dispatch(updateDataset({ ref: this.myRef }));
  }

  /**
   * Add image to formation
   * @param {*} tid target position id 
   * @param {*} cold character code
   */
  onAddImage(tid = null, code = 0) {
    // select character by _code
    const c = this.characters.find(({ _code }) => _code === code);
    // get formation state
    if (code > 0 || c) {
      // select target position id
      const fsource = this.formation.find(f => f.code === code);
      this.formation = this.formation.map(f => {
        let payload = null;
        // setup target
        if (f.id === tid) {
          payload = {
            ...f,
            backgroundImage: `url(${getThumbnailUrlByImageName(c._uiIconImageName)})`,
            type: Number(c._type),
            code: code,
            dragOver: false,
          }
          // move exist queue
          console.log(fsource)
          if (fsource) {
            payload = (f.queue === 0 && fsource.queue > 0)
              ? { ...payload, queue: fsource.queue }
              : { ...payload, queue: f.queue };
            payload = (f.level === 0 && fsource.level > 0)
              ? { ...payload, level: fsource.level }
              : { ...payload, level: f.level };
          }
        }
        return _.isNull(payload) ? f : payload;
      });
      this.dispatch(updateDataset({ formation: this.formation, ref: this.myRef }));
    }
  }

  /**
   * Delete image from formation
   * @param {*} pid position id 
   * @param {*} cold character code
   */
  onRemoveImage(pid = null, code = 0) {
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
            code: 0,
            dragOver: false,
            queue: 0,
            level: 0,
          } : f
      )
      const queue = this.props.dataset.queue.filter(q => q !== pid);
      this.dispatch(updateDataset({ formation: this.formation, queue }));
    }
  }

  /**
   * Check the target image is exist
   * @param {*} drag drag or click mode
   * @param {*} tid target id
   * @param {*} sid source id
   * @param {*} scode source code
   */
  onCheckExistImage(drag, tid, sid = null, scode = 0) {
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
      this.onDragChangeStyle(tid, false);
      del('_code');
      console.info('Already exist!', scode);
      return true;
    }
    return false;
  }

  /**
   * Dropover style
   * @param {*} tid 
   */
  onDragChangeStyle(tid = null, bool = true) {
    let hasUpdate = false;
    this.formation = this.formation.map(f => {
      if (f.id === tid) {
        // need update style [performance]
        if (f.dragOver !== bool) hasUpdate = true;
        return { ...f, dragOver: bool };
      }
      return f;
    });
    if (hasUpdate)
      this.dispatch(updateDataset({ formation: this.formation }));
  }

  /**
   * Adding charactor or setting queue
   * @param {*} id 
   */
  onFormationClick(id = null) {
    const { queue, queueMode, queueMax } = this.props.dataset;
    const formation = this.formation.find(f => f.id === id);

    // queue mode
    if (queueMode && !_.isUndefined(formation)) {
      // check is character inside
      if (
        formation.code > 0 &&                // check data exist
        formation.backgroundImage !== null &&     // check data exist
        queue.filter(q => q === id).length === 0  // can not repeat id
      ) {
        queue.push(id);
        this.formation = this.formation.map(f => {
          if (f.id === id) return { ...f, queue: queue.length };
          return f;
        });
        const payload = queue.length === queueMax
          ? { formation: this.formation, queue, queueMode: false } : { formation: this.formation, queue };
        this.dispatch(updateDataset(payload))
      }
    } else {

      // add character mode
      const code = get('_code');
      if (!code) return;
      if (this.onCheckExistImage(false, id, null, code)) return;
      this.onAddImage(id, code);
      del('_code');
    }
  }

  /**
   * DragStart event
   * sid source position id
   * scode source position image code
   */
  onDragStart = (ev, scode = 0, sid = null) => {
    ev.dataTransfer.setData('scode', scode);
    ev.dataTransfer.setData('sid', sid);
  }

  onDragOver = (ev, tid = null) => {
    ev.preventDefault();
  }

  onDragEnter = (ev, tid = null) => {
    ev.preventDefault();
    this.onDragChangeStyle(tid, true);
  }

  onDragLeave = (ev, tid = null) => {
    ev.preventDefault();
    this.onDragChangeStyle(tid, false);
  }

  /**
   * Drop event
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
   * Drag end (Plan: remove by drag to outside)
   */
  onDragEnd = (ev, id, code) => {
    ev.preventDefault();
    // console.log(ev.target);
    // console.log(ev.target.getAttribute('id'), id);
    // console.log(ev.target.getAttribute('draggable'));

    // const drag = ev.target.getAttribute('draggable');
    // if (drag) {
    //   console.log('remove')
    //   this.onRemoveImage(id, code)
    // };
  }

  renderFormation(typeShow, queueShow) {
    return this.formation.map(({ id, top, left, type, backgroundImage, code, dragOver, queue, level }) => {
      return (
        <div
          key={`formation-${id}`}
          className={`box ${dragOver ? 'over' : ''} ${this.state.alertID === id ? 'shake-hard shake-constant shake-constant--hover' : ''}`}
          id={id}
          data-type={type}
          draggable={code > 0 ? true : false}
          style={{ top, left, backgroundImage }}
          onClick={() => this.onFormationClick(id)}
          onDoubleClick={() => this.onRemoveImage(id, code)}
          onDragStart={(e) => this.onDragStart(e, code, id)}
          onDragOver={(e) => this.onDragOver(e, id)}
          onDragEnter={(e) => this.onDragEnter(e, id)}
          onDragLeave={(e) => this.onDragLeave(e, id)}
          onDrop={(e) => { this.onDrop(e, id) }}
          onDragEnd={(e) => this.onDragEnd(e, id, code)}
        >
          {typeShow ? <div className='type' style={{ backgroundImage: getIconUrlByTypeId(type) }}></div> : null}
          {queueShow && queue > 0 ? <div className='queue'>{queue}</div> : null}
          {level > 0 ? <div className={`level ${level < 10 ? 'min-level' : ''}`}>{level}</div> : null}
        </div>
      )
    });
  }

  render() {
    this.dataset = this.props.dataset;
    this.formation = this.dataset.formation;
    const { type, backcolor, backimage, queue, reverse } = this.props.dataset.options;
    this.characters = this.props.characters;
    const levelDialog = this.dataset.levelDialog;

    return (
      <div
        ref={this.myRef}
        id='formation'
        className={
          `formation 
        ${type ? '' : 'no-type'}
        ${backcolor ? '' : 'no-backcolor'}
        ${backimage ? '' : 'no-backimage'}
        ${queue ? '' : 'no-queue'}
        ${reverse ? 'reverse' : ''}
        `
        }
      >
        <MenuProvider id="ctmenu">
          {this.renderFormation(type, queue)}
        </MenuProvider>
        <ContextMenu />
        {
          // eslint-disable-next-line react/jsx-props-no-spreading
          levelDialog.show ? <Dialog {...levelDialog} mode='level' /> : null
        }
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