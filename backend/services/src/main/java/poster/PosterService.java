package poster;

import dto.AddInfo;
import dto.CurrPoster;
import dto.NewPoster;
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
    List getRangedPosters(int from,int to,String orderField,long idUser) throws IOException;
    int getPostersSize(long idUser);
}
