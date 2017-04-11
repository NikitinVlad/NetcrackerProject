package file;

import dto.Bytes;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.awt.image.DataBufferByte;
import java.awt.image.WritableRaster;
import java.io.*;



@Service
public class FileServiceImpl implements FileService{

    public Bytes uploadFile(MultipartFile file) throws IOException {
        Bytes bt=new Bytes();
        byte[] bytes = file.getBytes();
        bt.setBytes(bytes);
        return bt;
    }

    public byte[] getFile(String filename) throws IOException {
        RandomAccessFile f = new RandomAccessFile("E:/Сайт/Netcrackers/backend/services/src/main/resources/photos/"+filename+".jpg", "r");
        byte[] b = new byte[(int)f.length()];
        f.readFully(b);
        return  b;

    }

    public void saveFile(MultipartFile file, String filename) {
        try{
            byte[] bytes = file.getBytes();
            File directory=    new File("E:/Сайт/Netcrackers/backend/services/src/main/resources/photos");
            directory.mkdirs();
            String name=filename+".jpg";
            System.out.println("Save" + name);
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
