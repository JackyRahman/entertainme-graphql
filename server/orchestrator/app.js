const { ApolloServer, gql } = require('apollo-server');
const Redis = require("ioredis");
const redis = new Redis();
const axios = require("axios");
const baseUrlMovies = "http://localhost:4001";
const baseUrlSeries = "http://localhost:4002";

const typeDefs = gql`

  type Movie  {
  _id: ID
  title: String
  overview: String
  poster_path: String
  popularity: Float
  tags: [String]
}

type Serie {
  _id: ID
  title: String
  overview: String
  poster_path: String
  popularity: Float
  tags: [String]
}

type Message {
  message: String
}

type Query {
  movies: [Movie]
  movie(_id: ID): Movie
  series: [Serie]
  serie(_id: ID): Serie
}

type Mutation {
  addMovie(
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  ): Movie

  editMovie(
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  ): Message

  deleteMovie(_id: ID): Message

  addSerie(
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  ): Serie

  editSerie(
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  ): Message

  deleteSerie(_id: ID): Message 
}
`;

const resolvers = {
  Query: {
    movies: () => {
      return redis.get('movies')
      .then((result) => {
        if(!result) {
          return  axios({
            url: baseUrlMovies+"/movies",
            method: 'GET'
          })
            .then(({ data })=>{
              redis.set('movies', JSON.stringify(data))
              return data
            })
            .catch((err)=>{
              return err.message
            })
        } else {
          const data = JSON.parse(result)
          return data
        }
      })
    },
    movie: (parents , args) => {
      const {_id} = args
      return  axios({
        url: baseUrlMovies+"/movies/"+_id,
        method: 'GET',
      })
        .then(({ data })=>{
          return data.movie
        })
        .catch((err)=>{
          throw err.response.data.message
        })
    },
    series:() => {
      return  redis.get('tvSeries')
      .then((result) =>{
        if(!result) {
          return  axios({
            url: baseUrlSeries+"/tv",
            method: 'GET'
          })
            .then(({ data })=>{
              redis.set('tvSeries', JSON.stringify(data))
              return data
            })
            .catch((err)=>{
              return err.response.data.message
            })
        } else {
          const data = JSON.parse(result)
          return data
        }
      })
    },
    serie: (parents, args) => {
      const {_id} = args

      return axios({
        url: baseUrlSeries+"/tv/"+_id,
        method: 'GET',
      })
        .then(({ data })=>{
          return data.serie
        })
        .catch((err)=>{
         throw err.response.data.message
        })
    }
  },

  Mutation: {
    addMovie: (parents, args) => {
      const { title, overview, poster_path, popularity, tags } = args
      const input = {
        title, 
        overview,
        poster_path,
        popularity,
        tags
      }
      return axios({
        method: "POST",
        url: baseUrlMovies+"/movies",
        data: input,
      })
        .then((response) => {
          redis.del("movies");
          return response.data;
        })
        .catch((err) => {
          return err.response.data;
        });
    },
    deleteMovie: (parent, args) => {
      const { _id } = args

      return axios({
        method: "DELETE",
        url: baseUrlMovies + "/movies/" + _id
      })
        .then(({ data }) => {
          redis.del("movies")
          return data
        })

        .catch(err => {
          return err.response.data
        })
    },
    editMovie: (parent, args) => {
      const { _id, title, overview, poster_path, popularity, tags } = args
      const input = {
        title, 
        overview,
        poster_path,
        popularity,
        tags
      }

      return axios({
        method: "PUT",
        url: baseMovie + "/movies/" + _id,
        data: input
      })
        .then(({ data }) => {
          redis.del("movies")
          return data
        })

        .catch(err => {
          return err.response.data
        })
    },

    addSerie: (parents, args) => {
      const { title, overview, poster_path, popularity, tags } = args
      const input = {
        title, 
        overview,
        poster_path,
        popularity,
        tags
      }
      return axios({
        method: "POST",
        url: baseUrlSeries+"/tv",
        data: input,
      })
        .then((response) => {
          redis.del("tvSeries");
          return response.data;
        })
        .catch((err) => {
          return err.response.data;
        });
    },
    deleteSerie: (parent, args) => {
      const { _id } = args

      return axios({
        method: "DELETE",
        url: baseUrlSeries + "/tv/" + _id
      })
        .then(({ data }) => {
          redis.del("tvSeries")
          return data
        })

        .catch(err => {
          return err.response.data
        })
    },
    editSerie: (parent, args) => {
      const { _id, title, overview, poster_path, popularity, tags } = args
      const input = {
        title, 
        overview,
        poster_path,
        popularity,
        tags
      }

      return axios({
        method: "PUT",
        url: baseSerie + "/tv/" + _id,
        data: input
      })
        .then(({ data }) => {
          redis.del("tvSeries")
          return data
        })

        .catch(err => {
          return err.response.data
        })
    },
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});