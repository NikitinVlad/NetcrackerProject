package file;


import dto.Bytes;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;


@Service
public class FileServiceImpl implements FileService {
    private Logger logger=Logger.getLogger(FileServiceImpl.class);

    public Bytes uploadFile(MultipartFile file) throws IOException {
        logger.info("Upload file");
        Bytes bt = new Bytes();
        byte[] bytes = file.getBytes();
        bt.setBytes(bytes);
        return bt;
    }

    public byte[] getFile(String filename) throws IOException {
        logger.info("Get file");
        RandomAccessFile f = new RandomAccessFile("E:/Сайт/Netcrackers/backend/services/src/main/resources/photos/" + filename + ".jpg", "r");
        byte[] b = new byte[(int) f.length()];
        f.readFully(b);
        f.close();
        return b;
    }

    public void saveFile(MultipartFile file, String filename) {
        logger.info("Save file");
        try {
            byte[] bytes = file.getBytes();
            File directory = new File("E:/Сайт/Netcrackers/backend/services/src/main/resources/photos");
            directory.mkdirs();
            String name = filename + ".jpg";
            File ssave = new File(directory.getAbsolutePath() + System.getProperty("file.separator") + name);
            BufferedOutputStream stream = new BufferedOutputStream(
                    new FileOutputStream(ssave));
            stream.write(bytes);
            stream.close();
        } catch (Exception e) {
            logger.error(e.getMessage());
            e.printStackTrace();
        }
    }

    public void deleteFile(long id) {
        logger.info("Delete file");
        try{

            File file = new File("E:/Сайт/Netcrackers/backend/services/src/main/resources/photos/"+id+".jpg");
            if(file.delete()){
                System.out.println(file.getName() + " is deleted!");
            }else{
                System.out.println("Delete operation is failed.");
            }
        }catch(Exception e){
            logger.error(e.getMessage());
            e.printStackTrace();
        }
    }

}
