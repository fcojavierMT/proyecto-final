import db from './firebaseInit'
import firebase from 'firebase'

const taskRef = db.collection('tasks')
const userId = firebase.auth().currentUser.uid

export default class FirebaseTaskService {
  getTasksFromUser () {
    let myTasks = []
    taskRef.orderBy('taskUrgency').onSnapshot(
      querySnapshot => {
        myTasks.length = 0
        querySnapshot.forEach(retrieveData => {
          if (userId === retrieveData.data().userId) {
            myTasks.push(retrieveData.data())
          }
        })
      })
    return myTasks
  }
  sentNewTask (task) {
    taskRef.add(task)
  }
  deleteTask (taskId) {
    let taskToDelete = taskRef.where('task_id', '==', taskId)
    taskToDelete.get().then((queryFromFirebase) => {
      queryFromFirebase.forEach((dataToDelete) => {
        dataToDelete.ref.delete()
      })
    })
  }
}


