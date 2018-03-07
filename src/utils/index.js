import PouchDB from 'pouchdb'
const db = new PouchDB('links')
import {list, addLink} from '../actions'

export const pouchPost = (link) => {
  
  return dispatch => {
    db.post(link)
      .then( res => {
        const { id, rev} = res
        dispatch(addLink({...link, id, rev }))
      }).catch( err => {
        console.log(err);
      });
  }
  
}


export const pouchSync = () => {

    return dispatch => {
      db.replicate.from('http://localhost:5984/links')
        .on('complete', function(info) {
        console.log('first load', info);
        db.allDocs({
          include_docs: true,
          attachments: false
        }).then(function (result) {
          dispatch(list(result.rows));  
        }).catch(function (err) {
          console.log(err);
        });
      });

      db.sync('http://localhost:5984/links', { live: true, retry: true })
      .on('change', function (info) {
        console.log('change', info);
        db.allDocs({
          include_docs: true,
          attachments: false
        }).then(function (result) {
          dispatch(list(result.rows));  
        }).catch(function (err) {
          console.log(err);
        });
      });

    }


  }
    

