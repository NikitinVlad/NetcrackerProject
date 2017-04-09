package file;

import dto.Bytes;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;


@Service
public class FileServiceImpl implements FileService{

    public Bytes uploadFile(MultipartFile file) throws IOException {
        Bytes bt=new Bytes();
        byte[] bytes = file.getBytes();
        bt.setBytes(bytes);
        return bt;
    }

    public void saveFile(MultipartFile file, String filename) {
        try{
            byte[] bytes = file.getBytes();
            File directory=    new File("E:/Сайт/Netcrackers/backend/services/src/main/resources/photos");
            directory.mkdirs();
            String name=filename+ StringUtils.substring(file.getOriginalFilename(),file.getOriginalFilename().length()-4,file.getOriginalFilename().length());
            File ssave=new File(directory.getAbsolutePath()+System.getProperty("file.separator")+name);
            BufferedOutputStream stream = new BufferedOutputStream(
                    new FileOutputStream(ssave));
            stream.write(bytes);
            stream.close();
        }
        catch(Exception e){
            e.printStackTrace();
        }
    }
}
