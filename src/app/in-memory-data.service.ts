import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const classroom = [
       { id: 1, name:'4IW2', school: 'ESGI'}
    ];

    const students = [
        { id: 1, name: 'Robin', rank: 'Administrateur', bio: 'The creator', avatar: 'https://semantic-ui.com/images/avatar/large/elliot.jpg', active: 1, id_classroom: 1 },
        { id: 2, name: 'Younes', rank: 'Administrateur', bio: 'In love with Express', avatar: 'https://semantic-ui.com/images/avatar/large/justen.jpg', active: 1, id_classroom: 1 },
        { id: 3, name: 'Gili', rank: 'Administrateur', bio: 'Learning angular 6', avatar: 'https://semantic-ui.com/images/avatar/large/joe.jpg', active: 1, id_classroom: 1 },
        { id: 4, name: 'Jane', rank: 'Membre', bio: 'Looking for Doe', avatar: 'https://semantic-ui.com/images/avatar/large/stevie.jpg', active: 1, id_classroom: 1 },
        { id: 5, name: 'James', rank: 'Délégué', bio: 'Also called Santa', avatar: 'https://semantic-ui.com/images/avatar/large/jenny.jpg', active: 1, id_classroom: 1 },
        { id: 6, name: 'Bastien', rank: 'Membre', bio: 'New sneak on my feet', avatar: 'https://semantic-ui.com/images/avatar2/large/matthew.png', active: 0, id_classroom: 1 }
    ];

    const posts = [
      { id: 1, content:'Je découvre IBS et j\'adore ce site !', file: null, type: 'à posté un message', id_student: 4 },
      { id: 2, content:'On remercie tous Brixton pour ce site avec une UX rarement égalée', file: null, type: 'à posté un message', id_student: 2 },
      { id: 3, content:'Quelqu\'un aurait le cours de marketing ?', file: null, type: 'à posté un message', id_student: 5 },
      { id: 4, content:'Comment faire un site facilement svp?', file: null, type: 'à posté un message', id_student: 3 },
      { id: 5, content:'Sur la fin d\'IBS !', file:null, type:'à posté un message', id_student: 1 },
      { id: 6, content:'Comment renouveler sa licence Jetbrains ? Quelqu\'un se souvient de la manip?', file: null, type: 'à posté un message', id_student: 2 },
    ];

    const documents = [
      { id: 1, name:'Marketing', ext:'.xls', id_student: 1},
      { id: 2, name:'SEO', ext:'.docx', id_student: 1},
      { id: 1, name:'Bean', ext:'.java', id_student: 2},
      { id: 1, name:'Laravel', ext:'.txt', id_student: 3},
      { id: 1, name:'Planing', ext:'.xls', id_student: 5},
    ];

    const likes = [
      { id: 1, id_post: 1, id_student: 1},
      { id: 2, id_post: 2, id_student: 2},
      { id: 3, id_post: 2, id_student: 1},
      { id: 4, id_post: 2, id_student: 3},
      { id: 5, id_post: 2, id_student: 4},
      { id: 6, id_post: 2, id_student: 5}
    ];

    return {classroom, students, posts, documents, likes};
  }
}

