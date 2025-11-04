import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAppStore } from "./store";

function HomePage() {
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const searchTerm = useAppStore((state) => state.searchTerm);
  const navigate = useNavigate();
  const { data, isPending, error } = useQuery({
    queryKey: ["movies", searchTerm],
    queryFn: () => {
      const endpoint = searchTerm
        ? `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchTerm}`
        : `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
      return fetch(endpoint).then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        return res.json();
      });
    },
  });

  if (isPending) {
    return <CircularProgress />;
  }
  if (error) {
    return (
      <Typography variant="h4" color="error">
        Error accurred {error.message}
      </Typography>
    );
  }
  return (
    <Grid container spacing={5}>
      {data.results.map((movie) => (
        <Grid
          item
          key={movie.id}
          xs={12}
          sm={6}
          md={4}
          lg={5}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Card
            onClick={() => navigate(`/movie/${movie.id}`)}
            elevation={15}
            sx={{
              boxShadow: "0px 4px 12px rgba(194, 49, 167, 1)",
              width: 250,
              height: 500,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CardMedia
              sx={{ height: 400 }}
              image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              title={movie.title}
            />
            <CardContent
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography variant="h6">{movie.title}</Typography>
              <Typography variant="caption" gutterBottom color="text.third">
                IMDB Rating: {movie.vote_average.toFixed(1)} / 10 ⭐️
              </Typography>
            </CardContent>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ marginTop: "auto" }}
            >
              Release Date: {movie.release_date}
            </Typography>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default HomePage;
