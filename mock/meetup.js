const casual = require('casual');

const meetupList = [
  {
    id: casual.uuid,
    title: 'This is a first meetup',
    image:
      'https://images.unsplash.com/photo-1635121517160-ac25ebd42e64?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1332&q=80',
    address: 'Meetup street 5, 12345 Meetup City',
    description:
      'This is a first, amazing meetup which you definitely should not miss. It will be a lot of fun!',
  },
  {
    id: casual.uuid,
    title: 'This is a second meetup',
    image:
      'https://images.unsplash.com/photo-1635014002223-dd531eb973da?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1164&q=80',
    address: 'Meetup street 21, 21320 Meetup City',
    description:
      'This is a second, amazing meetup which you definitely should not miss. It will be a lot of fun!',
  },
  {
    id: casual.uuid,
    title: 'This is a third meetup',
    image:
      'https://images.unsplash.com/photo-1634788906402-3796dabc53e7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1129&q=80',
    address: 'Meetup street 3, 12321 Meetup City',
    description:
      'This is a third, amazing meetup which you definitely should not miss. It will be a lot of fun!',
  },
];

module.exports = meetupList;
