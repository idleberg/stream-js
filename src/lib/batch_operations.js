import errors from './errors';

function addToMany(activity, feeds) {
  /**
   * Add one activity to many feeds
   * @method addToMany
   * @memberof StreamClient.prototype
   * @since 2.3.0
   * @param  {object}   activity The activity to add
   * @param  {Array}   feeds    Array of objects describing the feeds to add to
   * @return {Promise}           Promise object
   */

  if (!this.usingApiSecret || this.apiKey == null) {
    throw new errors.SiteError('This method can only be used server-side using your API Secret');
  }

  return this.post({
    url: 'feed/add_to_many/',
    body: {
      activity,
      feeds,
    },
    signature: this.getOrCreateToken(),
  });
}

function followMany(follows, activityCopyLimit) {
  /**
   * Follow multiple feeds with one API call
   * @method followMany
   * @memberof StreamClient.prototype
   * @since 2.3.0
   * @param  {Array}   follows  The follow relations to create
   * @param  {number}  [activityCopyLimit] How many activities should be copied from the target feed
   * @return {Promise}           Promise object
   */
  const qs = {};

  if (!this.usingApiSecret || this.apiKey == null) {
    throw new errors.SiteError('This method can only be used server-side using your API Secret');
  }

  if (typeof activityCopyLimit === 'number') {
    qs.activity_copy_limit = activityCopyLimit;
  }

  return this.post({
    url: 'follow_many/',
    body: follows,
    qs,
    signature: this.getOrCreateToken(),
  });
}

function unfollowMany(unfollows) {
  /**
   * Unfollow multiple feeds with one API call
   * @method unfollowMany
   * @memberof StreamClient.prototype
   * @since 3.15.0
   * @param  {Array}   unfollows  The follow relations to remove
   * @return {Promise}           Promise object
   */

  if (!this.usingApiSecret || this.apiKey == null) {
    throw new errors.SiteError('This method can only be used server-side using your API Secret');
  }

  return this.post({
    url: 'unfollow_many/',
    body: unfollows,
    signature: this.getOrCreateToken(),
  });
}

export default {
  addToMany,
  followMany,
  unfollowMany,
};
