const graphql = require("graphql");

//GraphQLObjectType - указываем тип данных, которые берем с БД
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLBoolean,
} = graphql;

const Movies = require("../models/movie");
const Directors = require("../models/director");

const MovieType = new GraphQLObjectType({
  name: "Movie",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLNonNull(GraphQLString) },
    genre: { type: GraphQLNonNull(GraphQLString) },
    rate: { type: GraphQLInt },
    watched: { type: GraphQLBoolean },
    director: {
      type: DirectorType,
      resolve(parent, args) {
        // return directors.find((director) => director.id == parent.directorId);
        return Directors.findById(parent.directorId);
      },
    },
  }),
});
const DirectorType = new GraphQLObjectType({
  name: "Director",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLNonNull(GraphQLString) },
    age: { type: GraphQLNonNull(GraphQLInt) },
    movies: {
      type: GraphQLList(MovieType),
      resolve(parent, args) {
        // return movies.filter(movie => movie.directorId == parent.id);
        return Movies.find({ directorId: parent.id });
      },
    },
  }),
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addDirector: {
      type: DirectorType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        age: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve(parent, { name, age }) {
        const director = new Directors({
          name,
          age,
        });
        return director.save();
      },
    },
    addMovie: {
      type: MovieType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        genre: { type: GraphQLNonNull(GraphQLString) },
        directorId: { type: GraphQLID },
        rate: { type: GraphQLInt },
        watched: { type: GraphQLBoolean },
      },
      resolve(parent, args) {
        const movie = new Movies({
          ...args,
        });
        return movie.save();
      },
    },
    deleteDirector: {
      type: DirectorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Directors.findByIdAndRemove(args.id);
      },
    },
    deleteMovie: {
      type: MovieType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Movies.findByIdAndRemove(args.id);
      },
    },
    updateDirector: {
      type: DirectorType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
      },
      resolve(parent, args) {
        const { id } = args;
        delete args.id;
        return Directors.findByIdAndUpdate(
          id,
          { $set: { ...args } },
          { new: true }
        );
      },
    },
    updateMovie: {
      type: MovieType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        directorId: { type: GraphQLID },
        rate: { type: GraphQLInt },
        watched: { type: GraphQLBoolean },
      },
      resolve(parent, { id, ...args }) {
        return Movies.findByIdAndUpdate(id, { $set: args }, { new: true });
      },
    },
  },
});

//корневой запрос
const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    movie: {
      type: MovieType,
      //параметры которые принимает запрос
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return movies.find((movie) => movie.id == args.id);
        return Movies.findById(args.id);
      },
    },
    director: {
      type: DirectorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return directors.find((director) => director.id == args.id);
        return Directors.findById(args.id);
      },
    },
    movies: {
      type: GraphQLList(MovieType),
      args: {
        name: { type: GraphQLString },
      },
      resolve(parent, { name }) {
        // return movies;
        return Movies.find({ name: { $regex: name, $options: "i" } });
      },
    },
    directors: {
      type: new GraphQLList(DirectorType),
      args: { name: { type: GraphQLString } },
      resolve(parent, { name }) {
        return Directors.find({ name: { $regex: name, $options: "i" } });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});

// const movies = [
//   { id: 1, name: "Boku No Pico", genre: "romantic", directorId: 1},
//   { id: 2, name: "Naruto", genre: "life", directorId: 3},
//   { id: "3", name: "Bleach", genre: "senen", directorId: 4},
//   { id: "4", name: "One piece", genre: "senen", directorId: 2},
//   { id: 5, name: "Tokyo Ghoul", genre: "drama", directorId: 1},
//   { id: 6, name: "Demon Slayer", genre: "action", directorId: 3},
//   { id: 7, name: "Jujutsu Kaiken", genre: "action", directorId: 2},
//   { id: "8", name: "AOT", genre: "horror", directorId: 2},
// ];
// const directors = [
//   { id: 1, name: "Hayo Miadzaki", age: 43 },
//   { id: 2, name: "Masashi Kishomoto", age: 12 },
//   { id: "3", name: "Jorno Jovanna", age: 44 },
//   { id: "4", name: "Eitiro Oda", age: 53 },
// ];
// const moviesJSON = [
//   { "name": "Boku No Pico", "genre": "romantic", "directorId": },
//   { "name": "Naruto", "genre": "life", "directorId": "5fa3f46136c901b1e01eda50"},
//   { "name": "Bleach", "genre": "senen", "directorId": "5fa3f47436c901b1e01eda51"},
//   { "name": "One piece", "genre": "senen", "directorId": "5fa3f44536c901b1e01eda4f"},
//   { "name": "Tokyo Ghoul", "genre": "drama", "directorId": "5fa3f26136c901b1e01eda4d"},
//   { "name": "Demon Slayer", "genre": "action", "directorId": "5fa3f46136c901b1e01eda50"},
//   { "name": "Jujutsu Kaiken", "genre": "action", "directorId": "5fa3f44536c901b1e01eda4f"},
//   { "name": "AOT", "genre": "horror", "directorId": "5fa3f44536c901b1e01eda4f"},
// ];
// const directorsJSON = [
//   { "name": "Hayo Miadzaki", "age": 43 }, 5fa3f26136c901b1e01eda4d
//   { "name": "Masashi Kishomoto", "age": 12 },5fa3f44536c901b1e01eda4f
//   { "name": "Jorno Jovanna", "age": 44 },5fa3f46136c901b1e01eda50
//   { "name": "Eitiro Oda", "age": 53 },5fa3f47436c901b1e01eda51
// ];
