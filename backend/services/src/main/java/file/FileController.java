package file;

import dto.Bytes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

/**
 * Created by Влад on 08.04.2017.
 */
@RestController
public class FileController {
    @Autowired
    FileService fileService;

    @PreAuthorize("isAuthenticated()")
    @RequestMapping(value = "/upload", produces = "application/json", method = RequestMethod.POST)
    public
    @ResponseBody
    Bytes uploadFile(@RequestParam("file") MultipartFile file) throws IOException {
        return fileService.uploadFile(file);
    }

    @PreAuthorize("isAuthenticated()")
    @RequestMapping(value = "/saveFile", produces = "application/json", method = RequestMethod.POST)
    public @ResponseBody int saveFile(@RequestParam("file") MultipartFile file, @RequestParam("name") String filename) throws IOException {
        fileService.saveFile(file, filename);
        return 1;
    }
}
