import Session from './Session';
import { db, REF_PICK } from '../config/firebase';

class Database {

  hideouts = [];

  constructor() {
    this.db = db;
  }

  get() {
    return this.hideouts || [];
  }

  /**
   * Get hideouts by hideout id
   * @param {string} id
   */
  getById(id = '') {
    return this.hideouts.find((hideout) => hideout.id === id) || null;
  }

  /**
   * Get hideouts by user id
   * @param {string} uid
   */
  getByUserId(uid = '') {
    return this.hideouts.filter((hideout) => hideout.authorId === uid) || [];
  }

  /**
   * Hideouts handler
   */
  onHideoutsSnapshot() {
    const SORTKEY = 'timestamp';
    this.dbHideouts = this.db.ref(`hideouts${REF_PICK}`);
    this.dbHideouts.on('value', snapshot => {
      const datas = snapshot.val() || [];
      this.hideouts = Object.keys(datas)
        .map(key => datas[key])
        .sort((a, b) => (a[SORTKEY] < b[SORTKEY]) ? 1 : ((b[SORTKEY] < a[SORTKEY]) ? -1 : 0));
      // console.info('snapshot', this.hideouts);
    });
  }

  /**
   * Create hideout data
   * @param {HideoutList} hideout
   */
  async onCreateHideout(hideout = { id: null }) {
    if (!hideout.id) return;
    await this.db.ref(`hideouts${REF_PICK}/${hideout.id}`).set(hideout);
  }

  /**
   * Update hideout data
   * @param {HideoutList} hideout
   */
  async onUpdateHideout(hideout = { id: null }) {
    if (!hideout.id) return;
    await this.db.ref(`hideouts${REF_PICK}/${hideout.id}`).update(hideout);
  }

  /**
   * Delete hideout data
   * @param {string} id
   */
  async onDeleteHideout(id = null) {
    if (!id) return;
    await this.db.ref(`hideouts${REF_PICK}/${id}`).remove();
  }

  /**
   * Update hideout views by id
   * @param {string} id
   */
  async onUpdateHideoutViews(_id) {
    // Visited rule save in session
    const hideout = this.hideouts.find(({ id }) => id === _id);
    if (hideout !== undefined && !Session.get(`v-${_id}`)) {
      Session.set(`v-${_id}`, true);
      await this.db.ref(`hideouts${REF_PICK}/${_id}`).update({ 'views': hideout.views + 1 });
    }
  }

  /**
   * Update hideout favorite by id
   * @param {string} id
   */
  async onUpdateHideoutFavorite(_id) {
    // Favorited rule save in session
    const hideout = this.hideouts.find(({ id }) => id === _id);
    if (hideout !== undefined) {
      await this.db.ref(`hideouts${REF_PICK}/${_id}`).update({ 'favorite': hideout.favorite + 1 });
    }
  }

  /**
   * Update hideout download by id
   * @param {string} id
   */
  async onUpdateHideoutDownload(_id) {
    // Favorited rule save in session
    const hideout = this.hideouts.find(({ id }) => id === _id);
    if (hideout !== undefined) {
      await this.db.ref(`hideouts${REF_PICK}/${_id}`).update({ 'download': hideout.download + 1 });
    }
  }
}

export default Database;
