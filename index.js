
import ScratchPouch from './lib/scratchpouch';


/* istanbul ignore next */
if (typeof window !== 'undefined' && window.PouchDB) {
  window.PouchDB.adapter('scratch', ScratchPouch);
}

export default ScratchPouch;
