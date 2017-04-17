package poster;

import dto.*;
import entity.Poster;

import java.io.IOException;
import java.util.List;

/**
 * Created by Влад on 07.04.2017.
 */
public interface PosterService {
    AddInfo getAddInfo();

    long addNewPoster(NewPoster newPoster);

    Poster findPoster(long id);

    CurrPoster getCurrentPoster(long id) throws IOException;

    long savePoster(CurrPoster currPoster);

    long deletePoster(long id);

    List getRangedPosters(int from, int to, String orderField, long idUser) throws IOException;

    List getRangedAllPosters(int from, int to, String orderField) throws IOException;

    int getPostersSize(long idUser);

    int getAllPostersSize();

    int getFilterPostersSize(FilterPosters filter);

    List rangeFilterPosters(FilterPosters filter) throws IOException;

    long addPosterToBasket(CurrPoster currPoster);

    List getRangePostersInBasket(int from,int to,long userID) throws IOException;

    BasketCount getBasketSize(long idUser) throws IOException;

    long deleteFromBasket(long posterID);

}
