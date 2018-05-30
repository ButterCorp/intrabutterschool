import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const students = [
        { id: 1, name: 'Robin', bio: 'The creator', avatar: 'https://semantic-ui.com/images/avatar/small/elliot.jpg' },
        { id: 2, name: 'Younes', bio: 'In love with Express', avatar: 'https://semantic-ui.com/images/avatar/small/justen.jpg' },
        { id: 3, name: 'Gili', bio: 'Learning angular 6', avatar: 'https://semantic-ui.com/images/avatar/small/joe.jpg' }
    ];

    const posts = [
      { id: 1, content:'Je découvre IBS et j\'adore ce site !', file: null, type: 'posted on his page', id_student: 1},
      { id: 2, content:'On remercie tous Brixton pour ce site avec une UX rarement égalée', file: null, type: 'posted on his page', id_student: 2 },
      { id: 3, content:'Quelqu\'un aurait le cours de marketing ?', file: null, type: 'added you as a friend', id_student: 3 },
    ];

    return {students, posts};
  }
}

