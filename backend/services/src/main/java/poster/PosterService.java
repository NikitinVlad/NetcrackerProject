package poster;

import dto.AddInfo;
import dto.NewPoster;

/**
 * Created by Влад on 07.04.2017.
 */
public interface PosterService {
    AddInfo getAddInfo();
    long addNewPoster(NewPoster newPoster);
}
