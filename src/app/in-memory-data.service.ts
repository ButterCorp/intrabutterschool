import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const students = [
        { id: 1, name: 'Robin', bio: 'The creator', avatar: 'https://semantic-ui.com/images/avatar/small/elliot.jpg'},
        { id: 2, name: 'Younes', bio: 'In love with Express', avatar: 'https://semantic-ui.com/images/avatar/small/justen.jpg'},
        { id: 3, name: 'Gili', bio: 'Learning angular 6', avatar: 'https://semantic-ui.com/images/avatar/small/joe.jpg'}
    ];
    return {students};
  }
}