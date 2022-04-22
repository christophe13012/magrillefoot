import {firebase} from '@react-native-firebase/database';
import Axios from 'axios';
import {levels} from '../utils/utils';

const database = firebase
  .app()
  .database(
    'https://magrillefoot-default-rtdb.europe-west1.firebasedatabase.app/',
  );

export const saveUser = async user => {
  firebase.database().ref(`/usersList/${firebase.auth().currentUser.uid}`).set({
    displayName: user.displayName,
    email: user.email,
    phoneNumber: user.phoneNumber,
  });
};

export const getTest = async () => {
  const ref = firebase
    .app()
    .database(
      'https://magrillefoot-default-rtdb.europe-west1.firebasedatabase.app/',
    )
    .ref(`/test`);
  const snapshot = await ref.once('value');
  console.log('hello 3', snapshot.val());
  return snapshot.val();
};

export const isNameTaken = async name => {
  const ref = firebase
    .app()
    .database(
      'https://magrillefoot-default-rtdb.europe-west1.firebasedatabase.app/',
    )
    .ref(`/names/${name.toLowerCase()}`);
  const snapshot = await ref.once('value');
  return snapshot.val();
};

export const saveName = async name => {
  firebase
    .app()
    .database(
      'https://magrillefoot-default-rtdb.europe-west1.firebasedatabase.app/',
    )
    .ref(`names/${name.toLowerCase()}`)
    .set({
      name,
    });
};

export const initalizeItems = async (userID, name) => {
  const ref = database.ref(`/balls`);
  const snapshot = await ref.once('value');
  const items = {
    avatar: '😀',
    bonus: 0,
    grilles: 3,
    coins: 15,
    shield: 0,
    bingoballs: snapshot.val(),
    name,
    xp: '0',
  };
  database.ref('items/' + userID).set(items);
  return items;
};

export const updateItems = async (ballon, id) => {
  const ref = database.ref(`/items/${firebase.auth().currentUser.uid}`);
  const snapshot = await ref.once('value');
  let data = {...snapshot.val()};
  data.bingoballs[id].active = false;
  data.coins = ballon.value + data.coins;
  ref.set(data);
};

export const updateAllItems = async items => {
  console.log('ITEMS UPDATE', items);
  const ref = database.ref(`/items/${firebase.auth().currentUser.uid}`);
  ref.set(items);
};

export const updateBonus = async bonus => {
  const ref = database.ref(`/items/${firebase.auth().currentUser.uid}`);
  const snapshot = await ref.once('value');
  let data = {...snapshot.val()};
  data.coins = data.coins - 50;
  data.bonus = data.bonus + bonus;
  ref.set(data);
};

export const updateAvatar = async avatar => {
  const ref = database.ref(`/items/${firebase.auth().currentUser.uid}/avatar`);
  ref.set(avatar);
};

export const updateCoins = async coins => {
  const ref = database.ref(`/items/${firebase.auth().currentUser.uid}/coins`);
  ref.set(coins);
};

export const getItems = async () => {
  const ref = database.ref(`/items/${firebase.auth().currentUser.uid}`);
  const snapshot = await ref.once('value');
  return snapshot.val();
};

export const getUniqueId = async () => {
  const uniqueId = Date.now().toString(36);
  const ref = database.ref(`/friendsUid/${firebase.auth().currentUser.uid}`);
  const refReverse = database.ref(`/reverseFriendsUid/${uniqueId}`);
  const snapshot = await ref.once('value');
  if (snapshot.val()) {
    return snapshot.val();
  } else {
    const snapshotReverse = await refReverse.once('value');
    while (snapshotReverse.val()) {
      uniqueId = Date.now().toString(36);
      refReverse = database.ref(`/reverseFriendsUid/${uniqueId}`);
      snapshotReverse = await refReverse.once('value');
    }
    refReverse.set(firebase.auth().currentUser.uid);
    ref.set(uniqueId);
    return uniqueId;
  }
};

export const addFriend = async uniqueId => {
  const refReverse = database.ref(`/reverseFriendsUid/${uniqueId}`);
  snapshotReverse = await refReverse.once('value');
  const uid = snapshotReverse.val();
  console.log('uid', uid);
  const ref = database.ref(`/battle/${uid}`);
  const snapshot = await ref.once('value');
  const friendsStats = snapshot.val();
  const refAdd = database.ref(`/friends/${firebase.auth().currentUser.uid}`);
  const snapshotPotos = await refAdd.once('value');
  const friends = snapshotPotos.val();

  if (friends) {
    for (const [key, value] of Object.entries(friends)) {
      console.log('value.uid', value.uid);
      console.log('uid', uid);
      if (value.uid == uid) {
        return false;
      }
    }
  }
  if (friendsStats) {
    refAdd.child(uid).set(friendsStats);

    const refMe = database.ref(`/battle/${firebase.auth().currentUser.uid}`);
    const snapshotMe = await refMe.once('value');
    const MesStats = snapshotMe.val();

    const refAddInPoto = database.ref(`/friends/${uid}`);
    refAddInPoto.child(firebase.auth().currentUser.uid).set(MesStats);
    return uid;
  } else {
    return 'inconnu';
  }
};

export const isTeamNameTaken = async teamName => {
  const ref = database.ref(`/teamsNames/${teamName.toLowerCase()}`);
  const snapshot = await ref.once('value');
  return snapshot.val();
};

export const saveTeamName = (teamName, items, displayName) => {
  const uid = firebase.auth().currentUser.uid;
  let niveau = 0;
  for (let index = 0; index < levels.length; index++) {
    if (items.points >= levels[index].points) {
      niveau = index + 1;
    }
  }
  const id = Date.now().toString(36);
  database.ref(`teamsNames/${teamName.toLowerCase()}`).set({
    teamName,
    id,
  });
  database.ref(`teams/${teamName.toLowerCase()}`).child(uid).set({
    uid: uid,
    niveau,
    coins: items.coins,
    name: displayName,
  });
  database.ref(`idTeams/${id}`).set(teamName.toLowerCase());
};

export const codeByTeam = async name => {
  const ref = database.ref(`/teamsNames/${name.toLowerCase()}/id`);
  const snapshot = await ref.once('value');
  return snapshot.val();
};

export const removeTeam = async name => {
  const uid = firebase.auth().currentUser.uid;
  console.log(uid);
  const ref = database.ref(`/items/${uid}/teams`);
  const snapshot = await ref.once('value');
  const teams = snapshot.val();
  const newTeams = teams.filter(t => t != name);
  ref.set(newTeams);

  const refRemove = database.ref(`/teams/${name.toLowerCase()}/${uid}`);
  const snapshotRemove = await refRemove.once('value');
  const remove = snapshotRemove.val();
  if (remove) {
    refRemove.remove();
  }
};

export const teamNameByCode = async code => {
  const ref = database.ref(`/idTeams/${code.toLowerCase()}`);
  const snapshot = await ref.once('value');
  return snapshot.val();
};

export const joinTeam = (teamName, items, displayName) => {
  const uid = firebase.auth().currentUser.uid;
  let niveau = 0;
  for (let index = 0; index < levels.length; index++) {
    if (items.points >= levels[index].points) {
      niveau = index + 1;
    }
  }
  database.ref(`teams/${teamName.toLowerCase()}`).child(uid).set({
    uid,
    niveau,
    coins: items.coins,
    name: displayName,
  });
};

export const deleteFriend = async friendUid => {
  const refPotos = database.ref(
    `/friends/${firebase.auth().currentUser.uid}/${friendUid}`,
  );
  refPotos.remove();
};

export const getTeam = async teamName => {
  const ref = database.ref(`/teams/${teamName.toLowerCase()}`);
  const snapshot = await ref.once('value');
  return snapshot.val();
};

export const validateGame = async (game, id, bonus) => {
  const uid = firebase.auth().currentUser.uid;
  const ref = database.ref(`/items/${uid}`);
  let snapshot = await ref.once('value');
  const items = snapshot.val();
  items.bonus = items.bonus - bonus;
  items.coins = items.coins - 50;
  items.grilles = items.grilles - 1;
  const games = items.games && items.games[id] ? [...items.games[id]] : [];
  games.push(game);
  items.games = {[id]: games};
  ref.set(items);
};
