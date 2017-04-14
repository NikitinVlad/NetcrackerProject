package file;

import dto.Bytes;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;


@Service
public class FileServiceImpl implements FileService {

    public Bytes uploadFile(MultipartFile file) throws IOException {
        Bytes bt = new Bytes();
        byte[] bytes = file.getBytes();
        bt.setBytes(bytes);
        return bt;
    }

    public byte[] getFile(String filename) throws IOException {
        RandomAccessFile f = new RandomAccessFile("E:/Сайт/Netcrackers/backend/services/src/main/resources/photos/" + filename + ".jpg", "r");
        byte[] b = new byte[(int) f.length()];
        f.readFully(b);
        f.close();
        return b;
    }

    public void saveFile(MultipartFile file, String filename) {
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
            e.printStackTrace();
        }
    }

    public void deleteFile(long id) {
        try{

            File file = new File("E:/Сайт/Netcrackers/backend/services/src/main/resources/photos/"+id+".jpg");
            if(file.delete()){
                System.out.println(file.getName() + " is deleted!");
            }else{
                System.out.println("Delete operation is failed.");
            }
        }catch(Exception e){
            e.printStackTrace();
        }
    }

}
