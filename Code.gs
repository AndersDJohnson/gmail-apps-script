/**
 * http://www.johneday.com/422/time-based-gmail-filters-with-google-apps-script
 * Search: https://support.google.com/mail/answer/7190?hl=en
 * API: https://developers.google.com/apps-script/reference/gmail/gmail-thread
 */
function cleanUp() {
  var olderThanDays = 1;
  var oldestDate = new Date();
  oldestDate.setTime(oldestDate.getTime() - 1000*60*60*24);
  var query = "from:(calendar-notification@google.com OR daily-digest@todoist.com) in:inbox -is:starred is:read older_than:" + olderThanDays + "d";
  var threads = GmailApp.search(query);
  for (var i = 0; i < threads.length; i++) {
    var thread = threads[i];
    var subj = thread.getFirstMessageSubject();
    var hasStarred = thread.hasStarredMessages();
    var hasUnread = thread.isUnread();
    var lastDate = thread.getLastMessageDate();
    if (lastDate < oldestDate) {
      Logger.log("archiving " + subj);
      thread.moveToArchive();
    }
  }
}
