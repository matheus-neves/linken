import {list} from '../actions'
import PouchDB from 'pouchdb'
const db = new PouchDB('links')

export const syncLinks = () => {

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
    

