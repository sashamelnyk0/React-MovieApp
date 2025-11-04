import { CardMedia, Card, CardContent, Grid, Typography,} from '@mui/material';
import { useAppStore } from "./store";
import { useNavigate } from 'react-router-dom';

function FavouritePage() {
    const favoriteMovies = useAppStore((state) => state.favouriteMovies);
    const removeFavourite = useAppStore((state) => state.removeFavourite);

    const navigate = useNavigate();
    
    if (!favoriteMovies || favoriteMovies.length === 0) {
        return <Typography sx={{ padding: 3 }}>You have no favorite movies yet!</Typography>;
    }
    return (
        <Grid container spacing={3}>
            {
            favoriteMovies.map(favMovie => (
                <Grid item key={favMovie.id} xs={12} sm={6} md={4} lg={3}>
                    <Card onClick={()=>navigate(`/movie/${favMovie.id}`)} sx={{maxWidth: 180, height: "100%", display: 'flex', flexDirection: 'column' }}>
                        <CardMedia
                            sx={{ height: 140    }}
                            image={`https://image.tmdb.org/t/p/w500${favMovie.poster_path}`}
                            title={favMovie.title}
                        />
                        <CardContent sx={{ 
                            flexGrow: 1, 
                            display: 'flex',    
                            flexDirection: 'column' 
                        }}>
                            <Typography variant='h6'>{favMovie.title}</Typography>
                        </CardContent>
                        <Typography variant='caption' color="text.secondary" sx={{ marginTop: 'auto' }}>
                                Release Date: {favMovie.release_date}
                        </Typography>
                    </Card>
                </Grid>
            ))
            }
        </Grid>
    )

}
export default FavouritePage;