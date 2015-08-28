
export default function info(callback) {
  callback(null, {
    type: 'scratch pad',
    name: this._dbName
  });
}
