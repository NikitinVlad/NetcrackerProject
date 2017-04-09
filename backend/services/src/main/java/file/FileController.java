package file;

import dto.Bytes;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

/**
 * Created by Влад on 08.04.2017.
 */
@RestController
public class FileController {
    @Autowired
    FileService fileService;

    @RequestMapping(value = "/upload",produces = "application/json",method = RequestMethod.POST)
    public @ResponseBody Bytes uploadFile(@RequestParam("file") MultipartFile file) throws IOException{
        return  fileService.uploadFile(file);
    }
    @RequestMapping(value = "/save",produces = "application/json",method = RequestMethod.POST)
    public @ResponseBody int saveFile(@RequestParam("file") MultipartFile file,@RequestParam("name") String filename) throws IOException{
        fileService.saveFile(file,filename);
        return 1;
    }
}
