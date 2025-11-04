import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import {
  CardMedia,
  CircularProgress,
  Grid,
  Typography,
  Box,
  Button,
  Divider,
} from "@mui/material";
import { useAppStore } from "./store";

function MoviePage() {
  const { id } = useParams();
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["movie", id],
    queryFn: () =>
      fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`).then(
        (r) => {
          if (!r.ok) throw new Error("Failed to fetch data");
          return r.json();
        }
      ),
  });

  const favouriteMovies = useAppStore((state) => state.favouriteMovies);
  const addFavourite = useAppStore((state) => state.addFavourite);
  const removeFavourite = useAppStore((state) => state.removeFavourite);

  if (isLoading) return <CircularProgress />;
  if (error)
    return (
      <Typography variant="h4" color="error">
        Error occurred {error.message}
      </Typography>
    );
  if (!product) return <Typography>Movie not found.</Typography>;

  const isFavourite = favouriteMovies.some(
    (favMovie) => favMovie.id === product.id
  );

  const handleToggleFavourite = () => {
    if (isFavourite) removeFavourite(product.id);
    else addFavourite(product);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Grid
        container
        spacing={3}
        alignItems="flex-start"
        sx={{
          flexDirection: "row",
          flexWrap: "nowrap",
        }}
      >
        <Grid
          item
          xs="auto"
          sx={{
            display: "flex",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <CardMedia
            component="img"
            sx={{
              width: 400,
              height: "auto",
              borderRadius: 2,
              boxShadow: "0px 4px 12px rgba(194, 49, 167, 1)",
            }}
            image={`https://image.tmdb.org/t/p/w500${product.poster_path}`}
            alt={product.title}
          />
        </Grid>

        <Grid
          item
          xs
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            {product.title}
          </Typography>
          <Divider sx={{ my: 2 }} />

          <Typography
            variant="body1"
            paragraph
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              padding: 2,
              borderRadius: 2,
              lineHeight: 1.7,
              fontSize: "1.05rem",
              boxShadow: "inset 0 0 10px rgba(255,255,255,0.08)",
            }}
          >
            {product.overview}
          </Typography>

          <Typography variant="subtitle1" gutterBottom color="text.secondary">
            Release Date: {product.release_date}
          </Typography>

          <Typography variant="subtitle1" gutterBottom color="text.third">
            IMDB Rating: {product.vote_average.toFixed(1)} / 10 ⭐
          </Typography>

          <Button
            variant="contained"
            color={isFavourite ? "secondary" : "primary"}
            onClick={handleToggleFavourite}
            sx={{ marginTop: 2, alignSelf: "center", width: "fit-content" }}
          >
            {isFavourite ? "Remove from Favourites" : "Add To Favourite ⭐"}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default MoviePage;
