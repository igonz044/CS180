// functions for accessing IMDB data stored in Firebase

import firebase from "./firebase";

/**
 * Searches for IMDB entries with a given title.
 * 
 * @param searchQuery title prefix.  search is case sensitive
 * @param callback function to invoke with the search results.  The callback
 *                 will be called with an object whose fields are the Firebase ids of the
 *                 search results.  The value for each field is an object with the following fields:
 *                 originalTitle, primaryTitle, runtimeMinutes, tconst, titleType, endYear, startYear
 *
 *                 If there are no results, the callback is invoked with an empty object.
 */
export function searchForIMDBTitle(searchQuery, callback) {
  const searchItemsRef = firebase.database().ref("title_basics");
  const searchItemQuery = searchItemsRef.limitToLast(10);
  searchItemQuery.orderByChild("originalTitle").startAt(searchQuery).endAt(searchQuery+"\uf8ff").once("value", (snapshot) => {
      callback(snapshot.val());
  });
}

/**
 * Gets information on an IMDB title, and passes that info to the given callback.
 *
 * NOTE: this function does not handle the case where the Firebase query returns an error.
 * 
 * @param id Firebase ID for the title
 * @param callback function to invoke with the title information once retrieved.  The callback
 *                 will be called with an object with the following fields:
 *                 originalTitle, primaryTitle, runtimeMinutes, tconst, titleType, endYear, startYear 
 */
export function getIMDBTitleInfo(id, callback) {
  const searchItemsRef = firebase.database().ref('title_basics/'+id);
  searchItemsRef.once('value', (snapshot) => { callback(snapshot.val()); });
}

/**
 * Gets ratings information for an IMDB title and passes that information to the callback.
 *
 * NOTE: this function is slow, due to an unoptimized representation in the database.
 *
 * @param tconst The tconst id for the title (of the form "tt0000000")
 * @param callback function to invoke with the rating information once retrieved.  The function
 *                  will be called with an object with two fields: averageRating and numVotes
 */
export function getIMDBRatings(tconst, callback) {
  const ratingsRef = firebase.database().ref("title_ratings/" + tconst);
  ratingsRef.once('value', (snapshot) => { callback(snapshot.val()); });
}
