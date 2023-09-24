const userRoutes = require('express').Router()
const UserModel = require('../Models/users.model')

userRoutes.post('/register', async (req, res) => {
  try {
    const { mail, password } = req.body;

    if (!mail || !password) {
      return res.status(400).json({ error: 'Check your fields, one or more are empty' });
    }

    const user = await UserModel.Register(mail, password);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

userRoutes.post('/login', async (req, res) => {
  let { mail, password } = req.body;
  if (!mail || !password) {
    res.status(402).json({ message: 'field empty' })
  }
  let user = await UserModel.Login(mail, password)
  if (!user) {
    res.status(401).json({ message: 'user not found' })
  }
  else {
    res.status(201).json(user);
  }
})

userRoutes.post('/addFilm', async (req, res) => {
  let { _id, obj } = req.body;
  let user = await UserModel.AddFilmtoPlaylist(_id, obj);
  res.status(201).json(user)
})

userRoutes.get('/playlist/:mail', async (req, res) => {
  let { mail } = req.params;
  let favorites = await UserModel.PrintAllFilmPlayList(mail);
  if (favorites) {
    res.status(201).json(favorites);
  } else {
    res.status(401).json({ message: 'empty' })

  }
})

userRoutes.post('/updateGenre', async (req, res) => {
  let { mail, genreFav } = req.body;
  let user = await UserModel.AddSetUpGenreFav(mail, genreFav);
  res.status(201).json(user)
})

userRoutes.post('/getGenresFromUser', async (req, res) => {
  let { mail } = req.body;
  let genres = await UserModel.GetAllGenreFromUser(mail)
  res.status(201).json(genres);
})

userRoutes.post('/setUpProfil', async (req, res) => {
  let { name, mail, gender, phone, country } = req.body;
  if (name && gender && phone && country) {
    let user = await UserModel.SetUpProfil(name, mail, gender, phone, country);
    res.status(201).json({ message: 'user updated' });
  }
  else {
    res.status(404).json({ message: 'user not updated' });
  }
})

userRoutes.post('/editProfil', async (req, res) => {

  // { name: fullName, mail: mail, phone: phone, gender: gender, country: country }
  let { name, mail, gender, phone, country, genres } = req.body;
  let user = await UserModel.EditProfil(name, mail, gender, phone, country, genres);
  res.status(201).json({ message: 'user updated' });

  if (!user) {

    res.status(404).json({ error: error.message });
  }



})

userRoutes.post('/deleteUser', async (req, res) => {
  try {
    const { mail } = req.body;
    // Call the deleteFilmById function to delete the film
    const updatedUsers= await UserModel.deleteFilmById(mail);

    res.status(200).json({ message: 'user deleted successfully', updatedUsers });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

userRoutes.post('/deleteFilm', async (req, res) => {
  try {
    const { _id, filmid } = req.body;
    // Call the deleteFilmById function to delete the film
    const updatedFavorites = await UserModel.deleteFilmById(_id, filmid);

    res.status(200).json({ message: 'Film deleted successfully', updatedFavorites });
  } catch (error) {
    console.error('Error deleting film:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

userRoutes.post('/getAllUsers', async (req, res) => {
  try {
    // Call the deleteFilmById function to delete the film
    const user = await UserModel.GetAllUsers();

    res.status(200).json(user);
  } catch (error) {
    console.error('Error deleting film:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = userRoutes