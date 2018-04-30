import db from './firebaseInit'
import firebase from 'firebase'

export default class FirebaseTaskService {
  getTasksFromUser () {
    let userId = ''
    let myTasks = []
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        userId = user.uid
      }
    })
    db.collection('tasks').orderBy('taskUrgency').get().then(
      querySnapshot => {
        querySnapshot.forEach(retrieveData => {
          if (userId === retrieveData.data().userId) {
            const data = {
              'taskId': retrieveData.data().task_id,
              'userId': retrieveData.data().userId,
              'taskName': retrieveData.data().taskName,
              'taskDescription': retrieveData.data().taskDescription,
              'taskUrgency': retrieveData.data().taskUrgency
            }
            myTasks.push(data)
          }
        })
      }
    )
    return myTasks
  }
}
