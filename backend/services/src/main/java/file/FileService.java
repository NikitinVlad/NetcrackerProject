package file;

import dto.Bytes;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

/**
 * Created by Влад on 08.04.2017.
 */
public interface FileService {
    Bytes uploadFile(MultipartFile file) throws IOException;
    void saveFile(MultipartFile file,String filename);
}
